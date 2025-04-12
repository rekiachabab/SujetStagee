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
        Schema::create('sorties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fct_id')->constrained('fonctionnaires')->onDelete('cascade'); // For 'FCT' (FK to fonctionnaires table)
            $table->foreignId('entree_id')->constrained('entrees')->onDelete('cascade'); // For 'Entree' (FK to entrees table)
            $table->enum('type', [
                'Scientific',
                'Informatique',
                'Mobilier et matériel bureau',
                'Matériel Enseignement',
                'Divers'
            ]); 
            $table->date('date_bl'); 
            $table->string('numero_bl');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sorties');
    }
};
