<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('languages')->insert([
            ['id' => 1, 'name' => 'English', 'slug' => 'english'],
            ['id' => 2, 'name' => 'German', 'slug' => 'german'],
            ['id' => 3, 'name' => 'French', 'slug' => 'french'],
            ['id' => 4, 'name' => 'Italian', 'slug' => 'italian'],
            ['id' => 5, 'name' => 'Spanish', 'slug' => 'spanish'],
            ['id' => 6, 'name' => 'Polish', 'slug' => 'polish'],
            ['id' => 7, 'name' => 'Dutch', 'slug' => 'dutch'],
            ['id' => 8, 'name' => 'Romanian', 'slug' => 'romanian'],
            ['id' => 9, 'name' => 'Russian', 'slug' => 'russian'],
            ['id' => 10, 'name' => 'Czech', 'slug' => 'czech'],
            ['id' => 11, 'name' => 'Hungarian', 'slug' => 'hungarian'],
            ['id' => 12, 'name' => 'Portuguese', 'slug' => 'portuguese'],
            ['id' => 13, 'name' => 'Greek', 'slug' => 'greek'],
            ['id' => 14, 'name' => 'Swedish', 'slug' => 'swedish'],
            ['id' => 15, 'name' => 'Bulgarian', 'slug' => 'bulgarian'],
            ['id' => 16, 'name' => 'Catalan', 'slug' => 'catalan'],
            ['id' => 17, 'name' => 'Danish', 'slug' => 'danish'],
            ['id' => 18, 'name' => 'Slovak', 'slug' => 'slovak'],
            ['id' => 19, 'name' => 'Finnish', 'slug' => 'finnish'],
            ['id' => 20, 'name' => 'Arabic', 'slug' => 'arabic'],
            ['id' => 21, 'name' => 'Lithuanian', 'slug' => 'lithuanian'],
            ['id' => 22, 'name' => 'Turkish', 'slug' => 'turkish'],
            ['id' => 23, 'name' => 'Galician', 'slug' => 'galician'],
            ['id' => 24, 'name' => 'Slovenian', 'slug' => 'slovenian'],
            ['id' => 25, 'name' => 'Latvian', 'slug' => 'latvian'],
            ['id' => 26, 'name' => 'Croatian', 'slug' => 'croatian'],
            ['id' => 27, 'name' => 'Basque', 'slug' => 'basque'],
            ['id' => 28, 'name' => 'Estonian', 'slug' => 'estonian'],
            ['id' => 29, 'name' => 'Urdu', 'slug' => 'urdu'],
            ['id' => 30, 'name' => 'Irish', 'slug' => 'irish'],
            ['id' => 31, 'name' => 'Hindi', 'slug' => 'hindi'],
            ['id' => 32, 'name' => 'Chinese', 'slug' => 'chinese'],
            ['id' => 33, 'name' => 'Welsh', 'slug' => 'welsh'],
            ['id' => 34, 'name' => 'Maltese', 'slug' => 'maltese'],
            ['id' => 35, 'name' => 'Japanese', 'slug' => 'japanese'],
            ['id' => 36, 'name' => 'Luxembourgish', 'slug' => 'luxembourgish'],
            ['id' => 37, 'name' => 'Scottish', 'slug' => 'scottish'],
            ['id' => 38, 'name' => 'Korean', 'slug' => 'korean'],
        ]);
    }
}
