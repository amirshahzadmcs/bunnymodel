<?php

// app/Http/Middleware/CustomAdminPermission.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$permissions  The list of allowed permission slugs (e.g., 'edit-post', 'delete-user')
     */
    public function handle(Request $request, Closure $next, ...$permissions): Response
    {
        // 1. Ensure the admin is authenticated using the 'admin' guard
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }

        /** @var \App\Models\Admin\AdminModel $admin */
        $admin = Auth::guard('admin')->user();

        // 2. Check if the admin has ANY of the given permissions
        // Your AdminModel should have a hasPermission() method similar to hasRole()
        if (!$admin->hasPermission($permissions)) {
            // Log out and deny access if they don't have permission
            Auth::guard('admin')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            abort(403, 'Unauthorized. You do not have the necessary permission(s) for this area.');
        }

        return $next($request);
    }
}
