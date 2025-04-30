<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\EntreeController;
use App\Http\Controllers\EntreeLineController;
use App\Http\Controllers\SortieController;
use App\Http\Controllers\SortieLineController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FonctionnaireController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/entree-lines', [EntreeLineController::class, 'store']);
Route::put('/entree-lines/{id}', [EntreeLineController::class, 'update']);
Route::delete('/entree-lines/{id}', [EntreeLineController::class, 'destroy']);


Route::get('entree-lines/{id}', [EntreeLineController::class, 'index']);
Route::get('entrees/more/{id}', [EntreeController::class, 'more']); 
Route::get('/entrees', [EntreeController::class, 'index']);
Route::post('/entrees', [EntreeController::class, 'store']);
Route::get('/entrees/{id}', [EntreeController::class, 'show']);
Route::put('/entrees/{id}', [EntreeController::class, 'update']);
Route::delete('/entrees/{id}', [EntreeController::class, 'destroy']);




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



Route::get('fonctionnaires', [FonctionnaireController::class, 'index']); 
Route::post('fonctionnaires', [FonctionnaireController::class, 'store']); 
Route::get('fonctionnaires/{fonctionnaire}', [FonctionnaireController::class, 'show']); 
Route::put('fonctionnaires/{fonctionnaire}', [FonctionnaireController::class, 'update']); 
Route::delete('fonctionnaires/{fonctionnaire}', [FonctionnaireController::class, 'destroy']); 




Route::get('articles', [ArticleController::class, 'index']);  
Route::post('articles', [ArticleController::class, 'store']); 
Route::get('articles/{article}', [ArticleController::class, 'show']); 
Route::put('articles/{article}', [ArticleController::class, 'update']); 
Route::delete('articles/{article}', [ArticleController::class, 'destroy']);



Route::get('sorties', [SortieController::class, 'index']); 
Route::post('sorties', [SortieController::class, 'store']); 
Route::get('sorties/{id}', [SortieController::class, 'show']); 
Route::get('sorties/more/{id}', [SortieController::class, 'more']); 
Route::put('sorties/{id}', [SortieController::class, 'update']); 
Route::delete('sorties/{id}', [SortieController::class, 'destroy']); 



Route::prefix('sortie-lines')->group(function () {
    Route::get('/{id}', [SortieLineController::class, 'index']);
    Route::post('/', [SortieLineController::class, 'store']);
    Route::put('/{id}', [SortieLineController::class, 'update']);
    Route::delete('/{id}', [SortieLineController::class, 'destroy']);
});



/* use App\Http\Controllers\Auth\PasswordResetController;

Route::post('/password/email', [PasswordResetController::class, 'sendResetLinkEmail']);

use App\Http\Controllers\Auth\PasswordResetLinkController;

Route::post('/password/email', [PasswordResetLinkController::class, 'store']);
 */







Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);



Route::post('/register', [AuthController::class, 'register']);




Route::post('api/password/email', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [PasswordResetController::class, 'reset']);



Route::get('/password-reset/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
Route::post('/password-reset', [PasswordResetController::class, 'reset'])->name('password.update');

Route::post('api/password/email', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink($request->only('email'));

    return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => 'Lien envoyé !'])
        : response()->json(['errors' => ['email' => [($status)]]], 422);
});

Route::post('/password/reset', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|confirmed|min:8',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => 'Mot de passe réinitialisé avec succès.'])
        : response()->json(['errors' => ['email' => [($status)]]], 422);
});



Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);


Route::post('/password/email', [PasswordResetController::class, 'sendResetLinkEmail']);

Route::post('/reset-password', [PasswordResetController::class, 'reset']);