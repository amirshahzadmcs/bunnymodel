<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Members\Member;
use App\Models\BunnyModels\BunnuModel;

class DashboardController extends Controller
{
    public function index()
    {
        // Count total members
        $totalMembers = Member::count();

        // Count total models
        $totalModels = BunnuModel::count();

        $models = BunnuModel::with(['prices', 'images'])->get();

        // Page title
        $title = 'Dashboard';

        // Pass values to view
        return view('admin.dashboard', compact('title', 'totalMembers', 'totalModels' , 'models'));
    }
}