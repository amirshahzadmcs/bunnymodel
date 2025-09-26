<?php

namespace App\Models\Admin;

use Spatie\Permission\Models\Permission;

class PermissionsModel extends Permission
{
    protected $table = 'permissions';

    protected $fillable = [
        'name',
        'slug',
        'guard_name',
    ];

    public function admins()
    {

        return $this->belongsToMany(
            AdminModel::class,
            'admin_has_permissions',
            'permission_id',  
            'admin_id' 
        )->where('admin_type', AdminModel::class);
    }
}
