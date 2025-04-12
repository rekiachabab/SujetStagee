<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fournisseur extends Model
{
    use HasFactory; 
    protected $table = 'fournisseurs';
protected $fillable = [
    'raison', 'adresse','observation', 'tel', 'ville', 'email', 'responsable', 'fax'
];

}
