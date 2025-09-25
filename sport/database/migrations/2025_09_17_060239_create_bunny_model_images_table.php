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
        Schema::create('bunny_model_images', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Foreign key referencing bunnu_models
            $table->unsignedBigInteger('model_id');
            $table->string('image', 255)->nullable();
            
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();

            // Index for faster search
            $table->index('model_id');

            // Foreign key constraint
            $table->foreign('model_id')
                  ->references('id')
                  ->on('bunnu_models')
                  ->onDelete('cascade'); // delete images if model is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bnmodel_images');
    }
};
