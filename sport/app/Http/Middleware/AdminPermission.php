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
        // 1. Check if admin is logged in
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }

        /** @var \App\Models\Admin\AdminModel $admin */
        $admin = Auth::guard('admin')->user();

        // 2. Check permissions
        if (!$admin->hasPermission($permissions)) {
            abort(403, 'Unauthorized. You do not have the required permission(s).');
        }

        return $next($request);
    }

}
