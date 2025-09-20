<?php

namespace App\Models\BunnyModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BunnuModel extends Model
{
    use HasFactory;

    protected $table = 'bunnu_models'; // explicitly defining table name

    protected $fillable = [
        'username',
        'email',
        'firstname',
        'lastname',
        'phone',
        'phone_verified',
        'description',
        'age',
        'hips',
        'waist',
        'bust',
        'weight',
        'height',
        'nationality',
        'city',
        'languages',
        'currency',
        'ip',
        'visit_count',
    ];

    public $timestamps = false; // since you are using publishedOn and updatedOn

    public function prices()
    {
        return $this->hasMany(BunnyModelPrice::class, 'model_id');
    }
    
    public function images()
    {
        return $this->hasMany(BunnyModelImage::class, 'model_id');
    }

}
