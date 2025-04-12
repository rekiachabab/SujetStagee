<?php

// app/Http/Controllers/FonctionnaireController.php
namespace App\Http\Controllers;

use App\Models\Fonctionnaire;
use App\Models\Departement;
use Illuminate\Http\Request;

class FonctionnaireController extends Controller
{
    
    public function index()
    {
        $fonctionnaires = Fonctionnaire::with('departement')->get();
        return response()->json($fonctionnaires);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'departement_id' => 'required|exists:departements,id',
            'adresse' => 'required',
            'tel' => 'required',
            'ville' => 'required',
            'observation' => 'required',
            'email' => 'required|email',
            'responsable' => 'required',
            'fax' => 'required',
        ]);

        $fonctionnaire = Fonctionnaire::create($validated);

        return response()->json($fonctionnaire, 201); 
    }

    
    public function show(Fonctionnaire $fonctionnaire)
    {
        return response()->json($fonctionnaire->load('departement')); 
    }

    
    public function update(Request $request, Fonctionnaire $fonctionnaire)
    {
        $validated = $request->validate([
            'departement_id' => 'required|exists:departements,id',
            'adresse' => 'required',
            'tel' => 'required',
            'ville' => 'required',
            'observation' => 'required',
            'email' => 'required|email',
            'responsable' => 'required',
            'fax' => 'required',
        ]);

        $fonctionnaire->update($validated);

        return response()->json($fonctionnaire);
    }

   
    public function destroy(Fonctionnaire $fonctionnaire)
    {
        $fonctionnaire->delete();
        return response()->json(null, 204); 
    }
}
