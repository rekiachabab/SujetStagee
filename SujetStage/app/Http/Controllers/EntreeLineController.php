<?php 
namespace App\Http\Controllers;

use App\Models\EntreeLine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EntreeLineController extends Controller
{
    public function index($id)
{
    
    $entreeLines = EntreeLine::where('entree_id', $id)->get();

    return response()->json($entreeLines);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'entree_id' => 'required|exists:entrees,id',
            'art_id' => 'required|exists:articles,id',
            'quantite' => 'required|integer',
        ]);

        $entreeLine = EntreeLine::create($validated);

        DB::table('articles')
            ->where('id', $request->art_id)
            ->increment('qty_stock', $request->quantite);

        return response()->json($entreeLine, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'entree_id' => 'required|exists:entrees,id',
            'art_id' => 'required|exists:articles,id',
            'quantite' => 'required|integer',
        ]);

        $entreeLine = EntreeLine::findOrFail($id);

        $entreeLine->update($validated);

        return response()->json($entreeLine);
    }

    public function destroy($id)
    {
        $entreeLine = EntreeLine::findOrFail($id);
        $entreeLine->delete();

        return response()->json(null, 204);
    }
}