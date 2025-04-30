<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SortieLine extends Model
{
    use HasFactory;

    protected $fillable = [
        'sortie_id',
        'art_id',
        'num_invent',
        'ansinvt',
        'type_invt',
        'quantite',
    ];

    public function sortie()
    {
        return $this->belongsTo(Sortie::class);
    }

    public function article()
    {
        return $this->belongsTo(Article::class, 'art_id');
    }
}
