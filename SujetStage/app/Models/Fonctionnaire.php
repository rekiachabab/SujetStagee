<?php

// app/Models/Fonctionnaire.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fonctionnaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'departement_id',
        'adresse',
        'tel',
        'ville',
        'observation',
        'email',
        'responsable',
        'fax'
    ];

   
    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
}
