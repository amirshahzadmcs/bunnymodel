<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BunnyModels\BunnuModel;

class BunnyModelController extends Controller
{   
    /**
     * Display a paginated list of Bunny models with their images and prices.
     *
     * This method:
     * - Accepts optional 'limit' and 'page' query parameters.
     * - Hides sensitive attributes such as phone, email, IP, etc.
     * - Returns JSON with models, pagination info, and total count.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if (!$request->isMethod('get')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid request method. Use GET only.'
            ], 405);
        }

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



    /**
     * Display a single Bunny model by its username with images and prices.
     *
     * This method:
     * - Takes the model's username as a parameter.
     * - Hides sensitive attributes from the response.
     * - Returns 404 if the model is not found.
     *
     * @param string $username
     * @return \Illuminate\Http\JsonResponse
     */
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


    /**
     * Search Bunny models by city, nationality, or age.
     *
     * This method:
     * - Accepts query parameters: city, nationality, age.
     * - Performs LIKE-based search for city/nationality.
     * - Returns models matching the criteria with their images and prices.
     * - Returns 404 if no models found.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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