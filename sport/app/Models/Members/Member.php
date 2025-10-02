<?php

namespace App\Models\Members;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Crypt;

class Member extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // Fillable fields for mass assignment
    protected $fillable = [
        'full_name',
        'country',
        'nationality',
        'phone',
        'username',
        'email',
        'password',
        'profile_status',
        'email_status'
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

    public function setFullNameAttribute($value)
    {
        $this->attributes['full_name'] = Crypt::encryptString($value);
    }
    public function setUsernameAttribute($value)
    {
        $this->attributes['username'] = Crypt::encryptString($value);
    }
    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = Crypt::encryptString($value);
    }
    public function setCountryAttribute($value)
    {
        $this->attributes['country'] = $value ? Crypt::encryptString($value) : null;
    }
    public function setNationalityAttribute($value)
    {
        $this->attributes['nationality'] = $value ? Crypt::encryptString($value) : null;
    }
    public function setPhoneAttribute($value)
    {
        $this->attributes['phone'] = $value ? Crypt::encryptString($value) : null;
    }

    // Decrypt on get
    public function getFullNameAttribute($value)
    {
        return Crypt::decryptString($value);
    }
    public function getUsernameAttribute($value)
    {
        return Crypt::decryptString($value);
    }
    public function getEmailAttribute($value)
    {
        return Crypt::decryptString($value);
    }
    public function getCountryAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }
    public function getNationalityAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }
    public function getPhoneAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }
}