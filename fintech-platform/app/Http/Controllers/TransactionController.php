<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\TransactionUpdated;


class TransactionController extends Controller
{
    public function deposit(Request $request)
    {
        $user = Auth::user(); // Retrieve the authenticated user
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'required|string|max:955',
        ]);
    
        try {
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'type' => 'deposit',
                'amount' => $request->amount,
                'description' => $request->description,
                'status' => 'completed', // Assume successful by default
            ]);

            event(new TransactionUpdated($transaction));

            return response()->json(['message' => 'Deposit successful', 'transaction' => $transaction], 201);

        } catch (\Exception $e) {
            // If any error occurs, set the transaction status to 'failed'
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'type' => 'deposit',
                'amount' => $request->amount,
                'description' => $request->description,
                'status' => 'failed', // Set status to failed
            ]);

            event(new TransactionUpdated($transaction));

            return response()->json(['error' => 'Deposit failed: ' . $e->getMessage(), 'transaction' => $transaction], 500);
        }
    }    

    public function withdraw(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'required|string|max:955',
        ]);

        try {
            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'type' => 'withdrawal',
                'amount' => $request->amount,
                'description' => $request->description,
                'status' => 'completed', // Assume successful by default
            ]);
           
            event(new TransactionUpdated($transaction));
            
            return response()->json(['message' => 'Withdrawal successful', 'transaction' => $transaction], 201);

        } catch (\Exception $e) {
            // If any error occurs, set the transaction status to 'failed'
            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'type' => 'withdrawal',
                'amount' => $request->amount,
                'description' => $request->description,
                'status' => 'failed', // Set status to failed
            ]);

            event(new TransactionUpdated($transaction));
            return response()->json(['error' => 'Withdrawal failed: ' . $e->getMessage(), 'transaction' => $transaction], 500);
        }
    }

    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())->get();
        return response()->json($transactions, 200);
    }
}
