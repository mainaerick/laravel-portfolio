<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('manage-portfolio') ?? true;
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
            'slug' => 'nullable|string|max:255|unique:projects,slug,' . $this->route('project'),
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'github' => 'nullable|url',
            'live_url' => 'nullable|url',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_featured' => 'nullable|boolean',
            'order' => 'nullable|integer'
        ];
    }
}
