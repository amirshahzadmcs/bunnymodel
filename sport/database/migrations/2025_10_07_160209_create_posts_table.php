<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // Auto-increment ID
            $table->bigInteger('wp_id')->unique(); // Original WordPress post ID
            $table->string('title');
            $table->longText('content');
            $table->text('excerpt')->nullable();
            $table->string('status')->default('publish'); // post_status
            $table->string('post_type')->default('post'); // post_type
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
