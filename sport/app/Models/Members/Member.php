<?php

namespace App\Models\Members;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Member extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'full_name',
        'country',
        'nationality',
        'phone',
        'username',
        'email',
        'password',
        'profile_status',
        'email_status',
        'verification_token'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'verification_token'
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Safe encryption methods
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $this->safeDecrypt($value) : null,
            set: fn ($value) => $value ? $this->safeEncrypt($value) : null,
        );
    }

    protected function email(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $this->safeDecrypt($value) : null,
            set: fn ($value) => $value ? $this->safeEncrypt($value) : null,
        );
    }

    protected function username(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $this->safeDecrypt($value) : null,
            set: fn ($value) => $value ? $this->safeEncrypt($value) : null,
        );
    }

    protected function phone(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $this->safeDecrypt($value) : null,
            set: fn ($value) => $value ? $this->safeEncrypt($value) : null,
        );
    }

    protected function country(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $this->safeDecrypt($value) : null,
            set: fn ($value) => $value ? $this->safeEncrypt($value) : null,
        );
    }

    protected function nationality(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $this->safeDecrypt($value) : null,
            set: fn ($value) => $value ? $this->safeEncrypt($value) : null,
        );
    }

    /**
     * Safe encryption method with fallback
     */
    private function safeEncrypt($value)
    {
        try {
            return Crypt::encryptString($value);
        } catch (\Exception $e) {
            // Fallback to base64 encoding if encryption fails
            return base64_encode($value);
        }
    }

    /**
     * Safe decryption method with fallback
     */
    private function safeDecrypt($value)
    {
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            // Try to decode as base64 if decryption fails
            $decoded = base64_decode($value, true);
            return $decoded !== false ? $decoded : $value;
        }
    }

    // Custom methods for encrypted search
    public static function findByEmail($email)
    {
        return static::all()->first(function ($member) use ($email) {
            try {
                return $member->email === $email;
            } catch (\Exception $e) {
                return false;
            }
        });
    }

    public static function findByUsernameOrEmail($identifier)
    {
        return static::all()->first(function ($member) use ($identifier) {
            try {
                return $member->email === $identifier || $member->username === $identifier;
            } catch (\Exception $e) {
                return false;
            }
        });
    }

    public static function emailExists($email)
    {
        return static::all()->contains(function ($member) use ($email) {
            try {
                return $member->email === $email;
            } catch (\Exception $e) {
                return false;
            }
        });
    }
}