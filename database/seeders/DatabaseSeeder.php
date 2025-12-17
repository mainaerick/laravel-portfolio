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
use Illuminate\Support\Facades\Hash;
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
        $email = env('ADMIN_EMAIL', 'admin@example.com');
        $password = env('ADMIN_PASSWORD', 'password');
        $name = env('ADMIN_NAME', 'System Admin');
        User::factory()->create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);
        DB::table('abouts')->insert([
            'name' => 'Eric N.',
            'title' => 'Full Stack Developer',
            'subtitle' => 'Building elegant, high-performing web solutions.',
            'short_bio' => 'I’m a passionate developer who loves crafting modern web apps using Laravel, React, and Firebase. My focus is on creating smooth user experiences and scalable systems.',
            'long_bio' => 'With several years of experience in web development, I focus on creating performant, secure, and user-friendly applications. My expertise spans backend systems using Laravel,SpringBoot and frontend development using React and TypeScript. I also enjoy integrating automation tools like Power Automate and UiPath to streamline business workflows.',
            'resume_url' => 'storage/resumes/resume.pdf',
            'cta_label' => 'View My Work',
            'cta_link' => '#projects',
            'avatar' => 'storage/avatars/portfolio.jpg',
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
            'React', 'Laravel', 'Tailwind', 'Fullstack','MySQL', 'API', 'UI/UX', 'Open Source','SpringBoot','Java','Typescript'
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
                'thumbnail' => 'storage/projects/portfolio.png',
                'github' => 'https://github.com/ericnit/portfolio',
                'live_url' => 'https://portfolio.fluxnerve.com',
                'meta' => json_encode(['role' => 'Fullstack Developer', 'year' => 2025]),
                'is_featured' => true,
                'order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Mobilia Furniture eCommerce',
                'slug' => 'mobilia-furniture-ecommerce',
                'description' => 'A modern furniture eCommerce platform built with Laravel, Inertia.js, React, and TypeScript. Features include a dynamic product catalog, image management, shopping cart, and responsive design powered by Laravel Sail for local development.',
                'thumbnail' => 'storage/projects/mobilia.png',
                'github' => 'https://github.com/mainaerick/laravel-mobilia',
                'live_url' => 'https://mobilia.fluxnerve.com/',
                'meta' => json_encode(['role' => 'Full Stack Developer', 'year' => 2024]),
                'is_featured' => true,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'HR Management System',
                'slug' => 'hr-management-system',
                'description' => 'An enterprise HR Management System built with Laravel, Inertia.js, React, and TailwindCSS. It streamlines employee management, attendance tracking, payroll, and reporting with secure authentication and role-based access control.',
                'thumbnail' => 'storage/projects/hrms.png',
                'github' => 'https://github.com/mainaerick/Laravel-HR-Management',
                'live_url' => 'https://hr.fluxnerve.com/',
                'meta' => json_encode(['role' => 'Full Stack Developer', 'year' => 2024]),
                'is_featured' => true,
                'order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Overflow Discussion Platform',
                'slug' => 'overflow-discussion-platform',
                'description' => 'A StackOverflow-inspired discussion platform built with React (TypeScript) and Spring Boot. Users can create rooms and topics for community discussions, with OAuth2 authentication, JWT security, and PostgreSQL for data management.',
                'thumbnail' => 'storage/projects/overflow.png',
                'github' => 'https://github.com/mainaerick/Overflow',
                'live_url' => null,
                'meta' => json_encode(['role' => 'Full Stack Developer', 'year' => 2024]),
                'is_featured' => true,
                'order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Speaker Shop Showcase',
                'slug' => 'speaker-shop-showcase',
                'description' => 'A modern audio equipment showcase built with Laravel 11, Inertia.js, React (TypeScript), and Ant Design. Features category-based browsing, advanced filters, dealer listings, and an admin panel for managing products, categories, and settings.',
                'thumbnail' => 'storage/projects/speaker-shop.png',
                'github' => 'https://github.com/mainaerick/Amp-Core',
                'live_url' => 'https://ampcore.fluxnerve.com',
                'meta' => json_encode(['role' => 'Full Stack Developer', 'year' => 2025]),
                'is_featured' => true,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('projects')->insert($projects);

        // PROJECT_TAG RELATIONS
        $projectTagMap = [
            1 => ['React','Typescript', 'Tailwind', 'Laravel','MySQL'],
            2 => ['React','Typescript', 'Tailwind', 'Laravel','MySQL'],
            3 => ['React','Typescript', 'Tailwind', 'Laravel','MySQL'],
            4 => ['SpringBoot', 'React', 'Fullstack'],
            5 => ['React','Typescript', 'Tailwind', 'Laravel','MySQL'],
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
            ['provider' => 'GitHub', 'url' => 'https://github.com/mainaerick', 'label' => '@ericnit', 'order' => 1],
//            ['provider' => 'Email', 'url' => 'mailto:niteric@gmail.com', 'label' => 'eric@domain.com', 'order' => 2],
        ];
        DB::table('socials')->insert($socials);

    }
}
