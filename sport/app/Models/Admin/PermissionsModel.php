<?php

namespace App\Models\Admin;

use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class PermissionsModel extends Permission
{
    // Optional: explicitly define the table if different
    protected $guard_name = 'admin'; // same guard as AdminModel
    protected $table = 'permissions'; // make sure table exists

    protected $fillable = [
        'name',
        'slug',
        'guard_name',
    ];

    /**
     * Relationship with Admins
     */

    public function admins()
    {
        return $this->belongsToMany(
            AdminModel::class,
            'admin_has_permissions',
            'permission_id',
            'admin_id'
        )->withPivot('admin_type');
    }

    public static function removePermission($permissionId)
    {

        
        DB::table('admin_has_permissions')->where('permission_id', $permissionId)->delete();
        DB::table('role_has_permissions')->where('permission_id', $permissionId)->delete();
        DB::table('permissions')->where('id', $permissionId)->delete();
    }
}
