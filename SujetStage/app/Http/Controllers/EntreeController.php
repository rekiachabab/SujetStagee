<?php

namespace App\Http\Controllers;

use App\Models\Entree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class EntreeController extends Controller
{
    public function index()
    {
        return response()->json(Entree::all());
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'frs_id' => 'required|exists:fournisseurs,id',
        'type' => 'required',
        'numero' => 'required|in:1,2',
        'numFactBL' => 'required|string',
        'observation' => 'nullable|string',
        'date' => 'required|date',
    ]);

    try {
        $entree = Entree::create([
            'frs_id' => $validated['frs_id'],
            'type' => $validated['type'],
            'numero' => $validated['numero'],
            'numFactBL' => $validated['numFactBL'],
            'observation' => $validated['observation'],
            'date' => $validated['date'],
        ]);

        return response()->json($entree, 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur serveur',
            'error' => $e->getMessage()
        ], 500);
    }
}


    public function show($id)
    {
        $entree = Entree::with('fournisseur')->find($id);
        return response()->json($entree);
    }
    public function more($id)
    {
        
       
        $entree = DB::table('entrees')
        ->join('fournisseurs', 'fournisseurs.id', '=', 'frs_id')
        ->select('entrees.*', 'numFactBL', 'fournisseurs.id as fournisseurs_id', 'fournisseurs.raison', 'type' )
        ->where('entrees.id', '=' ,$id)
        ->get();

        $entreeline = DB::table('entree_lines')
            ->join('articles', 'articles.id', '=', 'art_id')
            ->select('articles.designation', 'entree_lines.*')
            ->where('entree_id', $id)
            ->get();

           
            return response()->json([ $entree, $entreeline ]);
    }


    public function destroy($id)
    {
        try {
            $entree = Entree::findOrFail($id);
            $entree->delete();
            return response()->json(['message' => 'Entree supprimée avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression', 'error' => $e->getMessage()], 500);
        }
    }
}