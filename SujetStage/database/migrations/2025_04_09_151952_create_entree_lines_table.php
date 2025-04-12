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
        Schema::create('entree_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entree_id')->constrained('entrees')->onDelete('cascade'); 
            $table->foreignId('art_id')->constrained('articles')->onDelete('cascade'); 
            $table->integer('quantite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entree_lines');
    }
};
