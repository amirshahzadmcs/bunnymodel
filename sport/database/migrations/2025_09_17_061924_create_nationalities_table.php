<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up(): void
    {
        Schema::create('nationalities', function (Blueprint $table) {
            $table->mediumIncrements('id'); // Primary Key
            $table->string('name', 100);
            $table->string('slug', 100);
            $table->string('city_slug', 100);
            $table->integer('price')->nullable();
            
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            // Indexes
            $table->index('name');
            $table->index('slug');
            $table->index('city_slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nationalities');
    }
};
