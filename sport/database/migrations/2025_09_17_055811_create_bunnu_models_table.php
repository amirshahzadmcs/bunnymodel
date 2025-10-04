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
        Schema::create('bunnu_models', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username', 100);
            $table->string('email', 100);
            $table->string('firstname', 200);
            $table->string('lastname', 200)->nullable();
            $table->string('phone', 50)->nullable();
            $table->boolean('phone_verified')->default(false);
            $table->text('description')->nullable();
            $table->string('age', 20)->nullable();
            $table->string('hips', 100)->nullable();
            $table->string('waist', 100)->nullable();
            $table->string('bust', 20)->nullable();
            $table->string('weight', 20)->nullable();
            $table->string('height', 20)->nullable();
            $table->string('nationality', 50)->nullable();
            $table->string('living_country', 50)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('languages', 200)->nullable();
            $table->string('currency', 20)->nullable();
            $table->timestamp('publishedOn')->useCurrent();
            $table->timestamp('updatedOn')->useCurrent()->useCurrentOnUpdate();
            $table->string('ip', 50)->nullable();
            $table->string('visit_count', 20)->nullable();

            // Indexes for faster search
            $table->index('username');
            $table->index('email');
            $table->index('firstname');
            $table->index('city');
            $table->index('nationality');
            $table->index('languages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bunnu_models');
    }
};
