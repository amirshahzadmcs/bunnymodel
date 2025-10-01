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


if (!function_exists('hasAdminPermission')) {
    /**
     * Check if the current admin has a permission
     *
     * @param string $permission
     * @return bool
     */
    function hasAdminPermission($permission)
    {
        $admin = Auth::guard('admin')->user();
        if (!$admin) {
            return false;
        }

        // Make sure your AdminModel has hasPermission method
        return $admin->hasPermission($permission);
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
