<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Http\Controllers\Controller;
use App\Models\BunnyModelPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BunnyPriceController extends Controller
{
    /**
     * Display a listing of all Bunny Model prices with related models.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Get all prices with their related model
        $prices = BunnyModelPrice::with('model')->get();

        // If no records found
        if ($prices->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No price records found',
                'data'    => []
            ], 404);
        }

        // Return a clean structured JSON response
        return response()->json([
            'status'  => 'success',
            'message' => 'Price records retrieved successfully',
            'data'    => $prices
        ], 200);
    }


    public function store(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'model_id'   => 'required|exists:bunnu_models,id',
            'incall_2h'  => 'nullable|integer',
            'incall_3h'  => 'nullable|integer',
            'incall_6h'  => 'nullable|integer',
            'incall_12h' => 'nullable|integer',
            'outcall_1d' => 'nullable|integer',
            'outcall_3d' => 'nullable|integer',
            'outcall_ad' => 'nullable|integer',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity
        }

        // Create the price record
        $price = BunnyModelPrice::create($request->all());

        // Return a clean, structured JSON response
        return response()->json([
            'status' => 'success',
            'message' => 'Price record created successfully',
            'data' => $price
        ], 201);
    }


    public function show($id)
    {
        $price = BunnyModelPrice::with('model')->find($id);
        if (!$price) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        return response()->json($price);
    }

    public function update(Request $request, $id)
    {
        $price = BunnyModelPrice::find($id);
        if (!$price) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $price->update($request->all());
        return response()->json($price);
    }

    public function destroy($id)
    {
        $price = BunnyModelPrice::find($id);
        if (!$price) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $price->delete();
        return response()->json(['message' => 'Record deleted']);
    }
}
