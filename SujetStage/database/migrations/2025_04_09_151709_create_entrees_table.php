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
        Schema::create('entrees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('frs_id')->constrained('fournisseurs')->onDelete('cascade'); 
            $table->enum('type', ['Bon Commande', 'Bon Marche']); 
            $table->string('numero');
            $table->string('num_fact_bl')->nullable(); 
            $table->text('observation')->nullable(); 
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrees');
    }
};
