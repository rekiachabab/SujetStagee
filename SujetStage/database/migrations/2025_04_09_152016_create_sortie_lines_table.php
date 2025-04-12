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
        Schema::create('sortie_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sortie_id')->constrained('sorties')->onDelete('cascade'); 
            $table->foreignId('art_id')->constrained('articles')->onDelete('cascade'); 
            $table->string('num_invent'); 
            $table->integer('quantite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sortie_lines');
    }
};
