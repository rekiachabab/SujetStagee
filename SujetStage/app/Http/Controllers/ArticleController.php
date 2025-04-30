<?php
namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
   
    public function index()
    {
        $articles = Article::with('category')->get(); 
        return response()->json($articles);
    }
    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'category_id' => 'required|exists:categories,id',  
            'designation' => 'required|string|max:255',
            'qty_stock' => 'required|integer',
            'qty_alert' => 'required|integer',
            'unite' => 'required|string|max:255',
        ]);

        $article = Article::create($validated);
        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        return response()->json($article);
    }

   
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'designation' => 'required|string|max:255',
            'qty_stock' => 'required|integer',
            'qty_alert' => 'required|integer',
            'unite' => 'required|string|max:255',
        ]);

        $article->update($validated);
        return response()->json($article);
    }

   
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article supprimé']);
    }
}