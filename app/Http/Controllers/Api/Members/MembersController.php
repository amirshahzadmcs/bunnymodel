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
            'country'     => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
            'phone'       => 'required|string|max:50|unique:members',
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
            throw ValidationException::withMessages([
                'login' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
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
        return response()->json($request->user());
    }

    /**
     * Logout the current authenticated member
     *
     * Deletes all tokens for the logged-in member,
     * effectively logging them out from all devices.
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

     /**
     * Check if the current token belongs to a logged-in member
     *
     * Returns logged_in status, member info, and issues a fresh token.
     */
    public function isLoggedIn(Request $request)
    {
        $member = $request->user();

        if ($member) {
            // Optional: revoke old tokens first to avoid token buildup
            $member->tokens()->delete();

            // Create a new token
            $token = $member->createToken('auth_token')->plainTextToken;

            return response()->json([
                'logged_in' => true,
                'member'    => $member,
                'token'     => $token,
            ]);
        }

        return response()->json([
            'logged_in' => false,
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
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|string|min:6|confirmed',
        ]);

        $member = $request->user();

        if (! Hash::check($request->current_password, $member->password)) {
            return response()->json(['message' => 'Current password does not match'], 422);
        }

        $member->password = Hash::make($request->new_password);
        $member->save();

        return response()->json(['message' => 'Password updated successfully']);
    }
}
