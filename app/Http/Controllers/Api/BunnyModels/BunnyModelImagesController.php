<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Models\BunnyModelImage;
use Illuminate\Http\Request;

class BunnyModelImagesController extends Controller
{
    // Get all images or images by model_id
    public function index(Request $request)
    {
        $query = BunnyModelImage::query();

        if ($request->has('model_id')) {
            $query->where('model_id', $request->model_id);
        }

        $images = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $images
        ]);
    }

    // Get a specific image by ID
    public function show($id)
    {
        $image = BunnyModelImage::find($id);

        if (!$image) {
            return response()->json([
                'status' => 'error',
                'message' => 'Image not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $image
        ]);
    }

    // Add a new image
    public function store(Request $request)
    {
        $request->validate([
            'model_id' => 'required|exists:bunnu_models,id',
            'image_path' => 'required|string',
            'alt_text' => 'nullable|string',
            'is_main' => 'nullable|boolean',
        ]);

        $image = BunnyModelImage::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $image
        ], 201);
    }

    // Update an existing image
    public function update(Request $request, $id)
    {
        $image = BunnyModelImage::find($id);

        if (!$image) {
            return response()->json([
                'status' => 'error',
                'message' => 'Image not found'
            ], 404);
        }

        $image->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $image
        ]);
    }

    // Delete an image
    public function destroy($id)
    {
        $image = BunnyModelImage::find($id);

        if (!$image) {
            return response()->json([
                'status' => 'error',
                'message' => 'Image not found'
            ], 404);
        }

        $image->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Image deleted successfully'
        ]);
    }
}
