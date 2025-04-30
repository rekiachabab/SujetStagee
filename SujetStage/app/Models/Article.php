<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory; 
    protected $fillable = ['type', 'category_id', 'designation', 'qty_stock', 'qty_alert', 'unite'];

    public function category()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }
    public function sortieLines()
{
    return $this->hasMany(SortieLine::class, 'art_id');
}

}
