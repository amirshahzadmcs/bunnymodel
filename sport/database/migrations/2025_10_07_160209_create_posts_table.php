<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('wp_id')->unique(); // WordPress post ID
            $table->string('title');
            $table->string('slug')->unique(); // Slug for SEO-friendly URL
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->string('status'); // publish, draft, etc.
            $table->string('post_type'); // post, page, etc.
            $table->dateTime('published_at');
            
            // SEO fields
            $table->string('seo_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
