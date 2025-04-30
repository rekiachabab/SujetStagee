<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sortie extends Model
{
    use HasFactory;

    protected $fillable = [
        'fct_id',
        'entree_id',
        'type',
        'date_bl',
        'numero_bl',
    ];

   
    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class, 'fct_id');
    }

    
    public function entree()
    {
        return $this->belongsTo(Entree::class, 'entree_id');
    }
    public function lines()
{
    return $this->hasMany(SortieLine::class);
}

}


