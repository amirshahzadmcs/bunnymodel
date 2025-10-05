<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;
use Throwable;

class ModelsImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        // Use an explicit database transaction.
        try {
            DB::transaction(function () use ($rows) {
                
                // When using WithHeadingRow, the first row is already processed as headers, 
                // so the manual '$first = true' logic is unnecessary and can be removed.

                foreach ($rows as $row) {
                    // Check if the row is empty or completely null before processing
                    if ($row->filter()->isEmpty()) {
                        Log::info('Skipping empty row.');
                        continue;
                    }
                    
                    $username = $this->generateUniqueUsername($row['name']);
                    $folderName = $row['folder_name']; // Get folder name from Excel

                    // --- 1. Insert Model ---
                    
                    // Insert model directly into DB
                    $id = DB::table('bunnu_models')->insertGetId([
                        'firstname'   => $row['name'],
                        'username'    => $username,
                        'age'         => $row['age'] ?? null,
                        'nationality' => $row['nationality'] ?? null,
                        'phone'       => $row['phone'] ?? null,
                        'email'       => $row['email'] ?? null,
                        'height'      => $row['height'] ?? null,
                        'weight'      => $row['weight'] ?? null,
                        'bust'        => $row['bust'] ?? null,
                        'waist'       => $row['waist'] ?? null,
                        'hips'        => $row['hips'] ?? null,
                        'languages'   => $row['languages'] ?? null,
                        'living_country' => $row['living_country'] ?? null,
                        'city'        => $row['city'] ?? null,
                        'currency'    => $row['currency'] ?? null,
                    ]);

                    // --- 2. Insert Prices ---
                    
                    // Use updateOrInsert for prices, as there should only be one price record per model.
                    DB::table('bunny_model_prices')->updateOrInsert(
                        ['model_id' => $id],
                        [
                            'incall_2h'  => $row['lacal_1_2_hr'] ?? null,
                            'incall_3h'  => $row['lacal_upto_3_hr'] ?? null,
                            'incall_6h'  => $row['lacal_upto_6_hr'] ?? null,
                            'incall_12h' => $row['over_night'] ?? null,
                            'outcall_1d' => $row['international_24h'] ?? null,
                            'outcall_3d' => $row['international_48h'] ?? null,
                            'outcall_ad' => $row['additional_day'] ?? null,
                        ]
                    );
                    // --- 3. Handle Images ---
                    
                    // 3.1. Create folder
                    $folderPath = storage_path("app/public/models/{$folderName}");
                    if (!file_exists($folderPath)) {
                        mkdir($folderPath, 0755, true);
                        Log::info("Created folder: {$folderPath}");
                    }

                    // 3.2. Define image columns
                    $imageColumns = [
                        $row['image_1'] ?? null,
                        $row['image_2'] ?? null,
                        $row['image_3'] ?? null,
                        $row['image_4'] ?? null,
                        $row['image_5'] ?? null,
                    ];

                    $imageCounter = 1;

                    // 3.3. Insert images
                    foreach ($imageColumns as $img) {
                        if (!empty($img)) {

                            $dbImagePath = "storage/app/public/models/{$folderName}/{$img}";

                            DB::table('bunny_model_images')->insert(
                                [
                                    'model_id' => $id,
                                    'image'    => $dbImagePath,
                                ]
                            );
                            $imageCounter++;
                        }
                    }
                }
            });

        } catch (Throwable $e) {

            // Re-throw the exception so the controller or Maatwebsite knows the import failed.
            throw $e; 
        }
    }

    private function generateUniqueUsername(string $fullName, int $excludeId = null): string
    {
        $username = Str::slug($fullName);
        if (empty($username)) $username = 'user';

        $originalUsername = $username;
        $counter = 1;

        do {
            $exists = DB::table('bunnu_models')
                        ->where('username', $username)
                        ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
                        ->exists();

            if (!$exists) break;

            $username = $originalUsername . $counter;
            $counter++;
        } while ($counter < 1000);

        return $username;
    }
}
