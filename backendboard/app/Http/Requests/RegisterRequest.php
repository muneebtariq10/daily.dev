<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "min:3", "max:30"],
            "email" => ["required", "string", "email", "unique:users,email"],
            "username" => ["required", "string", "unique:users,username", "alpha_num:ascii", "min:4", "max:30"],
            "password" => ["required", "string", "min:6", "max:32", "confirmed"],
        ];
    }
}
