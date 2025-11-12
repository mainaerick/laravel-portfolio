<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Public\ContactFormController;
use App\Http\Controllers\Public\PortfolioController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');

Route::middleware(['auth', 'can:view-admin'])
    ->prefix('admin')->name('admin.')->group(function () {
    Route::get('/about', [AboutController::class, 'index'])->name('about.index');
    Route::post('/about', [AboutController::class, 'store'])->name('about.store');
    Route::put('/about/{about}', [AboutController::class, 'update'])->name('about.update');
});

Route::middleware(['auth', 'can:view-admin'])
    ->prefix('admin')->name('admin.')->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::post('projects/bulk-destroy', [ProjectController::class, 'bulkDestroy'])->name('projects.bulk-destroy');
});
Route::middleware(['auth', 'can:view-admin'])
    ->prefix('admin')->name('admin.')->group(function () {
    Route::resource('tags', TagController::class);
    Route::post('tags/bulk-destroy', [TagController::class, 'bulkDestroy'])->name('tags.bulk-destroy');
});
Route::middleware(['auth', 'can:view-admin'])
    ->prefix('admin')->name('admin.')->group(function () {
    Route::resource('skills', SkillController::class);
    Route::post('skills/bulk-destroy', [SkillController::class, 'bulkDestroy'])->name('skills.bulk-destroy');
});
Route::middleware(['auth', 'can:view-admin'])
    ->prefix('admin')->name('admin.')->group(function () {
    Route::resource('socials', SocialController::class);
    Route::post('socials/bulk-destroy', [SocialController::class, 'bulkDestroy'])->name('socials.bulk-destroy');
});
Route::post('/contact', [ContactFormController::class, 'store'])->name('contact.store');
Route::middleware(['auth', 'can:view-admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    });
Route::middleware(['auth', 'can:view-admin'])
    ->get('/admin', function () {
    return Inertia::render('Admin/Dashboard');
});

Route::middleware(['auth', 'can:view-admin'])
    ->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
