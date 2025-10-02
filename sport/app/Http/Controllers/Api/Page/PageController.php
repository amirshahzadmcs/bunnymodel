<?php

namespace App\Http\Controllers\Api\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\PageModel;

class PageController extends Controller
{
    public function showBySlug($slug)
    {
        $page = PageModel::where('slug', $slug)->first();

        if (!$page) {
            return response()->json([
                'status' => 'error',
                'message' => 'Page not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $page,
        ], 200);
    }
}
