<?php

namespace App\Http\Controllers\API\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\API\Post\PostModel;

class PostController extends Controller
{
    // Get paginated posts
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $posts = PostModel::where('status', 'publish')
                    ->orderBy('published_at', 'desc')
                    ->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'current_page' => $posts->currentPage(),
            'per_page' => $posts->perPage(),
            'total' => $posts->total(),
            'last_page' => $posts->lastPage(),
            'data' => $posts->items(),
        ]);
    }

    // Get single post by ID
    public function show($id)
    {
        $post = PostModel::where('id', $id)
                    ->where('status', 'publish')
                    ->first();

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $post
        ]);
    }
}
