<?php
namespace App\Models\Admin;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $table = 'roles';

    protected $fillable = [
        'name',
        'slug',
        'guard_name',
    ];

    public function admins()
    {
        return $this->belongsToMany(AdminModel::class, 'admin_has_roles', 'role_id', 'admin_id');
    }

    public function assignPermissions(array $permissionIds = [])
    {
        // This works because we extend SpatieRole
        $this->syncPermissions($permissionIds);
    }
}
