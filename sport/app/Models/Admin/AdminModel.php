<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class AdminModel extends Authenticatable
{

    protected $table = 'admins'; // explicitly defining table name

    protected $guard = 'admin';
    protected $guard_name = 'admin';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

     public function roles()
    {
        return $this->belongsToMany(Role::class, 'admin_has_roles', 'admin_id', 'role_id');
    }

    /**
     * Check if admin has any of the given role slugs
     */
    public function hasRole($roles)
    {
        return $this->roles()->whereIn('slug', (array) $roles)->exists();
    }

    /**
     * Get all role slugs of this admin
     */
    public function getRoleSlugs()
    {
        return $this->roles()->pluck('slug')->toArray();
    }

    /**
     * Attach a role to the admin
     */
    public function assignRole($role)
    {
        $roleId = is_numeric($role)
            ? $role
            : Role::where('slug', $role)->value('id');

        if ($roleId) {
            $this->roles()->attach($roleId, ['admin_type' => self::class]);
        }
    }


    /**
     * Remove a role from the admin
     */
    public function removeRole($role)
    {
        $roleId = is_numeric($role)
            ? $role
            : Role::where('slug', $role)->value('id');

        if ($roleId) {
            $this->roles()->detach($roleId);
        }
    }

    /**
     * Sync (replace) all roles of the admin with a new set
     */
    public function syncRoles(array $roles)
    {
        $roleIds = Role::whereIn('slug', $roles)->pluck('id')->toArray();
        
        $syncData = [];
        foreach ($roleIds as $id) {
            $syncData[$id] = ['admin_type' => self::class];
        }

        $this->roles()->sync($syncData);
    }

    /**
     * Detach all roles from the admin
     */
    public function detachAllRoles()
    {
        $this->roles()->detach();
    }

    public function hasPermission($permissions)
    {
        return $this->permissions()->whereIn('slug', (array) $permissions)->exists();
    }

    public function permissions()
    {
        return $this->belongsToMany(
            Permission::class,
            'model_has_permissions',
            'model_id',
            'permission_id'
        )->withPivot('model_type');
    }

}
