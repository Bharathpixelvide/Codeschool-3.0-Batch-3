<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);



        // \App\Models\Category::factory()->create([
        //     'category_name' => 'Shopping',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_name' => 'Housing',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_name' => 'Entertainment',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_name' => 'Medical',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_name' => 'Transportation',
        // ]);
        \App\Models\Category::factory()->create([
            'category_name' => 'Salary',
        ]);
        \App\Models\Category::factory()->create([
            'category_name' => 'Earned Income',
        ]);
        \App\Models\Category::factory()->create([
            'category_name' => 'Royalties',
        ]);
    }
}
