<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSocialRequest;
use App\Http\Requests\UpdateSocialRequest;
use App\Models\Social;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $search = $request->get('search');
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('order', 'desc');

        $query = Social::query();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('provider', 'like', "%{$search}%");
            });
        }

        // allow sorting only certain columns
        $allowedSorts = ['provider'];
        if (!in_array($sortBy, $allowedSorts)) $sortBy = 'created_at';
        $sortDir = strtolower($sortDir) === 'asc' ? 'asc' : 'desc';

        $socials = $query->orderBy($sortBy, $sortDir)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Socials/Index', [
            'paginatedSocials' => $socials,
            'filters' => $request->only(['q','per_page','sort_by','sort_dir']),
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
    public function store(StoreSocialRequest $request)
    {
        $social = Social::create($request->validated());

        return redirect()->back()->with('success', "{$social->provider} link added successfully!");

    }

    /**
     * Display the specified resource.
     */
    public function show(Social $social)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Social $social)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSocialRequest $request, Social $social)
    {
        $social->update($request->validated());

        return redirect()->back()->with('success', "{$social->provider} updated successfully!");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Social $social)
    {
        $social->delete();

        return redirect()->back()->with('success', "{$social->provider} deleted successfully!");

    }
}
