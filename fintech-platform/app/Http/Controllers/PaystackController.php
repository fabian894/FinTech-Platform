<?php

namespace App\Http\Controllers;

use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaystackController extends Controller
{
    protected $paystackService;

    public function __construct(PaystackService $paystackService)
    {
        $this->paystackService = $paystackService;
    }

    public function linkAccount(Request $request)
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $response = $this->paystackService->initiatePayment($user->email, 1000);

        if (isset($response['data']['authorization_url'])) {
            return response()->json(['authorization_url' => $response['data']['authorization_url']], 200);
        }

        return response()->json(['error' => 'Failed to initiate payment'], 500);
    }

    // public function callback(Request $request)
    // {
    //     // Get the reference from the query parameters
    //     $transactionReference = $request->query('reference');
    
    //     if (!$transactionReference) {
    //         return response()->json(['error' => 'Transaction reference not provided'], 400);
    //     }
    
    //     // Verify the transaction with Paystack
    //     $transaction = $this->paystackService->verifyTransaction($transactionReference);
    
    //     if ($transaction['status'] && $transaction['data']['status'] === 'success') {
    //         // Transaction was successful
    //         $user = Auth::user();
            
    //         // Here you can save the transaction details to your database or link the account
    
    //         return response()->json(['message' => 'Transaction successful', 'data' => $transaction], 200);
    //     }
    
    //     return response()->json(['error' => 'Transaction verification failed'], 400);
    // }
    
    public function callback(Request $request)
    {
        // Check for trxref and reference in the request
        $trxref = $request->get('trxref');
        $reference = $request->get('reference');
    
        if (!$trxref || !$reference) {
            return response()->json(['error' => 'Transaction reference not provided'], 400);
        }
    
        // Process the transaction verification here...
    
        return response()->json(['message' => 'Transaction verified'], 200);
    }
    

}
