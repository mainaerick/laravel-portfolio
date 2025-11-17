<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Social;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {

        $about = Cache::remember('portfolio.about', 3600, fn() => About::first());
        $projects = Cache::remember('portfolio.projects', 3600, fn() =>
        Project::with("tags")
            ->where('is_featured', true)
            ->orderBy('order')
            ->get(['id', 'title', 'slug','github', 'description', 'thumbnail', 'live_url'])
        );
        $contact = Cache::remember('portfolio.contact', 3600, fn() => Contact::first());
        $socials = Cache::remember('portfolio.socials', 3600, fn() => Social::all());
        $skills = Cache::remember('portfolio.skills', 3600, fn() => Skill::all());
        return Inertia::render('Portfolio', [
            'about' => $about,
            'projects' => $projects,
            'contact' => $contact,
            'socials' => $socials,
            'skills' => $skills,
        ]);
    }
}
