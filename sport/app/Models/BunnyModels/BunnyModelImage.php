<?php

namespace App\Models\BunnyModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BunnyModelImage extends Model
{
    use HasFactory;

    protected $table = 'bunny_model_images';

    protected $fillable = [
        'model_id',
        'image',
    ];

    public function model()
    {
        return $this->belongsTo(BunnuModel::class, 'model_id');
    }
}
