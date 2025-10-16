<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostModel extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'wp_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'status',
        'post_type',
        'published_at',
        'seo_title',
        'meta_description',
        'meta_keywords',
    ];

    // Optional: format published_at as Carbon date
    protected $dates = ['published_at'];

    // Scope to fetch only published posts
    public function scopePublished($query)
    {
        return $query->where('status', 'publish');
    }
}
