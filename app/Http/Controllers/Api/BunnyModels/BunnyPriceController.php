<?php

namespace App\Http\Controllers\Api\BunnyModels;

use App\Http\Controllers\Controller;
use App\Models\BunnyModelPrice;
use Illuminate\Http\Request;

class BunnyPriceController extends Controller
{
    public function index()
    {
        $prices = BunnyModelPrice::with('model')->get();
        return response()->json($prices);
    }

    public function store(Request $request)
    {
        $request->validate([
            'model_id' => 'required|exists:bunnu_models,id',
            'incall_2h' => 'nullable|integer',
            'incall_3h' => 'nullable|integer',
            'incall_6h' => 'nullable|integer',
            'incall_12h' => 'nullable|integer',
            'outcall_1d' => 'nullable|integer',
            'outcall_3d' => 'nullable|integer',
            'outcall_ad' => 'nullable|integer',
        ]);

        $price = BunnyModelPrice::create($request->all());
        return response()->json($price, 201);
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
