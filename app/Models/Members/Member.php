<?php

namespace App\Models\Members;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Member extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // Fillable fields for mass assignment
    protected $fillable = [
        'first_name',
        'last_name',
        'country',
        'nationality',
        'phone',
        'username',
        'email',
        'password',
    ];

    // Hidden fields when converting to array or JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Casts if needed (optional)
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}