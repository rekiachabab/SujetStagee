<?php 


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Inscription réussie', 'user' => $user], 201);
    }

    // LOGIN
    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
    }

    $user = Auth::user();

    /* if (!$user->is_active) {
        return response()->json(['message' => 'Votre compte est désactivé.'], 403);
    } */

    return response()->json([
        'message' => 'Connexion réussie',
        'user' => $user
    ]);
}


    // LOGOUT
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}