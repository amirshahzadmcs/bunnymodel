<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BunnyModels\BunnuModel;

class BunnyModelController extends Controller
{   
    // Get all models with images and prices
    public function index(Request $request)
    {
        $limit = $request->input('limit', 20);
        $page = $request->input('page', 1);

        $models = BunnuModel::with(['prices', 'images'])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get()
            ->makeHidden(['phone', 'email', 'visit_count' , 'ip' , 'updatedOn' , 'publishedOn', 'phone_verified']);

        if ($models->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Model not found'
            ], 404);
        }

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
                    ->first()->makeHidden(['phone', 'email', 'visit_count' , 'ip' , 'updatedOn' , 'publishedOn', 'phone_verified']);

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
