<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class PageModel extends Model
{
    protected $table = 'pages'; // make sure table exists
     protected $fillable = [
        'page_name',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'slug',
        'canonical_url',
        'no_index',
        'no_follow'
    ];

}
