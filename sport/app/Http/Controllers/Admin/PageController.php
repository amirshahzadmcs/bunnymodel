<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\PageModel;

class PageController extends Controller
{
     public function index()
    {
        $pages = PageModel::all();
        
        $title = 'Page List';
        $total = $pages->count();
        $publish = $pages->where('status', 'publish')->count();
        $draft = $pages->where('status', 'draft')->count();

        return view('admin.pages.list', compact('title', 'pages', 'total', 'publish', 'draft'));
    }

    public function create()
    {
        $title = 'Crate New Page';
        return view('admin.pages.page' ,  compact('title'));
    }

    public function store(Request $request)
    {
        $request->validate([
           'page_name'        => 'required|string|max:255',
            'meta_title'       => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
            'meta_keywords'    => 'nullable|string|max:255',
            'slug'             => 'required|string|max:255|unique:pages,slug',
            'canonical_url'    => 'nullable|url|max:255',
    
        ]);

        PageModel::create($request->all());
        return redirect()->route('admin.pages.create')->with('success', 'Page created successfully');
    }

    public function update(PageModel $page)
    {
        $title = 'Update Page';
        return view('admin.pages.update', compact('title' , 'page'));
    }

    public function updateStore(Request $request, PageModel $page)
    {
        
        $request->validate([
           'page_name'        => 'required|string|max:255',
            'meta_title'       => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
            'meta_keywords'    => 'nullable|string|max:255',
            'slug'             => 'required|unique:pages,slug,' . $page->id,
            'canonical_url'    => 'nullable|url|max:255',
    
        ]);
        $page->page_name = $request->page_name;
        $page->meta_title = $request->meta_title;
        $page->meta_description = $request->meta_description;
        $page->meta_keywords = $request->meta_keywords;
        $page->slug = $request->slug;
        $page->status = $request->status;
        $page->canonical_url = $request->canonical_url;
        $page->save();
        return redirect()->route('admin.pages.update', $page->id)->with('success', 'Page updated successfully');
    }

    public function destroy(PageModel $page)
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully');
    }
}
