<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|regex:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"',


        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 400);
        }



        $user = User::create([
            'username' => request('username'),
            'email' => request('email'),
            'password' => bcrypt(request('password')),



        ]);
        return response()->json([
            'user' => $user,
            'message' => 'Register Successful',
        ], 200);
    }

    public function login(Request $request)
    {
        $validator = validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 400);
        }

        $user = User::where(
            'email',
            $request->email
        )->first();

        if (!$user) {
            return response()->json([
                "message" => "User Not Found!"
            ], 404);
        }
        if (Hash::check($request->password, $user->password)) {
            $user->password = Hash::make($request->password);
            $user->save();
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        } else {
            return response()->json([
                'error' => $validator->errors()->first(),
                'message' => 'Password Incorrect!'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $userId = Auth::id();
        $user = User::where('id', $userId)->first();
        if ($user) {
            $user->tokens()->delete();
            return response()->json([
                'message' => 'Logged out Successfully'
            ], 200);
        } else {
            return response()->json([
                'error' => 'Logout failed check authentication once'
            ]);
        }
    }

    public function getUserDetails(Request $request)
    {
        $user = Auth::user();
        return response()->json(['message' => 'UserDetails are displaying', "user" => $user], 200);
    }
}
