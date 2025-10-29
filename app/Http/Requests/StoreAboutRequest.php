<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAboutRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'resume_url' => ['nullable', 'url'],
            'cta_label' => ['required', 'string', 'max:100'],
            'cta_link' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable', 'string', 'max:255'], // if file uploads, handle separately
        ];
    }
}
