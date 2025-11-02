<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = 2;
        $search = $request->get('search');
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('order', 'desc');

        $query = Project::query()->with('tags');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('github', 'like', "%{$search}%");
            });
        }

        // allow sorting only certain columns
        $allowedSorts = ['title','created_at','order','is_featured'];
        if (!in_array($sortBy, $allowedSorts)) $sortBy = 'created_at';
        $sortDir = strtolower($sortDir) === 'asc' ? 'asc' : 'desc';

        $projects = $query->orderBy($sortBy, $sortDir)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['q','per_page','sort_by','sort_dir']),
            'tags' => Tag::select('id','name')->orderBy('name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Projects/Create', [
            'tags' => Tag::select('id','name')->orderBy('name')->get(),
        ]);    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
            // ensure uniqueness
            $suffix = 1;
            $base = $data['slug'];
            while (Project::where('slug', $data['slug'])->exists()) {
                $data['slug'] = "{$base}-{$suffix}";
                $suffix++;
            }
        }

        if ($request->hasFile('thumbnail_file')) {
            $path = $request->file('thumbnail_file')->store('projects', 'public');
            $data['thumbnail'] = $path;
        }

        $project = Project::create([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'description' => $data['description'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'github' => $data['github'] ?? null,
            'live_url' => $data['live_url'] ?? null,
            'meta' => $data['meta'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'order' => $data['order'] ?? 0,
        ]);

        if (!empty($data['tags'])) {
            $project->tags()->sync($data['tags']);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('tags');
        return Inertia::render('Admin/Projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {

        $project->load('tags');
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'tags' => Tag::select('id','name')->orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
            $suffix = 1;
            $base = $data['slug'];
            while (Project::where('slug', $data['slug'])->where('id', '!=', $project->id)->exists()) {
                $data['slug'] = "{$base}-{$suffix}";
                $suffix++;
            }
        }

        if ($request->hasFile('thumbnail')) {
            // delete old if exists
            if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $path = $request->file('thumbnail')->store('projects', 'public');
            $data['thumbnail'] = $path;
        }

        $project->update([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'description' => $data['description'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? $project->thumbnail,
            'github' => $data['github'] ?? null,
            'live_url' => $data['live_url'] ?? null,
            'meta' => $data['meta'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'order' => $data['order'] ?? 0,
        ]);

        $project->tags()->sync($data['tags'] ?? []);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // delete thumbnail file if present
        if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
            Storage::disk('public')->delete($project->thumbnail);
        }
        $project->tags()->detach();
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }
    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $projects = Project::whereIn('id', $ids)->get();

        foreach ($projects as $project) {
            if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $project->tags()->detach();
            $project->delete();
        }

        return redirect()->route('admin.projects.index')->with('success', 'Selected projects deleted.');
    }
}
