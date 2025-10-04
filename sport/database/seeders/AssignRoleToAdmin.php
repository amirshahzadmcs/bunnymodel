<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignRoleToAdmin extends Seeder
{
    public function run()
    {
        DB::table('admin_has_roles')->insert([
            ['role_id' => 1, 'admin_type' => 'App\Models\Admin\AdminModel' , 'admin_id' => 1],
        ]);
    }
}
