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
            ['name' => 'Access Dashboard', 'slug' => 'access-dashboard', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Manage roles permissions', 'slug' => 'manage-roles-permissions', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Manage pages', 'slug' => 'manage-pages', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Manage members', 'slug' => 'manage-members', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Manage models', 'slug' => 'manage-models', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}