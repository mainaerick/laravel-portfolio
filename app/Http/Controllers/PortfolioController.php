<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $about = Cache::remember('portfolio.about', 3600, fn() => About::first());
        $projects = Cache::remember('portfolio.projects', 3600, fn() =>
        Project::where('is_featured', true)
            ->orderBy('order')
            ->get(['id', 'title', 'slug', 'description', 'thumbnail', 'live_url'])
        );
        $contact = Cache::remember('portfolio.contact', 3600, fn() => Contact::first());
        $socials = Cache::remember('portfolio.socialss', 3600, fn() => Social::all());
        return Inertia::render('Portfolio', [
            'about' => $about,
            'projects' => $projects,
            'contact' => $contact,
            'socials' => $socials,
        ]);
    }
}
