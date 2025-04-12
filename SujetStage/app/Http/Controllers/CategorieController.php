<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        return Categorie::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'category' => 'required|string|max:255',
        ]);

        return Categorie::create($validated);
    }

    public function show(Categorie $categorie)
    {
        return $categorie;
    }

    public function update(Request $request, Categorie $categorie)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'category' => 'required|string|max:255',
        ]);

        $categorie->update($validated);
        return $categorie;
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json(['message' => 'Catégorie supprimée']);
    }
}
