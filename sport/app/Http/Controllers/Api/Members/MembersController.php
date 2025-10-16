<?php

namespace App\Http\Controllers\Api\Members;

use App\Http\Controllers\Controller;
use App\Models\Members\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rules\Password;

class MembersController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email'     => 'required|string|email|max:255',
            'password'  => [
                'required',
                'string',
                'min:8',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check for duplicate email manually (because of encryption)
        if (Member::emailExists($request->email)) {
            return response()->json([
                'status' => 'error',
                'errors' => ['email' => ['This email is already registered.']]
            ], 422);
        }

        // Generate unique username
        $username = $this->generateUniqueUsername($request->full_name);

        // Create member (model will automatically encrypt)
        $member = Member::create([
            'full_name' => $request->full_name,
            'username' => $username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_token' => Str::random(64),
            'profile_status' => 'pending',
            'email_status' => 'pending',
        ]);

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Member registered successfully.',
            'token' => $token,
            'member' => $this->getMemberResponse()
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Find member using custom method for encrypted data
        $member = Member::findByUsernameOrEmail($request->username);

        if (!$member || !Hash::check($request->password, $member->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        // Check if profile is blocked
        if ($member->profile_status === 'block') {
            return response()->json([
                'status' => 'error',
                'message' => 'Your account has been blocked.'
            ], 403);
        }

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'token' => $token,
            'member' => $this->getMemberResponse( $request )
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        $member = $request->user('sanctum');

        return response()->json([
            'status' => 'success',
            'member' => $this->getMemberResponse( $request)
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $member = $request->user('sanctum');

        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|string|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if email is already taken by another user
        $existingMember = Member::findByEmail($request->email);
        if ($existingMember && $existingMember->id !== $member->id) {
            return response()->json([
                'status' => 'error',
                'errors' => ['email' => ['This email is already taken.']]
            ], 422);
        }

        // Update username if full_name changed
        if ($member->full_name !== $request->full_name) {
            $member->username = $this->generateUniqueUsername($request->full_name, $member->id);
        }

        // Update fields (model will encrypt automatically)
        $member->full_name = $request->full_name;
        $member->country = $request->country;
        $member->nationality = $request->nationality;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'member' => $this->getMemberResponse( $request)
        ]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $$validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => [
                'required',
                'string',
                'min:8',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $member = $request->user('sanctum');

        if (!Hash::check($request->current_password, $member->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Current password is incorrect.'
            ], 422);
        }

        $member->update([
            'password' => Hash::make($request->new_password)
        ]);

        // Revoke all tokens for security
        $member->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully. Please login again.'
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user('sanctum')->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully.'
        ]);
    }

    public function sendOtp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $member = Member::findByEmail($request->email);

        if (!$member) {
            return response()->json([
                'status' => 'error',
                'message' => 'No account found with this email address.'
            ], 404);
        }

        $otp = rand(100000, 999999);
        $email = $request->email;

        Cache::put('password_reset_otp_' . $email, $otp, 600);

        return response()->json([
            'status' => 'success',
            'message' => 'OTP sent successfully.',
            'email' => $email
        ]);
    }

    public function verifyOtp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|numeric|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $storedOtp = Cache::get('password_reset_otp_' . $request->email);

        if (!$storedOtp || $storedOtp != $request->otp) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired OTP.'
            ], 422);
        }

        $verificationToken = Str::random(64);
        Cache::put('password_reset_token_' . $request->email, $verificationToken, 600);
        Cache::forget('password_reset_otp_' . $request->email);

        return response()->json([
            'status' => 'success',
            'message' => 'OTP verified successfully.',
            'verification_token' => $verificationToken
        ]);
    }

    public function resetPasswordWithOtp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'verification_token' => 'required|string',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $storedToken = Cache::get('password_reset_token_' . $request->email);

        if (!$storedToken || $storedToken !== $request->verification_token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired verification token.'
            ], 422);
        }

        $member = Member::findByEmail($request->email);
        
        if (!$member) {
            return response()->json([
                'status' => 'error',
                'message' => 'Member not found.'
            ], 404);
        }

        $member->update([
            'password' => Hash::make($request->password)
        ]);

        Cache::forget('password_reset_token_' . $request->email);

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successfully.'
        ]);
    }

    private function generateUniqueUsername(string $fullName, int $excludeId = null): string
    {
        $username = Str::slug($fullName);
        
        if (empty($username)) {
            $username = 'user';
        }

        $originalUsername = $username;
        $counter = 1;

        do {
            $existing = Member::all()->contains(function ($member) use ($username, $excludeId) {
                if ($excludeId && $member->id === $excludeId) {
                    return false;
                }
                return $member->username === $username;
            });

            if (!$existing) {
                break;
            }

            $username = $originalUsername . $counter;
            $counter++;
        } while ($counter < 1000);

        return $username;
    }

    private function getMemberResponse(Request $request)
    {
        $member = $request->user('sanctum');
        return [
            'id' => $member->id,
            'full_name' => $member->full_name, // automatically decrypted by model
            'username' => $member->username,   // automatically decrypted by model
            'email' => $member->email,         // automatically decrypted by model
            'country' => $member->country,
            'nationality' => $member->nationality,
            'phone' => $member->phone,
            'profile_status' => $member->profile_status,
            'email_status' => $member->email_status,
            'created_at' => $member->created_at,
        ];
    }
}