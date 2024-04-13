<?php

namespace App\Http\Controllers;

use APP\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IncomeController extends Controller
{
    public function addIncome(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'income_date' => 'required',
            'amount' => 'required',
            'description' => 'required|min:5',

            'category_id' => 'required|exists:categories,id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 400);
        }

        $user = Auth::user();

        $income = Income::create([
            'income_date' => request('income_date'),
            'amount' => request('amount'),
            'description' => request('description'),
            'user_id' => $user->id,
            'category_id' => $request->input('category_id'),
        ]);
        return response()->json([
            'income' => $income,
            'message' => 'Income added Successfully',
        ], 200);
    }


    public function showIncomes()
    {
        $userId = Auth::user()->id;

        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                "error" => "User not found.",
            ], 404);
        }
        $incomes = Income::where('user_id', $userId)->orderBy('amount', 'desc')->get();

        $transformedIncomes = $incomes->map(function ($income) {
            return [
                'id' => $income->id,
                'income_date' => $income->income_date,
                'amount' => $income->amount,
                'description' => $income->description,
                'user_id' => $income->userId->username,
                'category_id' => $income->category->category_name,
            ];
        });


        return response()->json([
            'incomes' => $transformedIncomes,
            'message' => 'Incomes are displaying',
        ], 200);
    }
}
