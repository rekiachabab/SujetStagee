<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categorie extends Model
{
    use HasFactory; 
    protected $fillable = ['type', 'category'];
    public function articles()
    {
        return $this->hasMany(Article::class, 'category_id');
    }

}
