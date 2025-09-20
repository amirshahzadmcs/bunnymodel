<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BunnyModels\BunnuModel;
use App\Models\BunnyModels\BunnyModelPrice;
use App\Models\BunnyModels\BunnyModelImage;

class BunnyModelController extends Controller
{   
    // Get all models with images and prices
    public function index(Request $request)
    {
        // Get limit and page from request, default to 10 and 1
        $limit = $request->input('limit', 20);   // How many models per page
        $page = $request->input('page', 1);      // Page number

        // Use skip() and take() for offset pagination
        $models = BunnuModel::with(['prices', 'images'])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        if (!$models) {
            return response()->json([
                'status' => 'error',
                'message' => 'Model not found'
            ], 404);
        }
        // Total count for frontend
        $total = BunnuModel::count();

        return response()->json([
            'status' => 'success',
            'models' => $models,
            'page' => $page,
            'limit' => $limit,
            'total' => $total
        ]);
    }


    // Get a single model by ID with images and prices
    public function model($username)
    {
        $model = BunnuModel::with(['prices', 'images'])
                    ->where('username', $username)
                    ->first();

        if (!$model) {
            return response()->json([
                'status' => 'error',
                'message' => 'Model not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'model' => $model
        ]);
    }


    // Search models by city, nationality, or age
    public function search(Request $request)
    {
        $query = BunnuModel::query();

        if ($request->has('city')) {
            $query->where('city', 'like', '%'.$request->city.'%');
        }

        if ($request->has('nationality')) {
            $query->where('nationality', 'like', '%'.$request->nationality.'%');
        }

        if ($request->has('age')) {
            $query->where('age', $request->age);
        }

        $models = $query->with(['prices', 'images'])->get();

        if (!$models) {
            return response()->json([
                'status' => 'error',
                'message' => 'Model not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $models
        ]);
    }
}
