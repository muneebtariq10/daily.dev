<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $payload = $request->validated();

        try {
            $payload["password"] = Hash::make($payload["password"]);

            User::create($payload);

            return response()->json(["message" => "Account created successfully!"], 200);
        } catch (\Exception $err) {
            Log::info("Register error => " . $err->getMessage());
            return response()->json(["message" => "Something went wrong!"], 500);
        }
    }

    public function login(Request $request)
    {
        $payload = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        try {
            $user = User::where("email", $payload["email"])->first();
            if (!$user || !Hash::check($payload["password"], $user->password)) {
                return response()->json(["message" => "Invalid Credentials"], 401);
            }

            $token = $user->createToken("web")->plainTextToken;
            $authRes = array_merge($user->toArray(), ["token" => $token]);

            return response()->json(["message" => "Logged in successfully!", "user" => $authRes]);
        } catch (\Exception $err) {
            Log::info("Login error => " . $err->getMessage());
            return response()->json(["message" => "Something went wrong!"], 500);
        }
    }

    public function checkCredentials(Request $request)
    {
        $payload = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        try {
            $user = User::where("email", $payload["email"])->first();
            if (!$user || !Hash::check($payload["password"], $user->password)) {
                return response()->json(["message" => "Invalid Credentials"], 401);
            }

            return response()->json(["status" => 200, "message" => "Logged in successfully!"]);
        } catch (\Exception $err) {
            Log::info("Login Credentials error => " . $err->getMessage());
            return response()->json(["message" => "Something went wrong!"], 500);
        }
    }
}
