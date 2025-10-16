<?php

use Illuminate\Support\Facades\Auth;

if (!function_exists('currentAdmin')) {
    function currentAdmin()
    {
        return Auth::guard('admin')->user();
    }
}

if (!function_exists('pageTitle')) {
    function pageTitle($title = null)
    {
        return $title ?? 'Default Title';
    }
}


if (!function_exists('adminCan')) {
    /**
     * Check if the currently logged-in admin has a permission
     *
     * @param string $permission
     * @return bool
     */
    function adminCan($permission)
    {
        $admin = Auth::guard('admin')->user();
        if (!$admin) {
            return false;
        }

        foreach ($admin->roles as $role) {
            try {
                if ($role->hasPermissionTo($permission, $role->guard_name)) {
                    return true;
                }
            } catch (\Spatie\Permission\Exceptions\PermissionDoesNotExist $e) {
                continue;
            }
        }

        return false;
    }
}


if (!function_exists('isActiveRoute')) {
    function isActiveRoute($routeNames, $output = 'active') {
        $routeNames = (array) $routeNames;
        return in_array(\Route::currentRouteName(), $routeNames) ? $output : '';
    }
}

if (!function_exists('isMenuOpen')) {
    function isMenuOpen($routeNames) {
        $routeNames = (array) $routeNames;
        return in_array(\Route::currentRouteName(), $routeNames) ? 'show' : '';
    }
}
