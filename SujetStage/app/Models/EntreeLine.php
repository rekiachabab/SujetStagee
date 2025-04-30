<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntreeLine extends Model
{
    use HasFactory;

    protected $table = 'entree_lines';

    protected $fillable = ['entree_id', 'art_id', 'quantite'];



    public function entree()
    {
        return $this->belongsTo(Entree::class, 'entree_id');
    }

    public function art()
    {
        return $this->belongsTo(Article::class, 'art_id');
    }

}