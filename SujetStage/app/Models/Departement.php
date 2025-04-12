<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use App\Models\Fonctionnaire;

class Departement extends Model
{
    use HasFactory; 
    protected $table = 'departements';
    protected $fillable = ['designation', 'raccourci'];
    public function fonctionnaires()
    {
        return $this->hasMany(Fonctionnaire::class);
    }
    
}
