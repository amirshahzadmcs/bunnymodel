<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Members\Member;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class MemberController extends Controller
{
    public function index(): View
    {
        $members = Member::all();
        
        $title = 'Member List';
        $total = $members->count();
        $block = $members->where('profile_status', 'block')->count();
        $pending = $members->where('profile_status', 'pending')->count();
        $approved = $members->where('profile_status', 'approved')->count();

        return view('admin.members.list', compact('title', 'members', 'total', 'block', 'pending', 'approved'));
    }

    public function update(Member $member): View
    {
        $title = 'Update Member';
        return view('admin.members.update', compact('title', 'member'));
    }

    public function updateStore(Request $request, Member $member): RedirectResponse
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'profile_status' => 'required|string|in:approved,pending,block',
            'email_status' => 'required|string|in:approved,pending',
            'email' => 'required|string|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        try {
            // Check if email is already taken by another member
            $existingMember = Member::findByEmail($request->email);
            if ($existingMember && $existingMember->id !== $member->id) {
                return back()->with('error', 'This email is already taken by another member.')->withInput();
            }

            // Update username if full_name changed
            if ($member->full_name !== $request->full_name) {
                $member->username = $this->generateUniqueUsername($request->full_name, $member->id);
            }

            // Update fields (model will encrypt automatically via accessors)
            $member->full_name = $request->full_name;
            $member->country = $request->country;
            $member->phone = $request->phone;
            $member->email = $request->email;
            $member->profile_status = $request->profile_status;
            $member->email_status = $request->email_status;

            // Update password only if provided
            if ($request->filled('password')) {
                $member->password = Hash::make($request->password);
            }

            $member->save();

            return redirect()->route('admin.members.update', $member->id)
                            ->with('success', 'Member updated successfully');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update member: ' . $e->getMessage())
                        ->withInput();
        }
    }

    /**
     * Generate unique username (works with encrypted data)
     */
    private function generateUniqueUsername(string $fullName, int $excludeId = null): string
    {
        $username = Str::slug($fullName);
        
        if (empty($username)) {
            $username = 'user';
        }

        $originalUsername = $username;
        $counter = 1;

        // Check for existing usernames using automatic decryption from model accessors
        do {
            $existing = Member::all()->contains(function ($member) use ($username, $excludeId) {
                if ($excludeId && $member->id === $excludeId) {
                    return false;
                }
                return $member->username === $username; // automatically decrypted by model
            });

            if (!$existing) {
                break;
            }

            $username = $originalUsername . $counter;
            $counter++;
        } while ($counter < 1000);

        return $username;
    }

    /**
     * Block a member
     */
    public function block(Member $member): RedirectResponse
    {
        try {
            $member->update([
                'profile_status' => 'block'
            ]);

            return redirect()->route('admin.members.index')
                            ->with('success', 'Member blocked successfully');

        } catch (\Exception $e) {
            return redirect()->route('admin.members.index')
                            ->with('error', 'Failed to block member: ' . $e->getMessage());
        }
    }

    /**
     * Approve a member
     */
    public function approve(Member $member): RedirectResponse
    {
        try {
            $member->update([
                'profile_status' => 'approved'
            ]);

            return redirect()->route('admin.members.index')
                            ->with('success', 'Member approved successfully');

        } catch (\Exception $e) {
            return redirect()->route('admin.members.index')
                            ->with('error', 'Failed to approve member: ' . $e->getMessage());
        }
    }

    /**
     * Delete a member
     */
    public function destroy(Member $member): RedirectResponse
    {
        try {
            $member->delete();

            return redirect()->route('admin.members.index')
                            ->with('success', 'Member deleted successfully');

        } catch (\Exception $e) {
            return redirect()->route('admin.members.index')
                            ->with('error', 'Failed to delete member: ' . $e->getMessage());
        }
    }

    /**
     * Show member details
     */
    public function show(Member $member): View
    {
        $title = 'Member Details';
        return view('admin.members.show', compact('title', 'member'));
    }
}