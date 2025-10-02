<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\PermissionsModel;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions
     */
    public function index()
    {
        $permissions = PermissionsModel::all();
        return view('admin.permissions.list', compact('permissions'));
    }

    /**
     * Show the form for creating a new permission
     */
    public function create()
    {
        return view('admin.permissions.create');
    }

    /**
     * Store a newly created permission in storage
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        PermissionsModel::create([
            'name'       => $request->name,
            'slug'       => Str::slug($request->name),
            'guard_name' => 'admin',
        ]);

        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission created successfully.');
    }

    /**
     * Show the form for editing the specified permission
     */
    public function edit(PermissionsModel $permission)
    {
        return view('admin.permissions.update', compact('permission'));
    }

    /**
     * Update the specified permission in storage
     */
    public function update(Request $request, PermissionsModel $permission)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update([
            'name'       => $request->name,
            'slug'       => Str::slug($request->name),
            'guard_name' => 'admin',
        ]);

        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission updated successfully.');
    }

    /**
     * Remove the specified permission from storage
     */
    public function destroy($permissionId)
    {
        // Remove the permission safely
        PermissionsModel::removePermission($permissionId);

        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
