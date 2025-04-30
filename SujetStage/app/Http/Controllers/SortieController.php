<?php


namespace App\Http\Controllers;

use App\Models\Sortie;
use App\Models\Fonctionnaire;
use App\Models\Entree;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SortieController extends Controller
{
    
    public function index()
    {
        
        
        $sorties = DB::table('sorties')
                ->join('fonctionnaires', 'fonctionnaires.id', '=', 'fct_id')
                ->join('departements', 'departements.id', '=', 'departement_id')
                ->join('entrees', 'entrees.id', '=', 'entree_id')
                ->select('sorties.*', 'numFactBL', 'fonctionnaires.id as fonctionnaire_id', 'fonctionnaires.responsable', 'raccourci' )
                ->get();

        return response()->json($sorties);
    }

    
    public function store(Request $request)
    {
       
        $validatedData = $request->validate([
            'fct_id' => 'required|exists:fonctionnaires,id',  
            'entree_id' => 'required|exists:entrees,id',     
            'type' => 'required|in:Scientific,Informatique,Mobilier et matériel bureau,Matériel Enseignement,Divers',
            'date_bl' => 'required|date',
            'numero_bl' => 'required|string',
        ]);

        
        $sortie = Sortie::create([
            'fct_id' => $validatedData['fct_id'],
            'entree_id' => $validatedData['entree_id'],
            'type' => $validatedData['type'],
            'date_bl' => $validatedData['date_bl'],
            'numero_bl' => $validatedData['numero_bl'],
        ]);

       
        return response()->json($sortie, 201);
    }

   
    public function show($id)
    {
        
        
        $sortie = DB::table('sorties')
        ->join('fonctionnaires', 'fonctionnaires.id', '=', 'fct_id')
        ->join('departements', 'departements.id', '=', 'departement_id')
        ->join('entrees', 'entrees.id', '=', 'entree_id')
        ->select('sorties.*', 'numFactBL', 'fonctionnaires.id as fonctionnaire_id', 'fonctionnaires.responsable', 'raccourci' )
        ->where('sorties.id', '=' ,$id)
        ->get();

        return response()->json($sortie);
    }
    public function more($id)
    {
        
        
        $sortie = DB::table('sorties')
        ->join('fonctionnaires', 'fonctionnaires.id', '=', 'fct_id')
        ->join('departements', 'departements.id', '=', 'departement_id')
        ->join('entrees', 'entrees.id', '=', 'entree_id')
        ->select('sorties.*', 'numFactBL', 'fonctionnaires.id as fonctionnaire_id', 'fonctionnaires.responsable', 'raccourci' )
        ->where('sorties.id', '=' ,$id)
        ->get();

        $sortieline = DB::table('sortie_lines')
            ->join('articles', 'articles.id', '=', 'art_id')
            ->select('articles.designation', 'sortie_lines.*')
            ->where('sortie_id', $id)
            ->get();

            
            return response()->json([ $sortie, $sortieline ]);
    }

   
    public function update(Request $request, $id)
    {
       
        $validatedData = $request->validate([
            'fct_id' => 'required|exists:fonctionnaires,id',
            'entree_id' => 'required|exists:entrees,id',
            'type' => 'required|in:Scientific,Informatique,Mobilier et matériel bureau,Matériel Enseignement,Divers',
            'date_bl' => 'required|date',
            'numero_bl' => 'required|string',
        ]);

       
        $sortie = Sortie::findOrFail($id);
        $sortie->update($validatedData);

        
        return response()->json($sortie);
    }

   
    public function destroy($id)
    {
        
        $sortie = Sortie::findOrFail($id);
        $sortie->delete();

        
        return response()->json(['message' => 'Sortie deleted successfully']);
    }
}
