<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Http\Controllers\Controller;
use App\Models\BunnyModelImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BunnyModelImagesController extends Controller
{

    /**
     * Display a listing of Bunny Model images.
     * Can filter by model_id if provided in the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Build the query for images
        $query = BunnyModelImage::query();

        // Filter images by model_id if provided
        if ($request->has('model_id')) {
            $query->where('model_id', $request->model_id);
        }

        // Get images
        $images = $query->get();

        // Handle case when no images found
        if ($images->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No images found',
                'data'    => []
            ], 404);
        }

        // Return success response
        return response()->json([
            'status'  => 'success',
            'message' => 'Images retrieved successfully',
            'data'    => $images
        ], 200);
    }


    /**
     * Display a single Bunny Model image by ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Attempt to find the image
        $image = BunnyModelImage::find($id);

        // Return error if image is not found
        if (!$image) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Image not found',
                'data'    => null
            ], 404);
        }

        // Return success response
        return response()->json([
            'status'  => 'success',
            'message' => 'Image retrieved successfully',
            'data'    => $image
        ], 200);
    }

    /**
     * Store a newly created image in the database.
     *
     * Required fields:
     * - model_id (must exist in bunnu_models table)
     * - image_path (string)
     * 
     * Optional fields:
     * - alt_text
     * - is_main (true/false)
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'model_id' => 'required|exists:bunnu_models,id',
            'image_path' => 'required|string',
            'alt_text' => 'nullable|string',
            'is_main' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity
        }

        // Create the image record
        $image = BunnyModelImage::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $image
        ], 201);
    }

    /**
     * Update an existing image by ID.
     *
     * You can pass any fields you want to update (image_path, alt_text, is_main).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $image = BunnyModelImage::find($id);

        // Return error if image is not found
        if (!$image) {
            return response()->json([
                'status' => 'error',
                'message' => 'Image not found'
            ], 404);
        }

        // Update the image with new data
        $image->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $image
        ]);
    }

    /**
     * Remove an image by ID from the database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $image = BunnyModelImage::find($id);

        // Return error if image is not found
        if (!$image) {
            return response()->json([
                'status' => 'error',
                'message' => 'Image not found'
            ], 404);
        }

        // Delete the image record
        $image->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Image deleted successfully'
        ]);
    }
}