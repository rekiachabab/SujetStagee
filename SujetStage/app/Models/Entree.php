<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entree extends Model
{
    use HasFactory;

    protected $fillable = [
        'frs_id',
        'type',
        'numero',
        'numFactBL',
        'observation',
        'date',
    ];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'frs_id');
    }
}