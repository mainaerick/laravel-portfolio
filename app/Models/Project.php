<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'thumbnail', 'github', 'live_url', 'meta', 'is_featured', 'order'
    ];

    protected $casts = [
        'meta' => 'array',
        'is_featured' => 'boolean',
    ];

    // relationships
    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    // auto-slug
    protected static function booted() {
        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
        static::updating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }
}
