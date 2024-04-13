<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use APP\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;



class ExpenseController extends Controller
{
    public function addExpense(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'expense_date' => 'required',
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

        $expense = Expense::create([
            'expense_date' => request('expense_date'),
            'amount' => request('amount'),
            'description' => request('description'),
            'user_id' => $user->id,
            'category_id' => $request->input('category_id'),
        ]);
        return response()->json([
            'expense' => $expense,
            'message' => 'Expense added Successfully',
        ], 200);
    }




    public function showExpenses()
    {
        $userId = Auth::user()->id;

        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                "error" => "User not found.",
            ], 404);
        }
        $expenses = Expense::where('user_id', $userId)->orderBy('updated_at', 'desc')->paginate(5);
        $pageInfo = [
            'currentPage' => $expenses->currentPage(),
            'lastPage' => $expenses->lastPage(),
            'perPage' => $expenses->perPage(),
            'total' => $expenses->total()
        ];
        $transformedExpenses = $expenses->map(function ($expense) {
            return [
                'id' => $expense->id,
                'expense_date' => $expense->expense_date,
                'amount' => $expense->amount,
                'description' => $expense->description,
                'user_id' => $expense->userId->username,
                'category_id' => $expense->category->category_name,
            ];
        });


        return response()->json([
            'expenses' => $transformedExpenses,
            'pageInfo' => $pageInfo
        ], 200);
    }
}
