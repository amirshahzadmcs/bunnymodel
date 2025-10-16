<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->insert([
            ['name' => 'Thomas', 'email' => 'thomas@admin.com' , 'password' => '$2y$12$Nmr0SG2f3Nvc8RTmP6o/u.I80JVJ6JIHgdR.IihFflmmZDbzslKlO', 'status' => 1],
        ]);
    }
}