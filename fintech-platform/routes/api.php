<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\PaystackController;
use App\Http\Controllers\TransactionController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Using Stripe
Route::middleware('auth:api')->post('/link-bank-account', [BankAccountController::class, 'linkBankAccount']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/linked-accounts', [BankAccountController::class, 'getLinkedAccounts']);
});

// PayPal
Route::middleware('auth:api')->post('/paypal/link-account', [PayPalController::class, 'linkAccount']);
Route::middleware('auth:api')->get('/paypal/callback', [PayPalController::class, 'callback'])->name('paypal.callback');

// Paystack
Route::post('/paystack/link-account', [PaystackController::class, 'linkAccount']);
Route::get('/paystack/callback', [PaystackController::class, 'callback']);

// Trnasaction
Route::middleware('auth:api')->post('/deposit', [TransactionController::class, 'deposit']);
Route::middleware('auth:api')->post('/withdraw', [TransactionController::class, 'withdraw']);

Route::middleware('auth:api')->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!'], 200);
});

