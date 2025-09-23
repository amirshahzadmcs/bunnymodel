<?php

namespace App\Http\Controllers\Api\Members;

use App\Http\Controllers\Controller;
use App\Models\Members\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class MembersController extends Controller
{
    /**
     * Register a new member
     *
     * Validates incoming request data, creates a new member,
     * hashes the password, and returns an auth token.
     */
    public function register(Request $request)
    {
       $validator = Validator::make($request->all(), [
            'first_name'  => 'required|string|max:255',
            'last_name'   => 'required|string|max:255',
            'username'    => 'required|string|max:50|unique:members',
            'email'       => 'required|string|email|max:255|unique:members',
            'password'    => [
                'required',
                'string',
                'min:6',
                'regex:/^(?=.*[A-Z])(?=.*[\W_]).+$/', // At least 1 uppercase and 1 special character
            ],
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter and one special character.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity
        }

        $member = Member::create([
            'first_name'  => $request->first_name,
            'last_name'   => $request->last_name,
            'country'     => $request->country,
            'nationality' => $request->nationality,
            'phone'       => $request->phone,
            'username'    => $request->username,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
        ]);

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => 'Member registered successfully',
            'token'   => $token,
        ], 201);
    }

    /**
     * Login member (by email or username)
     *
     * Validates login credentials, checks hashed password,
     * and returns a new auth token on success.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string', // can be email or username
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity
        }

        $member = Member::where('email', $request->username)
                    ->orWhere('username', $request->username)
                    ->first();

        if (! $member || ! Hash::check($request->password, $member->password)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'The provided credentials are incorrect.'
            ], 401); // 401 Unauthorized
        }

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'status'  => 'success',
            'member'  => $member,
            'token'   => $token,
        ]);
    }

    /**
     * Get the currently authenticated member profile
     *
     * Returns the authenticated member's data as JSON.
     */
    public function profile(Request $request)
    {
        $member = $request->user('sanctum'); // authenticated user via Sanctum

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token'     => $token,
            'member' => [
                'id' => $member->id,
                'first_name' => $member->first_name,
                'last_name' => $member->last_name,
                'username' => $member->username,
                'email' => $member->email,
                'country' => $member->country,
                'nationality' => $member->nationality,
                'phone' => $member->phone,
                'created_at' => $member->created_at,
            ]
        ]);
    }

    /**
     * Logout the current authenticated member
     *
     * Deletes all tokens for the logged-in member,
     * effectively logging them out from all devices.
     */
    public function logout(Request $request)
    {
        $member = $request->user('sanctum'); // get currently authenticated user

        if ($member) {
            // Delete all tokens (logs out from all devices)
            $member->tokens()->delete();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'User not logged in'
        ], 401);
    }

     /**
     * Check if the current token belongs to a logged-in member
     *
     * Returns logged_in status, member info, and issues a fresh token.
     */
    public function isLoggedIn(Request $request)
    {
        $member = $request->user('sanctum');

        if ($member) {
            // Optional: revoke old tokens first to avoid token buildup
            $member->tokens()->delete();

            // Create a new token
            $token = $member->createToken('auth_token')->plainTextToken;

            return response()->json([
                'is_logged_in' => true,
                'status'  => 'success',
                'member'    => $member,
                'token'     => $token,
            ]);
        }

        return response()->json([
            'is_logged_in' => false,
            'member'    => null,
            'token'     => null,
        ], 401);
    }


    
    /**
     * Update the authenticated member password
     *
     * Validates current password, hashes and updates new password.
     */
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password'     => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity
        }

        $member = $request->user('sanctum');

        if (! Hash::check($request->current_password, $member->password)) {
            return response()->json(['message' => 'Current password does not match'], 422);
        }

        $member->password = Hash::make($request->new_password);
        $member->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    /**
     * Send OTP to member's email for password reset
     *
     * Generates a 6-digit OTP, stores it in cache for 10 minutes,
     * and sends it to the member's registered email.
     */
    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:members,email',
        ], [
            'email.exists' => 'No account found with this email address.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;
        
        // Generate 6-digit OTP
        $otp = rand(100000, 999999);
        
        // Store OTP in cache for 10 minutes (600 seconds)
        Cache::put('password_reset_otp_' . $email, $otp, 600);
        
        // Store email in cache for verification step
        Cache::put('otp_email_' . $email, $email, 600);

        try {
            // Send OTP via email
            Mail::to($email)->send(new PasswordResetOtp($otp));
            
            return response()->json([
                'status' => 'success',
                'message' => 'OTP sent successfully to your email address.',
                'email' => $email // Return email for frontend reference
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send OTP. Please try again later.'
            ], 500);
        }
    }

    /**
     * Verify OTP for password reset
     *
     * Checks if the provided OTP matches the one stored in cache
     * and returns a verification token for password reset.
     */
    public function verifyOtp(Request $request)
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

        $email = $request->email;
        $otp = $request->otp;
        
        // Retrieve stored OTP from cache
        $storedOtp = Cache::get('password_reset_otp_' . $email);
        
        if (!$storedOtp) {
            return response()->json([
                'status' => 'error',
                'message' => 'OTP has expired. Please request a new one.'
            ], 422);
        }

        if ($storedOtp != $otp) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid OTP. Please check and try again.'
            ], 422);
        }

        // Generate a verification token for password reset
        $verificationToken = Hash::make($email . $otp . time());
        
        // Store verification token in cache for 10 minutes
        Cache::put('password_reset_token_' . $email, $verificationToken, 600);
        
        // Clear the OTP after successful verification
        Cache::forget('password_reset_otp_' . $email);

        return response()->json([
            'status' => 'success',
            'message' => 'OTP verified successfully.',
            'verification_token' => $verificationToken,
            'email' => $email
        ]);
    }

    /**
     * Reset password using OTP verification
     *
     * Verifies the reset token and updates the member's password.
     */
    public function resetPasswordWithOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:members,email',
            'verification_token' => 'required|string',
            'password' => [
                'required',
                'string',
                'min:6',
                'confirmed',
                'regex:/^(?=.*[A-Z])(?=.*[\W_]).+$/',
            ],
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter and one special character.',
            'email.exists' => 'No account found with this email address.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;
        $verificationToken = $request->verification_token;
        $password = $request->password;

        // Retrieve stored verification token from cache
        $storedToken = Cache::get('password_reset_token_' . $email);
        
        if (!$storedToken) {
            return response()->json([
                'status' => 'error',
                'message' => 'Reset session has expired. Please start the process again.'
            ], 422);
        }

        if (!Hash::check($verificationToken, $storedToken)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid verification token.'
            ], 422);
        }

        // Find member and update password
        $member = Member::where('email', $email)->first();
        
        if (!$member) {
            return response()->json([
                'status' => 'error',
                'message' => 'Member not found.'
            ], 404);
        }

        $member->password = Hash::make($password);
        $member->save();

        // Clear the verification token after successful password reset
        Cache::forget('password_reset_token_' . $email);

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successfully. You can now login with your new password.'
        ]);
    }
}
