<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MemberAuth
{
    public function handle(Request $request, Closure $next)
    {
        // Use the same guard as in your routes
        if (!$request->user('sanctum')) {
            return response()->json([
                'status'       => 'error',
                'is_logged_in' => false,
                'message'      => 'Authentication required. Please log in to access this resource.'
            ], 401);
            die();
        }

        return $next($request);
    }
}