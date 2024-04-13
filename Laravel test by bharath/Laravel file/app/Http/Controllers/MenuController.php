<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\MenuItem;

use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function getMenus(Request $request)
    {



        $menus = MenuItem::all();

        return response()->json(['message' => 'Menus fetched successfully', 'menus' => $menus], 200);
    }
}
