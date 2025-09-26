<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('permissions')->insert([
            ['name' => 'Manage Users', 'slug' => 'manage-users', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Manage Posts', 'slug' => 'manage-posts', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'View Reports', 'slug' => 'view-reports', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Edit Settings', 'slug' => 'edit-settings', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
