<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Skill;
use App\Models\Social;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        DB::table('abouts')->insert([
            'name' => 'Eric N.',
            'title' => 'Full Stack Developer',
            'subtitle' => 'Building elegant, high-performing web solutions.',
            'short_bio' => 'I’m a passionate developer who loves crafting modern web apps using Laravel, React, and Firebase. My focus is on creating smooth user experiences and scalable systems.',
            'long_bio' => 'With several years of experience in web development, I focus on creating performant, secure, and user-friendly applications. My expertise spans backend systems using Laravel and frontend development using React and TypeScript. I also enjoy integrating automation tools like Power Automate and UiPath to streamline business workflows.',
            'resume_url' => 'https://yourportfolio.com/resume.pdf',
            'cta_label' => 'View My Work',
            'cta_link' => '#projects',
            'avatar' => '/images/profile-avatar.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        // SKILLS
        $skills = [
            ['name' => 'React', 'icon' => 'react', 'order' => 1],
            ['name' => 'TypeScript', 'icon' => 'typescript-icon', 'order' => 2],
            ['name' => 'Laravel', 'icon' => 'laravel', 'order' => 3],
            ['name' => 'Tailwind CSS', 'icon' => 'tailwindcss-icon', 'order' => 4],
            ['name' => 'Node.js', 'icon' => 'nodejs-icon', 'order' => 5],
            ['name' => 'MySQL', 'icon' => 'mysql-icon', 'order' => 6],
            ['name' => 'Firebase', 'icon' => 'firebase', 'order' => 7],
            ['name' => 'Java', 'icon' => 'java', 'order' => 8],
        ];
        DB::table('skills')->insert($skills);

        // TAGS
        $tags = collect([
            'React', 'Laravel', 'Tailwind', 'Fullstack', 'API', 'UI/UX', 'Open Source','Firebase','Java'
        ])->map(fn($name) => [
            'name' => $name,
            'slug' => Str::slug($name),
            'created_at' => now(),
            'updated_at' => now(),
        ])->toArray();
        DB::table('tags')->insert($tags);

        // PROJECTS
        $projects = [
            [
                'title' => 'Personal Portfolio',
                'slug' => 'personal-portfolio',
                'description' => 'A modern portfolio built with React, ShadCN UI, and Laravel backend.',
                'thumbnail' => 'images/projects/portfolio.png',
                'github' => 'https://github.com/ericnit/portfolio',
                'live_url' => 'https://ericnit.dev',
                'meta' => json_encode(['role' => 'Fullstack Developer', 'year' => 2025]),
                'is_featured' => true,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Audit Management System',
                'slug' => 'audit-management-system',
                'description' => 'Enterprise-level auditing and reporting tool with offline capabilities.',
                'thumbnail' => 'images/projects/audit.png',
                'github' => 'https://github.com/ericnit/audit-system',
                'live_url' => null,
                'meta' => json_encode(['role' => 'Lead Developer', 'year' => 2024]),
                'is_featured' => true,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Firebase Learning Platform',
                'slug' => 'firebase-learning-platform',
                'description' => 'Modular course system built with React, Firebase, and Tailwind.',
                'thumbnail' => 'images/projects/firebase-platform.png',
                'github' => 'https://github.com/ericnit/firebase-platform',
                'live_url' => null,
                'meta' => json_encode(['role' => 'Frontend Developer', 'year' => 2025]),
                'is_featured' => false,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('projects')->insert($projects);

        // PROJECT_TAG RELATIONS
        $projectTagMap = [
            1 => ['React', 'Tailwind', 'Laravel'],
            2 => ['Laravel', 'API', 'Fullstack'],
            3 => ['Firebase', 'React', 'UI/UX'],
        ];

        $tagIds = DB::table('tags')->pluck('id', 'name');
        foreach ($projectTagMap as $projectId => $tagNames) {
            foreach ($tagNames as $tagName) {
                DB::table('project_tag')->insert([
                    'project_id' => $projectId,
                    'tag_id' => $tagIds[$tagName],
                ]);
            }
        }

        // SOCIALS
        $socials = [
            ['provider' => 'GitHub', 'url' => 'https://github.com/ericnit', 'label' => '@ericnit', 'order' => 1],
            ['provider' => 'LinkedIn', 'url' => 'https://linkedin.com/in/ericnit', 'label' => 'LinkedIn', 'order' => 2],
            ['provider' => 'Twitter', 'url' => 'https://twitter.com/ericnit', 'label' => '@ericnit', 'order' => 3],
            ['provider' => 'Email', 'url' => 'mailto:eric@domain.com', 'label' => 'eric@domain.com', 'order' => 4],
        ];
        DB::table('socials')->insert($socials);

    }
}
