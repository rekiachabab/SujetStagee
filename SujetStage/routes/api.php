<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\FournisseurController;

use App\Http\Controllers\FonctionnaireController;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});










Route::get('/fournisseurs', [FournisseurController::class, 'index']);
Route::post('/fournisseurs', [FournisseurController::class, 'store']);
Route::get('/fournisseurs/{fournisseur}', [FournisseurController::class, 'show']);
Route::put('/fournisseurs/{fournisseur}', [FournisseurController::class, 'update']);
Route::delete('/fournisseurs/{fournisseur}', [FournisseurController::class, 'destroy']);


Route::get('/categories', [CategorieController::class, 'index']);       
Route::post('/categories', [CategorieController::class, 'store']);       
Route::get('/categories/{categorie}', [CategorieController::class, 'show']); 
Route::put('/categories/{categorie}', [CategorieController::class, 'update']); 
Route::delete('/categories/{categorie}', [CategorieController::class, 'destroy']);



Route::get('departements', [DepartementController::class, 'index']);
Route::post('departements', [DepartementController::class, 'store']);
Route::get('departements/{departement}', [DepartementController::class, 'show']);
Route::put('departements/{departement}', [DepartementController::class, 'update']);
Route::delete('departements/{departement}', [DepartementController::class, 'destroy']);



Route::get('fonctionnaires', [FonctionnaireController::class, 'index']); // Get all fonctionnaires
Route::post('fonctionnaires', [FonctionnaireController::class, 'store']); // Create a new fonctionnaire
Route::get('fonctionnaires/{fonctionnaire}', [FonctionnaireController::class, 'show']); // Get a specific fonctionnaire
Route::put('fonctionnaires/{fonctionnaire}', [FonctionnaireController::class, 'update']); // Update a fonctionnaire
Route::delete('fonctionnaires/{fonctionnaire}', [FonctionnaireController::class, 'destroy']); 
