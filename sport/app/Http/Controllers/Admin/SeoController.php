<?php

namespace App\Http\Controllers;

use App\Models\Seo;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    // Display a listing of all SEO entries
    public function index()
    {
        $seos = Seo::orderBy('created_at', 'desc')->get();
        return view('seos.index', compact('seos'));
    }

    // Show form to create a new SEO entry
    public function create()
    {
        return view('seos.create');
    }

    // Store a new SEO entry
    public function store(Request $request)
    {
        $request->validate([
            'page_name' => 'required|unique:seos,page_name',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'slug' => 'nullable|string|max:255|unique:seos,slug',
            'canonical_url' => 'nullable|url|max:255',
            'no_index' => 'boolean',
            'no_follow' => 'boolean',
        ]);

        Seo::create($request->all());

        return redirect()->route('seos.index')->with('success', 'SEO entry created successfully.');
    }

    // Show a single SEO entry
    public function show($id)
    {
        $seo = Seo::findOrFail($id);
        return view('seos.show', compact('seo'));
    }

    // Show form to edit an existing SEO entry
    public function edit($id)
    {
        $seo = Seo::findOrFail($id);
        return view('seos.edit', compact('seo'));
    }

    // Update an existing SEO entry
    public function update(Request $request, $id)
    {
        $seo = Seo::findOrFail($id);

        $request->validate([
            'page_name' => 'required|unique:seos,page_name,' . $seo->id,
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'slug' => 'nullable|string|max:255|unique:seos,slug',
            'canonical_url' => 'nullable|url|max:255',
            'no_index' => 'boolean',
            'no_follow' => 'boolean',
        ]);

        $seo->update($request->all());

        return redirect()->route('seos.index')->with('success', 'SEO entry updated successfully.');
    }

    // Delete an SEO entry
    public function destroy($id)
    {
        $seo = Seo::findOrFail($id);
        $seo->delete();

        return redirect()->route('seos.index')->with('success', 'SEO entry deleted successfully.');
    }

    // Optional: Toggle no_index status
    public function toggleNoIndex($id)
    {
        $seo = Seo::findOrFail($id);
        $seo->no_index = !$seo->no_index;
        $seo->save();

        return redirect()->back()->with('success', 'No Index status updated.');
    }

    // Optional: Toggle no_follow status
    public function toggleNoFollow($id)
    {
        $seo = Seo::findOrFail($id);
        $seo->no_follow = !$seo->no_follow;
        $seo->save();

        return redirect()->back()->with('success', 'No Follow status updated.');
    }
}
