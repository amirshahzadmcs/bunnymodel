<?php
// app/Http/Controllers/Admin/AuthController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\AdminModel;
use App\Models\Admin\Role;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Show registration form
    public function registerForm()
    {
         $title = 'Register New User';

        // Fetch all roles from the database
       $roles = Role::where('slug', '!=', 'super-admin')->get();

        return view('admin.users.registor', compact('title', 'roles'));
    }

        // Handle registration
   public function register(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|exists:roles,id', // single role validation
        ]);

        // Create the admin
        $admin = AdminModel::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign roles from the multi-select
        $admin->roles()->attach($request->role, ['admin_type' => AdminModel::class]);

        return redirect()->route('admin.register')->with('success', 'Admin registered successfully!');
    }

    /**
     * Display a list of all admins along with their assigned roles.
     *
     * This method fetches all users from the admins table,
     * eager loads their roles to avoid N+1 query issues,
     * and passes the data to the 'admin.users.list' view
     * along with the page title.
     *
     * @return \Illuminate\View\View
     */

    public function list()
    {
        $title = 'User List';

        // Get all admins with roles
        $admins = AdminModel::with('roles')->get();

        // Count Active and Blocked
        $total = $admins->count();
        $activeCount = $admins->where('status', 1)->count();
        $blockedCount = $admins->where('status', 0)->count();

        return view('admin.users.list', compact('title', 'admins', 'total', 'activeCount', 'blockedCount'));
    }

    // Show login form
    public function showLoginForm()
    {
        return view('admin.login');
    }

    // Handle login
    public function login(Request $request)
    {
        // 1. Validate request
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6|max:255',
        ]);

        $credentials = $request->only('email', 'password');

        // 2. Optional: Limit login attempts (throttle)
        $maxAttempts = 5;
        $decayMinutes = 1;
        $throttleKey = 'login:' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            $minutes = ceil($seconds / 60);
            return back()->withErrors([
                'email' => "Too many login attempts. Please try again in {$minutes} minute(s)."
            ])->withInput($request->only('email'));
        }

        // 3. Attempt login using admin guard
        if (Auth::guard('admin')->attempt($credentials)) {
            $admin = Auth::guard('admin')->user();

            // 🌟 CHECK IF USER IS BLOCKED 🌟
            if ($admin->status === 0) {
                Auth::guard('admin')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                RateLimiter::hit($throttleKey, $decayMinutes * 60);

                return redirect()->route('login')->withErrors([
                    'email' => 'Your account is blocked. Please contact the administrator.'
                ]);
            }

            // 4. MULTI-ROLE CHECK (if needed)
            $allowedAdminRoles = Role::pluck('slug')->toArray();
            if (!$admin->hasRole($allowedAdminRoles)) {
                Auth::guard('admin')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                RateLimiter::hit($throttleKey, $decayMinutes * 60);

                return redirect()->route('login')->withErrors([
                    'email' => 'Access denied. You do not have the required administrative role.'
                ]);
            }

            // 5. Successful login
            $request->session()->regenerate();
            RateLimiter::clear($throttleKey);
            return redirect()->route('dashboard.index');
        }

        // 6. Invalid credentials
        RateLimiter::hit($throttleKey, $decayMinutes * 60);
        return back()->withErrors([
            'email' => 'Invalid email or password.',
        ])->withInput($request->only('email'));
    }

    /**
     * Show the edit form for a specific admin user
     *
     * @param \App\Models\Admin\AdminModel $admin
     * @return \Illuminate\View\View
     */
    public function editAdmin(AdminModel $admin)
    {
        $title = 'Update User';

        // Check if the admin being edited has the Super Admin role
        if ($admin->roles->contains('slug', 'super-admin')) {
            // If yes, include all roles including Super Admin
            $roles = Role::all();
        } else {
            // Otherwise, exclude Super Admin role
            $roles = Role::where('slug', '!=', 'super-admin')->get();
        }

        return view('admin.users.update', compact('admin', 'roles', 'title'));
    }

    /**
     * Update admin user details
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Admin\AdminModel $admin
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateAdmin(Request $request, AdminModel $admin)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|min:6|confirmed', // Optional
            'role' => 'required|exists:roles,id',
            'status' => 'required|in:0,1', // 1 = active, 0 = blocked
        ]);

        // Update basic info
        $admin->name = $request->name;
        $admin->email = $request->email;

        // Update password if provided
        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }

        // Only allow role/status update if NOT Super Admin
        if (!$admin->roles->contains('slug', 'super-admin')) {

            // Update status
            $admin->status = $request->status;

            // Detach old roles and attach the new role using assignRole
            $admin->roles()->detach();
            $admin->assignRole($request->role);
        }

        // Save changes
        $admin->save();

        return redirect()->route('admin.user.list')->with('success', 'Admin updated successfully.');
    }




    public function removeAdmin(AdminModel $admin)
    {
        // Prevent deletion if the admin is Super Admin
        if ($admin->roles->contains('slug', 'super-admin')) {
            return redirect()->back()->with('error', 'Cannot remove a Super Admin.');
        }

        // Detach all roles before deleting the user
        $admin->roles()->detach();

        // Delete the admin
        $admin->delete();

        // Redirect back with success message
        return redirect()->back()->with('success', 'The selected admin has been removed from the system.');
    }

    // Handle logout
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

}
