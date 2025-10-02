<?php

// app/Http/Middleware/CustomAdminPermission.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;

class AdminPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$permissions  The list of allowed permission slugs (e.g., 'edit-post', 'delete-user')
     */


    public function handle($request, Closure $next, $permission)
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            abort(403, 'Unauthorized');
        }

        $roles = $admin->roles;

        foreach ($roles as $role) {
            try {
                if ($role->hasPermissionTo($permission, $role->guard_name)) {
                    return $next($request);
                }
            } catch (PermissionDoesNotExist $e) {
                // Permission does not exist, skip and continue to next role
                continue;
            }
        }

        // No role has permission or permission doesn't exist
        abort(403, 'Unauthorized');
    }

}
