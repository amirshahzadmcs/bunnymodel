<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Admin\PermissionsModel;

class DashboardController extends Controller
{
    public function index(){
        return view('admin.dashboard');
    }
}