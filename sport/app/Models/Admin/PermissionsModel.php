<?php

namespace App\Models\Admin;

use Spatie\Permission\Models\Permission;

class PermissionsModel extends Permission
{
    // Optional: explicitly define the table if different
    protected $table = 'permissions';

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
            'admin_has_permissions', // pivot table
            'permission_id',         // foreign key on pivot table for permission
            'admin_id'               // foreign key on pivot table for admin
        )->wherePivot('admin_type', AdminModel::class); // ensure only Admins
    }
}
