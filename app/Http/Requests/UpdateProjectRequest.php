<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug,' . ($this->route('project')->id ?? 'NULL'),
            'description' => 'nullable|string',
            'thumbnail_file' => 'nullable|image|max:2048',
            'github' => 'nullable|url',
            'live_url' => 'nullable|url',
            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['required', 'integer', 'exists:tags,id'], // Enforce integer/existence
            'is_featured' => 'nullable|boolean',
            'order' => 'nullable|integer'
        ];
    }
}
