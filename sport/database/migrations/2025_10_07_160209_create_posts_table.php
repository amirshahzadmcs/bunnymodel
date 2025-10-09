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
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->text('excerpt')->nullable();
            $table->string('status'); // publish, draft, etc.
            $table->string('feature_image')->nullable();
            
            // SEO fields
            $table->string('seo_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            $table->timestamps();

            // Index for faster lookups
            $table->index('slug');
            $table->index('title');
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
