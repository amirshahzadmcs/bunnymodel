<?php

namespace App\Models\API\Post;

use Illuminate\Database\Eloquent\Model;

class PostModel extends Model
{
    protected $table = 'posts'; // Your Laravel table name

    protected $fillable = [
        'wp_id',
        'title',
        'content',
        'excerpt',
        'status',
        'post_type',
        'published_at',
    ];

    public $timestamps = true; // If you have created_at and updated_at columns
}
