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
        Schema::create('members', function (Blueprint $table) {
            $table->id(); // Primary key (auto-increment)

            $table->string('full_name');
            $table->string('country')->nullable();
            $table->string('nationality')->nullable();
            $table->string('phone')->nullable()->index();      // index for search
            $table->string('username')->index();   // index for search
            $table->string('email')->unique()->index(); // unique + index
            $table->string('password');
            $table->string('verification_token')->nullable();
            $table->string('profile_status', 20)->default('pending')->comment('Status of the record')->index();
            $table->string('email_status', 20)->default('pending')->comment('Status of the record')->index();
            
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
