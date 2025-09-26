<?php
namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';

    protected $fillable = [
        'role_id',
        'admin_type',
        'admin_id',
    ];

    public function admins()
    {
        return $this->belongsToMany(AdminModel::class, 'admin_has_roles', 'role_id', 'admin_id');
    }
}