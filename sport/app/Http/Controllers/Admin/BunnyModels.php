<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BunnyModels\BunnuModel;
use App\Models\BunnyModels\BunnyModelImage;
use App\Models\BunnyModels\BunnyModelPrice;
use Illuminate\Support\Str;
use App\Imports\ModelsImport;
use App\Exports\ModelsExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class BunnyModels extends Controller
{
    public function index()
    {
        // Fetch all models with relations
        $models = BunnuModel::with(['prices', 'images'])->get();

        // Count totals
        $total    = $models->count();
        $pending  = $models->where('profile_status', 'pending')->count();
        $approved = $models->where('profile_status', 'approved')->count();

        // Page title
        $title = 'Model List';

        // Pass all variables to the view
        return view('admin.models.list', compact('title', 'models', 'total', 'pending', 'approved'));
    }

     public function create()
    {
        $title = 'Crate New Model';
        return view('admin.models.create' ,  compact('title'));
    }

    public function store(Request $request)
    {

        
        $request->validate([
            'email' => 'required|email|max:255',
            'firstname' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'description' => 'required|string|max:500',
            'age' => 'required|integer|min:18|max:100',
            'hips' => 'required|numeric|min:0',
            'waist' => 'required|numeric|min:0',
            'bust' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'nationality' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'languages' => 'required|string|max:255',
            'currency' => 'required|string|max:3',
            'incall_2h' => 'required|string|max:255',
            'incall_3h' => 'required|string|max:255',
            'incall_6h' => 'required|string|max:255',
            'incall_12h' => 'required|string|max:255',
            'outcall_1d' => 'required|string|max:255',
            'outcall_3d' => 'required|string|max:255',
            'outcall_ad' => 'required|string|max:255',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            // Save basic model data
            $username = $this->generateUniqueUsername($request->firstname);
            $modelData = [
                'email' => $request->email,
                'username' => $username,
                'firstname' => $request->firstname,
                'phone' => $request->phone,
                'description' => $request->description,
                'age' => $request->age,
                'hips' => $request->hips,
                'waist' => $request->waist,
                'bust' => $request->bust,
                'weight' => $request->weight,
                'height' => $request->height,
                'nationality' => $request->nationality,
                'city' => $request->city,
                'currency' => $request->currency,
            ];

            $model = BunnuModel::create($modelData);

            // Save rate data
            if ($model && isset($request->incall_2h)) {
                BunnyModelPrice::create([
                    'model_id' => $model->id,
                    'incall_2h' => $request->incall_2h,
                    'incall_3h' => $request->incall_3h,
                    'incall_6h' => $request->incall_6h,
                    'incall_12h' => $request->incall_12h,
                    'outcall_1d' => $request->outcall_1d,
                    'outcall_3d' => $request->outcall_3d,
                    'outcall_ad' => $request->outcall_ad,
                ]);
            }

            // Handle uploaded images safely
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    if ($image->isValid()) {
                        $folderName = $username;

                        // Ensure folder exists
                        $storagePath = storage_path("app/public/models/{$folderName}");
                        if (!file_exists($storagePath)) {
                            mkdir($storagePath, 0755, true);
                        }

                        $extension = $image->getClientOriginalExtension();
                        $filename = $folderName . '_' . ($index + 1) . '.' . $extension;

                        // Prevent overwriting existing file
                        $filename = $this->getUniqueFileName($storagePath, $filename);

                        $path = $image->storeAs("app/public/models/{$folderName}", $filename);

                        // Save in DB
                        BunnyModelImage::create([
                            'model_id' => $model->id,
                            'image' => "storage/app/public/models/{$folderName}/{$filename}"
                        ]);
                    }
                }
            }

            return redirect()->route('admin.models.store')->with('success', 'Model created successfully');

        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    /**
     * Generate unique filename to avoid overwrite
     */
    private function getUniqueFileName($path, $filename)
    {
        $file = pathinfo($filename, PATHINFO_FILENAME);
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $counter = 1;

        while (file_exists($path . '/' . $filename)) {
            $filename = $file . '_' . $counter . '.' . $extension;
            $counter++;
        }

        return $filename;
    }



    public function update(BunnuModel $model)
    {
        $title = 'Update Model';
        $model_id = $model->id;
        $model = BunnuModel::with(['prices', 'images'])->findOrFail($model_id);
        return view('admin.models.update', compact('title' , 'model'));
    }

    public function updateStore(Request $request, $id)
    {
        // Find existing model
         $model = BunnuModel::with(['prices', 'images'])->findOrFail($id);

        // Validate input
        $request->validate([
            'email' => 'required|email|max:255',
            'firstname' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'description' => 'required|string|max:500',
            'age' => 'required|integer|min:18|max:100',
            'hips' => 'required|numeric|min:0',
            'waist' => 'required|numeric|min:0',
            'bust' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'nationality' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'languages' => 'required|string|max:255',
            'currency' => 'required|string|max:3',
            'incall_2h' => 'required|string|max:255',
            'incall_3h' => 'required|string|max:255',
            'incall_6h' => 'required|string|max:255',
            'incall_12h' => 'required|string|max:255',
            'outcall_1d' => 'required|string|max:255',
            'outcall_3d' => 'required|string|max:255',
            'outcall_ad' => 'required|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Update model fields
        $model->email = $request->email;
        $model->firstname = $request->firstname;
        $model->phone = $request->phone;
        $model->description = $request->description;
        $model->age = $request->age;
        $model->hips = $request->hips;
        $model->waist = $request->waist;
        $model->bust = $request->bust;
        $model->weight = $request->weight;
        $model->height = $request->height;
        $model->nationality = $request->nationality;
        $model->city = $request->city;
        $model->languages = $request->languages;
        $model->currency = $request->currency;
        $model->profile_status = $request->profile_status;
        $model->save();

        // Update prices
        $price = BunnyModelPrice::where('model_id', $model->id)->first();
        if ($price) {
            $price->incall_2h = $request->incall_2h;
            $price->incall_3h = $request->incall_3h;
            $price->incall_6h = $request->incall_6h;
            $price->incall_12h = $request->incall_12h;
            $price->outcall_1d = $request->outcall_1d;
            $price->outcall_3d = $request->outcall_3d;
            $price->outcall_ad = $request->outcall_ad;
            $price->save();
        }

        // Handle new uploaded images
        if ($request->hasFile('images')) {

            $folderName = strtolower(str_replace(' ', '_', $model->firstname));
            $storageFolder = "models/{$folderName}";

            // Delete previous images
            $previousImages = BunnyModelImage::where('model_id', $model->id)->get();
            foreach ($previousImages as $oldImage) {
                if (Storage::disk('public')->exists(str_replace('storage/', '', $oldImage->image))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $oldImage->image));
                }
                $oldImage->delete(); // remove database record
            }

            // Store new images
            foreach ($request->file('images') as $index => $image) {
                if ($image->isValid()) {
                    $extension = $image->getClientOriginalExtension();
                    $filename = $folderName . '_' . time() . '_' . ($index + 1) . '.' . $extension;

                    $path = $image->storeAs($storageFolder, $filename, 'public');

                    BunnyModelImage::create([
                        'model_id' => $model->id,
                        'image' => "storage/{$storageFolder}/{$filename}" // public URL
                    ]);
                }
            }
        }


        return redirect()->route('admin.models.update', $model->id)->with('success', 'Model updated successfully');
    }


    public function destroy(BunnuModel $model)
    {
        $model->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully');
    }

     private function generateUniqueUsername(string $fullName, int $excludeId = null): string
    {
        $username = Str::slug($fullName);
        
        if (empty($username)) {
            $username = 'user';
        }

        $originalUsername = $username;
        $counter = 1;

        do {
            $existing = BunnuModel::all()->contains(function ($model) use ($username, $excludeId) {
                if ($excludeId && $model->id === $excludeId) {
                    return false;
                }
                return $model->username === $username;
            });

            if (!$existing) {
                break;
            }

            $username = $originalUsername . $counter;
            $counter++;
        } while ($counter < 1000);

        return $username;
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv'
        ]);

    
        Excel::import(new ModelsImport, $request->file('file'));

        return back()->with('success', 'Models imported successfully.');
    }

    public function export()
    {
        return Excel::download(new ModelsExport, 'models-' . date('Y-m-d') . '.xlsx');
    }
}
