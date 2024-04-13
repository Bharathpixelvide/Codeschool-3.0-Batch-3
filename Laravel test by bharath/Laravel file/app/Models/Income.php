<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Income extends Model
{
    use HasFactory;
    protected $fillable = [
        'income_date',
        'amount',
        'description',
        'user_id',
        'category_id'
    ];

    public function userId(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
