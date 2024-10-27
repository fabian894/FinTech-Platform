<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Customer;

class BankAccountController extends Controller
{
    public function linkBankAccount(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'bank_name' => 'required|string',
            'account_number' => 'required|string',
            'account_holder_name' => 'required|string',
        ]);

        // Set Stripe API Key
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        // Create a Stripe Customer
        $stripeCustomer = Customer::create([
            'name' => $request->account_holder_name,
            'email' => auth()->user()->email,
            'description' => 'Bank Account Linking for ' . auth()->user()->name,
        ]);

        // Save bank account details in the database
        $bankAccount = BankAccount::create([
            'user_id' => auth()->user()->id,
            'bank_name' => $request->bank_name,
            'account_number' => $request->account_number,
            'account_holder_name' => $request->account_holder_name,
            'stripe_bank_account_id' => $stripeCustomer->id,
        ]);

        // Return response
        return response()->json(['message' => 'Bank account linked successfully!'], 201);
    }

    // New method to get all linked accounts for the logged-in user
    public function getLinkedAccounts()
    {
        $userId = auth()->user()->id; // Get the authenticated user's ID
        $bankAccounts = BankAccount::where('user_id', $userId)->get(); // Fetch all bank accounts for the user

        // Return the linked bank accounts
        return response()->json($bankAccounts, 200);
    }
}
