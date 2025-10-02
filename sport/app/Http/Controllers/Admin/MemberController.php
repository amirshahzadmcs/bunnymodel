<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Members\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Crypt;

class MemberController extends Controller
{
     public function index()
    {
        $members = Member::all();
        
        $title      = 'Memer List';
        $total      = $members->count();
        $block      = $members->where('profile_status', 'block')->count();
        $pending    = $members->where('profile_status', 'pending')->count();
        $approved   = $members->where('profile_status', 'approved')->count();

        return view('admin.members.list', compact('title', 'members', 'total', 'block', 'pending' , 'approved'));
    }

    public function update(Member $member)
    {

        $title = 'Update Member';
        return view('admin.members.update', compact('title' , 'member'));
    }

   public function updateStore(Request $request, Member $member)
    {
        $request->validate([
            'full_name'      => 'required|string|max:255',
            'country'        => 'nullable|string|max:255',
            'phone'          => 'nullable|string|max:20',
            'profile_status' => 'nullable|string|in:approved,pending,blocked',
            'email_status'   => 'nullable|string|max:20',
            'email'          => 'required|string|email|max:255',
            'password'       => 'nullable|string|min:6|confirmed',
        ]);

        // Update username if full_name changed
        if ($request->filled('full_name') && $member->full_name !== $request->full_name) {
            $member->username = $this->generateUniqueUsername($request->full_name);
        }

        // Update other fields
        $fields = ['full_name', 'country', 'phone', 'email', 'profile_status', 'email_status'];
        foreach ($fields as $field) {
            if ($request->filled($field)) {
                $member->$field = $request->$field;
            }
        }

        // Update password only if provided
        if ($request->filled('password')) {
            $member->password = $request->password; // hashed automatically by model
        }

        $member->save();

        return redirect()->route('admin.members.update', $member->id)
                        ->with('success', 'Member updated successfully');
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
