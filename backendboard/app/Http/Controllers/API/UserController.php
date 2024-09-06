<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateProfileImage(Request $request)
    {
        $payload = $request->validate([
            "image" => "required|image|mimes:jpg,gif,svg,png,jpeg,webp|max:2048"
        ]);
        
        try {
            $user = $request->user();
            $filename = $payload["image"]->store("images_" . $user->id);
            User::find($user->id)->update(["iamge" => $filename]);

            return response()->json(["image" => $filename]);
        } catch (\Exception $err) {
            Log::info("Profile image error => " . $err->getMessage());
            return response()->json(["message" => "Something went wrong!"], 500);
        }
    }
}
