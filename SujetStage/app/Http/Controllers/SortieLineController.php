<?php

namespace App\Http\Controllers;

use App\Models\SortieLine;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SortieLineController extends Controller
{
    
    public function index($id)
    {
        $sortie = DB::table('sortie_lines')
            ->join('articles', 'articles.id', '=', 'art_id')
            ->select('articles.designation', 'sortie_lines.*')
            ->where('sortie_id', $id)
            ->get();

        return response()->json($sortie);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sortie_id' => 'required|exists:sorties,id',
            'art' => 'required|exists:articles,id',
            'quantite' => 'required|integer|min:1',
            'raccourci' => 'required|string|min:1',
        ]);

       
        $lastNum = 0;
        $row = SortieLine::orderBy('num_invent', 'desc')->lockForUpdate()->first();
        if ($row) $lastNum = intval($row->num_invent);

        $lastNum++;

        for ($i = 0; $i < $request->quantite; $i++) {
            $line = new SortieLine;
            $line->sortie_id = $request->sortie_id;
            $line->art_id = $request->art;
            $line->type_invt = $request->raccourci;

            
            $line->ansinvt = now()->year;

            
            $line->num_invent = str_pad($lastNum + $i, 4, '0', STR_PAD_LEFT);
            $line->quantite = 1;

            $line->save();
        }
        DB::table('articles')
        ->where('id', $request->art)
        ->decrement('qty_stock', $request->quantite);
        return response()->json(['message' => 'Lignes ajoutées avec succès'], 201);
    }

    
    public function update(Request $request, $id)
    {
        $line = SortieLine::findOrFail($id);

        $validated = $request->validate([
            'sortie_id' => 'sometimes|exists:sorties,id',
            'art_id' => 'sometimes|exists:articles,id',
            'num_invent' => 'sometimes|string',
            'quantite' => 'sometimes|integer|min:1',
        ]);

        $line->update($validated);

        return response()->json($line);
    }

   
    public function destroy($id)
    {
        $line = SortieLine::findOrFail($id);
        $line->delete();

        return response()->json(['message' => 'Ligne supprimée avec succès']);
    }
}
