<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seo extends SeoController
{
     use HasFactory;

    protected $table = 'seos';

    protected $fillable = [
        'page_name',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'slug',
        'canonical_url',
        'no_index',
        'no_follow',
    ];
}
