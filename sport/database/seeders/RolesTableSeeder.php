<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['name' => 'Super Admin', 'slug' => 'super-admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Admin', 'slug' => 'admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Editor', 'slug' => 'editor', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Viewer', 'slug' => 'viewer', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
