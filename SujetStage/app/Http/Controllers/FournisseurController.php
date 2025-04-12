<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    
    public function index()
    {
        $fournisseurs = Fournisseur::all(); 
       
        return response()->json($fournisseurs);
    }

    
    public function show(Fournisseur $fournisseur)
    {
        return response()->json($fournisseur);
    }

    
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'raison' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'tel' => 'required|numeric|digits_between:10,15',
            'ville' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'responsable' => 'required|string|max:255',
            'fax' => 'nullable|numeric|digits_between:10,15',
            'observation' => 'nullable|string|max:255',
        ]);

        
        $fournisseur = Fournisseur::create($validated);

        return response()->json([
            'message' => 'Fournisseur created successfully!',
            'data' => $fournisseur,
        ], 201);
    }

    
    public function update(Request $request, Fournisseur $fournisseur)
    {
        
        $validated = $request->validate([
            'raison' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'tel' => 'required|numeric|digits_between:10,15',
            'ville' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'responsable' => 'required|string|max:255',
            'fax' => 'nullable|numeric|digits_between:10,15',
            'observation' => 'nullable|string|max:255',
        ]);

        
        $fournisseur->update($validated);

        return response()->json([
            'message' => 'Fournisseur updated successfully!',
            'data' => $fournisseur,
        ]);
    }

   
    public function destroy(Fournisseur $fournisseur)
    {
        $fournisseur->delete();

        return response()->json([
            'message' => 'Fournisseur deleted successfully!',
        ]);
    }
}
