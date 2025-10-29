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
        Schema::create('about', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('bio')->nullable();
            $table->string('resume_url')->nullable();
            $table->string('cta_label')->default('Get in Touch');
            $table->string('cta_link')->default('#contact');
            $table->string('avatar')->nullable(); // optional image path
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
