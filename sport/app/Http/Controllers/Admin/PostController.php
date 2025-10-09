<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PostModel;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = PostModel::all();
        
        $title = 'post List';
        $total = $posts->count();
        $publish = $posts->where('status', 'publish')->count();
        $draft = $posts->where('status', 'draft')->count();

        return view('admin.posts.list', compact('title', 'posts', 'total', 'publish', 'draft'));
    }

    public function create()
    {
        $title = 'Crate New post';
        return view('admin.posts.post' ,  compact('title'));
    }



    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'title'             => 'required|string|max:255',
            'slug'              => 'required|string|max:255|unique:posts,slug',
            'seo_title'         => 'required|string|max:500',
            'meta_description'  => 'required|string|max:255',
            'meta_keywords'     => 'nullable|string|max:500',
            'canonical_url'     => 'nullable|string|max:500',
            'status'            => 'required|string|max:255',
            'excerpt'           => 'nullable|string|max:255',
            'content'           => 'required',
            'feature_image'     => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = $request->all();

        // Handle feature image upload
        if ($request->hasFile('feature_image')) {
            $folderName = 'posts';
            $storagePath = storage_path("app/public/{$folderName}");

            // Create folder if it doesn't exist
            if (!file_exists($storagePath)) {
                mkdir($storagePath, 0755, true);
            }

            $image = $request->file('feature_image');
            $imageName = time() . '_' . $image->getClientOriginalName();

            // Store image in storage/app/public/posts
            $image->move($storagePath, $imageName);

            $data['feature_image'] = "storage/{$storagePath}/{$imageName}";
        }

        // Create post
        PostModel::create($data);

        return redirect()->route('admin.posts.create')->with('success', 'Post created successfully');
    }


    public function update(PostModel $post)
    {
        $title = 'Update post';
        return view('admin.posts.update', compact('title' , 'post'));
    }

    public function updateStore(Request $request, PostModel $post)
    {
        
        $request->validate([
           'post_name'        => 'required|string|max:255',
            'meta_title'       => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
            'meta_keywords'    => 'nullable|string|max:255',
            'slug'             => 'required|unique:posts,slug,' . $post->id,
            'canonical_url'    => 'nullable|url|max:255',
    
        ]);
        $post->post_name = $request->post_name;
        $post->meta_title = $request->meta_title;
        $post->meta_description = $request->meta_description;
        $post->meta_keywords = $request->meta_keywords;
        $post->slug = $request->slug;
        $post->status = $request->status;
        $post->canonical_url = $request->canonical_url;
        $post->save();
        return redirect()->route('admin.posts.update', $post->id)->with('success', 'post updated successfully');
    }

    public function destroy(PostModel $post)
    {
        $post->delete();
        return redirect()->route('admin.posts.index')->with('success', 'post deleted successfully');
    }
}