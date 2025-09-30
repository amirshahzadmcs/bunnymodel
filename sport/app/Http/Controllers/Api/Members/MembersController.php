<?php

namespace App\Http\Controllers\Api\Members;

use App\Http\Controllers\Controller;
use App\Models\Members\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Crypt;


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
        // 1. Validate input (except uniqueness for email)
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email'     => 'required|string|email|max:255',
            'password'  => [
                'required',
                'string',
                'min:6',
                'regex:/^(?=.*[A-Z])(?=.*[\W_]).+$/', // at least one uppercase & one special char
            ],
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter and one special character.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Check for duplicate email manually (all emails are encrypted)
        $members = Member::all();
        foreach ($members as $m) {
            try {
                if ($m->email === $request->email) {
                    return response()->json([
                        'status' => 'error',
                        'errors' => ['email' => ['This email is already registered.']]
                    ], 422);
                }
            } catch (\Exception $e) {
                continue; // skip if decryption fails
            }
        }

        // 3. Generate unique username
        $username = $this->generateUniqueUsername($request->full_name);

        // 4. Create a verification token
        $verificationToken = Str::random(64);

        // 5. Create member (model handles encryption)
        $member = Member::create([
            'full_name'         => $request->full_name,
            'username'          => $username,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'verification_token'=> $verificationToken,
        ]);

        // 6. Build verification URL
        $verificationUrl = url('/api/verify-email/' . $verificationToken);

        /* 7. Send verification email (raw email, no view needed)
        Mail::raw(
            "Hello {$member->full_name},\n\nPlease verify your email by clicking the link below:\n\n$verificationUrl\n\nThank you.",
            function ($message) use ($member) {
                // Use decrypted email for sending
                $message->to(Crypt::decryptString($member->email));
                $message->subject('Verify your email address');
            }
        );
        */
        // 8. Create Sanctum token
        $token = $member->createToken('auth_token')->plainTextToken;

        // 9. Return response
        return response()->json([
            'status'  => 'success',
            'message' => 'Member registered successfully. Please verify your email.',
            'token'   => $token,
        ], 201);
    }




    public function verifyEmail($token)
    {
        // Find member with the given token
        $member = Member::where('verification_token', $token)->first();

        // Handle invalid token
        if (! $member) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Invalid or expired verification token.'
            ], 400);
        }

        // If already verified
        if ($member->email_status === 'approved') {
            return response()->json([
                'status'  => 'info',
                'message' => 'Your email is already verified.'
            ], 200);
        }

        // Mark email as verified
        $member->email_status = 'approved';
        $member->verification_token = null;
        $member->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Your email has been successfully verified.'
        ], 200);
    }



    /**
     * Login member (by email or username)
     *
     * Validates login credentials, checks hashed password,
     * and returns a new auth token on success.
     */
    public function login(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string', // can be email or username
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Because fields are encrypted in DB, we must check manually
        $members = Member::all();
        $member = null;

        foreach ($members as $m) {
            // Accessors in your model automatically decrypt values
            $email    = $m->email;     // already decrypted
            $username = $m->username;  // already decrypted

            if ($request->username === $email || $request->username === $username) {
                $member = $m;
                break;
            }
        }

        // Check password
        if (! $member || ! Hash::check($request->password, $member->password)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        // Issue token
        $token = $member->createToken('auth_token')->plainTextToken;

        // Build decrypted response automatically
        $decryptedMember = [
            'id'         => $member->id,
            'full_name'  => $member->full_name,  // already decrypted
            'username'   => $member->username,   // already decrypted
            'email'      => $member->email,      // already decrypted
            'country'    => $member->country,
            'nationality'=> $member->nationality,
            'phone'      => $member->phone,
            'email_status'=> $member->email_status ?? null,
        ];

        return response()->json([
            'message' => 'Login successful',
            'status'  => 'success',
            'member'  => $decryptedMember,
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
        // Authenticated user via Sanctum
        $member = $request->user('sanctum');

        // Issue a new token (if you really need a fresh token here)
        $token = $member->createToken('auth_token')->plainTextToken;

        // Because of model accessors, all fields below are already decrypted automatically
        $decryptedMember = [
            'id'           => $member->id,
            'full_name'    => $member->full_name,
            'username'     => $member->username,
            'email'        => $member->email,
            'country'      => $member->country,
            'nationality'  => $member->nationality,
            'phone'        => $member->phone,
            'email_status' => $member->email_status ?? null,
            'created_at'   => $member->created_at,
        ];

        return response()->json([
            'status' => 'success',
            'token'  => $token,
            'member' => $decryptedMember,
        ]);
    }


    /**
     * Update the authenticated member profile
     *
     * Allows member to edit their profile details.
     */
    public function updateProfile(Request $request)
    {
        $member = $request->user('sanctum');

        // Validate input
        $validator = Validator::make($request->all(), [
            'full_name'   => 'required|string|max:255',
            'country'     => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'phone'       => 'nullable|string|max:20',
            'email'       => [
                'required',
                'string',
                'email',
                'max:255'
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Auto-generate username again if full_name changed
        if ($member->full_name !== $request->full_name) {
            $member->username = $this->generateUniqueUsername($request->full_name);
        }

        // Assign values (model automatically encrypts them)
        $member->full_name   = $request->full_name;
        $member->country     = $request->country;
        $member->nationality = $request->nationality;
        $member->phone       = $request->phone;
        $member->email       = $request->email;
        $member->save();

        // Build decrypted response (model already decrypts on get)
        $decryptedMember = [
            'full_name'    => $member->full_name,
            'username'     => $member->username,
            'email'        => $member->email,
            'country'      => $member->country,
            'nationality'  => $member->nationality,
            'phone'        => $member->phone,
            'email_status' => $member->email_status ?? null,
        ];

        return response()->json([
            'status'  => 'success',
            'message' => 'Profile updated successfully',
            'member'  => $decryptedMember
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
            // Revoke old tokens
            $member->tokens()->delete();

            // Create a new token
            $token = $member->createToken('auth_token')->plainTextToken;

            return response()->json([
                'is_logged_in' => true,
                'status'       => 'success',
                'member'       => $member,
                'token'        => $token,
            ]);
        }

        return response()->json([
            'is_logged_in' => false,
            'status'       => 'error',
            'member'       => null,
            'token'        => null,
        ], 401);
    }



    
    /**
     * Update the authenticated member password
     *
     * Validates current password, hashes and updates new password.
     */
    public function updatePassword(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'current_password'      => 'required',
            'new_password'          => 'required|string|min:6|confirmed', // requires new_password_confirmation
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $member = $request->user('sanctum');

        // Verify current password
        if (! Hash::check($request->current_password, $member->password)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Current password does not match'
            ], 422);
        }

        // Update password
        $member->password = Hash::make($request->new_password);
        $member->save();

        // (Optional but recommended) Revoke all tokens so user must re-login
        $member->tokens()->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Password updated successfully. Please login again.'
        ]);
    }

    /**
     * Send OTP to member's email for password reset
     *
     * Generates a 6-digit OTP, stores it in cache for 10 minutes,
     * and sends it to the member's registered email.
     */

    public function sendOtp(Request $request)
    {
        // Validate email format only
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $emailInput = $request->email;

        // Find member by decrypting emails
        $member = Member::all()->first(function($m) use ($emailInput) {
            try {
                return $m->email === $emailInput;
            } catch (\Exception $e) {
                return false;
            }
        });

        if (! $member) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No account found with this email address.'
            ], 404);
        }

        // Generate 6-digit OTP
        $otp = rand(100000, 999999);

        // Store OTP in cache for 10 minutes
        Cache::put('password_reset_otp_' . $emailInput, $otp, 600);

        try {
            // Send OTP via plain text email
            Mail::raw("Your password reset OTP is: $otp. It will expire in 10 minutes.", function ($message) use ($emailInput) {
                $message->to($emailInput)
                        ->subject('Password Reset OTP');
            });

            return response()->json([
                'status'  => 'success',
                'message' => 'OTP sent successfully to your email address.',
                'email'   => $emailInput
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
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
            'otp'   => 'required|numeric|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;
        $otp   = $request->otp;

        // Retrieve OTP from cache
        $storedOtp = Cache::get('password_reset_otp_' . $email);

        if (!$storedOtp) {
            return response()->json([
                'status'  => 'error',
                'message' => 'OTP has expired. Please request a new one.'
            ], 422);
        }

        if ($storedOtp !== (int) $otp) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Invalid OTP. Please check and try again.'
            ], 422);
        }

        // Generate a secure verification token
        $verificationToken = Str::random(64);

        // Store verification token in cache for 10 minutes
        Cache::put('password_reset_token_' . $email, $verificationToken, 600);

        // Remove OTP after successful verification
        Cache::forget('password_reset_otp_' . $email);

        return response()->json([
            'status'             => 'success',
            'message'            => 'OTP verified successfully.',
            'verification_token' => $verificationToken,
            'email'              => $email
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
            'email'              => 'required|email',
            'verification_token' => 'required|string',
            'password'           => [
                'required',
                'string',
                'min:6',
                'confirmed', // requires password_confirmation
                'regex:/^(?=.*[A-Z])(?=.*[\W_]).+$/',
            ],
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter and one special character.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;
        $verificationToken = $request->verification_token;
        $newPassword = $request->password;

        // Retrieve stored verification token from cache
        $storedToken = Cache::get('password_reset_token_' . $email);

        if (!$storedToken) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Reset session has expired. Please start the process again.'
            ], 422);
        }

        // Compare tokens (simple string comparison)
        if ($verificationToken !== $storedToken) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Invalid verification token.'
            ], 422);
        }

        // Find member by decrypting emails
        $member = Member::all()->first(function($m) use ($email) {
            try {
                return $m->email === $email;
            } catch (\Exception $e) {
                return false;
            }
        });

        if (!$member) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Member not found.'
            ], 404);
        }

        // Update password (hashed)
        $member->password = Hash::make($newPassword);
        $member->save();

        // Clear verification token
        Cache::forget('password_reset_token_' . $email);

        return response()->json([
            'status'  => 'success',
            'message' => 'Password reset successfully. You can now login with your new password.'
        ]);
    }

    private function generateUniqueUsername($fullName)
    {
        // 1. Convert to lowercase
        $username = strtolower($fullName);

        // 2. Remove spaces and special characters
        $username = preg_replace('/[^a-z0-9]/', '', str_replace(' ', '', $username));

        // 3. Fallback if empty
        if (empty($username)) {
            $username = 'user';
        }

        $originalUsername = $username;
        $counter = 1;

        // 4. Loop through all members to check uniqueness
        $members = Member::all(); // fetch all members
        $existingUsernames = [];

        foreach ($members as $member) {
            try {
                $existingUsernames[] = Crypt::decryptString($member->username);
            } catch (\Exception $e) {
                continue; // skip if decryption fails
            }
        }

        while (in_array($username, $existingUsernames)) {
            $username = $originalUsername . $counter;
            $counter++;
        }

        return $username;
    }


}
