<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\Role;
use App\Models\Admin\PermissionsModel;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     */
    public function index()
    {
        $roles = Role::all();
        $title = 'Roles List';
        return view('admin.roles.list', compact('roles', 'title'));
    }

    /**
     * Show the form for creating a new role.
     */
    public function create()
    {
        $title = 'Create New Role';
        $permissions = PermissionsModel::all();
        return view('admin.roles.create', compact('permissions' , 'title'));
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        $role = Role::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'guard_name' => 'admin',
        ]);

        $role->assignPermissions($request->permissions ?? []);

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(Role $role)
    {
        $title = 'Edit Role';

        // Get all permissions
        $permissions = PermissionsModel::all();

        // Get IDs/names of permissions assigned to this role
        $rolePermissions = $role->permissions->pluck('name')->toArray();

        return view('admin.roles.update', compact('role', 'title', 'permissions', 'rolePermissions'));
    }
    /**
     * Update the specified role in storage.
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'slug' => 'required|string|max:255|unique:roles,slug,' . $role->id,
            'guard_name' => 'nullable|string|max:255',
        ]);

       $role->name = $request->name;
        $role->slug = $request->slug;
        $role->guard_name = 'admin'; // fixed value
        $role->save();

        $role->syncPermissions($request->permissions ?? []);
        
        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(Role $role)
    {
        // Optional: prevent deletion of Super Admin role
        if ($role->slug === 'super-admin') {
            return redirect()->back()->with('error', 'Cannot delete Super Admin role.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}
