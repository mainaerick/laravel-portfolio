<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAboutRequest;
use App\Http\Requests\UpdateAboutRequest;
use App\Models\About;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $about = About::first();
        return Inertia::render('Admin/About/Index', [
            'about' => $about,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAboutRequest $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'short_bio' => 'nullable|string',
            'long_bio' => 'nullable|string',
            'resume_url' => 'nullable|url',
            'cta_label' => 'required|string|max:255',
            'cta_link' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $about = About::create($validated);

        return redirect()->route('admin.about.index')
            ->with('success', 'About section created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(About $about)
    {
        return response()->json(About::first());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(About $about)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAboutRequest $request,  $id)
    {
        $about = About::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'short_bio' => 'nullable|string',
            'long_bio' => 'nullable|string',
            'resume_url' => 'nullable|url',
            'cta_label' => 'required|string|max:255',
            'cta_link' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($about->avatar) {
                Storage::disk('public')->delete($about->avatar);
            }

            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $about->update($validated);

        return redirect()->route('admin.about.index')
            ->with('success', 'About section updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(About $about)
    {
        //
    }
}
