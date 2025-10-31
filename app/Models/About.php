<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'name',
        'title',
        'subtitle',
        'short_bio',
        'long_bio',
        'resume_url',
        'cta_label',
        'cta_link',
        'avatar',
    ];
}
