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
        return view('admin.registor');
    }

        // Handle registration
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Create the admin
        $admin = AdminModel::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign Super Admin role properly
        $roleId = Role::where('slug', 'super-admin')->value('id');
        if ($roleId) {
            $admin->roles()->attach($roleId, ['admin_type' => AdminModel::class]);
        }

        return redirect()->route('login');
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
        
        // 2. Load allowed roles dynamically
        $allowedAdminRoles = $roleId = Role::value('slug');
        // Use an empty array default in case config is missing

        // 3. Optional: Limit login attempts (throttle)
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

        // 4. Attempt login using admin guard
        if (Auth::guard('admin')->attempt($credentials)) {
            
            $admin = Auth::guard('admin')->user();
            
            // 🌟 MULTI-ROLE CHECK INTEGRATION 🌟
            // Use your custom hasRole method to check if the admin has ANY of the allowed roles
            if (!$admin->hasRole($allowedAdminRoles)) {
                
                // If authenticated but unauthorized by role, log them out
                Auth::guard('admin')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                
                // Increment failed attempts (optional, but good practice for role failure)
                RateLimiter::hit($throttleKey, $decayMinutes * 60);

                return redirect()->route('admin.login')->withErrors([
                    'email' => 'Access denied. You do not have the required administrative role.'
                ]);
            }

            // 5. Successful login and authorization
            $request->session()->regenerate();
            RateLimiter::clear($throttleKey);

            return redirect()->route('dashboard.index');
        }

        // 6. Increment failed attempts and return error
        RateLimiter::hit($throttleKey, $decayMinutes * 60);

        return back()->withErrors([
            'email' => 'Invalid email or password.',
        ])->withInput($request->only('email'));
    }


    // Handle logout
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

}
