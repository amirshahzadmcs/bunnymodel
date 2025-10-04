<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;
use Throwable; // Import Throwable for comprehensive exception handling

class ModelsImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        // Use an explicit database transaction. If any code inside the function fails,
        // it will automatically roll back all database changes, and the exception will be thrown/logged.
        try {
            DB::transaction(function () use ($rows) {
                $first = true;
                foreach ($rows as $row) {
                    // Check if the row is empty or completely null before processing
                    if ($first) {
                        $first = false;
                        continue;
                    }

                    $username = $this->generateUniqueUsername($row['basic_information']);

                    // --- Start processing row data ---
                    
                    // Insert model directly into DB
                    $id = DB::table('bunnu_models')->insertGetId([
                        'firstname'   => $row['basic_information'],
                        'username'    => $username,
                        // Numeric indices confirmed by user output, but header names are still recommended for reliability.
                        'age'         => $row[1] ?? null,
                        'nationality' => $row[2] ?? null,
                        'phone'       => $row[3] ?? null,
                        'email'       => $row[4] ?? null,
                        'height'      => $row[5] ?? null,
                        'weight'      => $row[6] ?? null,
                        'bust'        => $row[7] ?? null,
                        'waist'       => $row[8] ?? null,
                        'hips'        => $row[9] ?? null,
                        'languages'   => $row[10] ?? null,
                        'city'        => $row[12] ?? null,
                        'currency'    => $row[13] ?? null,
                    ]);

                    Log::info('Model record created.', [
                        'inserted_id' => $id,
                        'username'    => $username
                    ]);

                    // Insert prices
                    DB::table('bunny_model_prices')->updateOrInsert(
                        ['model_id' => $id],
                        [
                            'incall_2h'  => $row['model_pricess'] ?? null,
                            'incall_3h'  => $row[15] ?? null,
                            'incall_6h'  => $row[16] ?? null,
                            'incall_12h' => $row[17] ?? null,
                            'outcall_1d' => $row[18] ?? null,
                            'outcall_3d' => $row[19] ?? null,
                            'outcall_ad' => $row[20] ?? null,
                        ]
                    );
                    
                    Log::info('Price record updated/inserted.');

                    // Insert images
                    $folderPath = storage_path("app/public/models/{$username}");
                    if (!file_exists($folderPath)) {
                        mkdir($folderPath, 0755, true);
                    }

                    $imageColumns = [
                        $row['model_images'] ?? null,
                        $row[22] ?? null,
                        $row[23] ?? null,
                        $row[24] ?? null,
                        $row[25] ?? null,
                    ];

                    foreach ($imageColumns as $img) {

                        if (!empty($img)) {
                            $extension = pathinfo($img, PATHINFO_EXTENSION);
                            $basename  = pathinfo($img, PATHINFO_FILENAME);
                            $newFileName =  $basename . '.' . $extension;

                            // Only proceed if a file extension exists
                            if ($extension) {
                                DB::table('bunny_model_images')->updateOrInsert(
                                    ['model_id' => $id],
                                    ['image' => "models/{$username}/{$newFileName}"]
                                );
                            }
                        }
                    }
                    Log::info('Image records processed.');
                }
            });
            // If the transaction commits successfully, all data is saved.
            Log::info('Batch import completed and transaction committed successfully.');
            
        } catch (Throwable $e) {
            // Log the critical error that caused the entire transaction to fail/rollback.
            Log::critical('CRITICAL IMPORT FAILURE: Database transaction rolled back.', [
                'error_message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
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
