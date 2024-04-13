<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::group(
    ['middleware' => ['auth:sanctum']],
    function () {
        Route::get('logout', [UserController::class, 'logout']);
        Route::get('user-details', [UserController::class, 'getUserDetails']);
        Route::get('get-menus', [MenuController::class, 'getMenus']);
        Route::post('add-expense', [ExpenseController::class, 'addExpense']);
        Route::get('show-expense', [ExpenseController::class, 'showExpenses']);
        Route::get('categories', [CategoryController::class, 'getCategories']);
        Route::post('add-income', [IncomeController::class, 'addIncome']);
        Route::get('show-income', [IncomeController::class, 'showIncomes']);
    }
);
