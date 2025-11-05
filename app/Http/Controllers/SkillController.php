<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search');
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('order', 'desc');

        $query = Skill::query();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Allow sorting only specific columns
        $allowedSorts = ['name', 'created_at', 'order'];
        if (!in_array($sortBy, $allowedSorts)) $sortBy = 'created_at';
        $sortDir = strtolower($sortDir) === 'asc' ? 'asc' : 'desc';

        $skills = $query->orderBy($sortBy, $sortDir)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Skills/Index', [
            'paginatedSkills' => $skills,
            'filters' => $request->only(['search', 'per_page', 'sort', 'order']),
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
    public function store(StoreSkillRequest $request)
    {
        $data = $request->validated();

        Skill::create([
            'name' => $data['name'],
            'icon' => $data['icon'] ?? null,
            'order' => $data['order'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'Skill created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Skill $skill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        $data = $request->validated();

        $skill->update([
            'name' => $data['name'],
            'icon' => $data['icon'] ?? null,
            'order' => $data['order'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'Skill updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->back()->with('success', 'Skill deleted successfully.');
    }
}
