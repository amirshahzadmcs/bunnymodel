<?php

namespace App\Models\BunnyModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BunnyModelPrice extends Model
{
    use HasFactory;

    protected $table = 'bunny_model_prices';

    protected $fillable = [
        'model_id',
        'incall_2h',
        'incall_3h',
        'incall_6h',
        'incall_12h',
        'outcall_1d',
        'outcall_3d',
        'outcall_ad',
    ];

    // Relationship: a price belongs to a Bunny Model
    public function model()
    {
        return $this->belongsTo(BunnuModel::class, 'model_id');
    }
}
