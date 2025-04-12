<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
   
    public function index()
    {
        
        $departements = Departement::all();
      
        return response()->json($departements);
    }

    
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'designation' => 'required|string|max:255',
            'raccourci' => 'required|string|max:10',
        ], [
            'designation.required' => 'Le champ "designation" est obligatoire.',
            'raccourci.required' => 'Le champ "raccourci" est obligatoire.',
        ]);

        
        $departement = Departement::create([
            'designation' => $validated['designation'],
            'raccourci' => $validated['raccourci'],
        ]);

        
        return response()->json($departement, 201);
    }

    
    public function show(Departement $departement)
    {
        return response()->json($departement);
    }

   
    public function update(Request $request, Departement $departement)
    {
       
        $validated = $request->validate([
            'designation' => 'required|string|max:255',
            'raccourci' => 'required|string|max:10',
        ], [
            'designation.required' => 'Le champ "designation" est obligatoire.',
            'raccourci.required' => 'Le champ "raccourci" est obligatoire.',
        ]);

        
        $departement->update([
            'designation' => $validated['designation'],
            'raccourci' => $validated['raccourci'],
        ]);

        
        return response()->json($departement);
    }

   
    public function destroy(Departement $departement)
    {
       
        $departement->delete();

        
        return response()->json(['message' => 'Département supprimé avec succès']);
    }
}
