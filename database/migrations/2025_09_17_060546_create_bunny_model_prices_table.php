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
        Schema::create('bunny_model_prices', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Foreign key referencing bunnu_models
            $table->unsignedBigInteger('model_id')->nullable();

            // Pricing columns
            $table->integer('incall_2h')->nullable();
            $table->integer('incall_3h')->nullable();
            $table->integer('incall_6h')->nullable();
            $table->integer('incall_12h')->nullable();
            $table->integer('outcall_1d')->nullable();
            $table->integer('outcall_3d')->nullable();
            $table->integer('outcall_ad')->nullable();
            
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();

            // Index for faster search
            $table->index('model_id');

            // Foreign key constraint (link to bunnu_models)
            $table->foreign('model_id')
                  ->references('id')
                  ->on('bunnu_models')
                  ->onDelete('cascade'); // deletes price rows if model deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bunny_model_prices');
    }
};
