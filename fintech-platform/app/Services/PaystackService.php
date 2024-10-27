<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PaystackService
{
    protected $baseUrl;
    protected $secretKey;

    public function __construct()
    {
        $this->baseUrl = env('PAYSTACK_BASE_URL');
        $this->secretKey = env('PAYSTACK_SECRET_KEY');
    }

    // public function initiatePayment($email, $amount)
    // {
    //     $response = Http::withToken($this->secretKey)
    //         ->post("{$this->baseUrl}/transaction/initialize", [
    //             'email' => $email,
    //             'amount' => $amount * 100, // Paystack accepts amounts in kobo
    //         ]);

    //     return $response->json();
    // }

    // Bypass

    // public function initiatePayment($email, $amount)
    // {
    //     $response = Http::withToken($this->secretKey)
    //         ->withoutVerifying() // Disable SSL verification
    //         ->post("{$this->baseUrl}/transaction/initialize", [
    //             'email' => $email,
    //             'amount' => $amount * 100, // Paystack accepts amounts in kobo
    //         ]);

    //     return $response->json();
    // }

    public function initiatePayment($email, $amount)
    {
        $response = Http::withToken($this->secretKey)
            ->withoutVerifying() // Disable SSL verification
            ->post("{$this->baseUrl}/transaction/initialize", [
                'email' => $email,
                'amount' => $amount * 100, // Paystack accepts amounts in kobo
                'callback_url' => env('PAYSTACK_CALLBACK_URL'), // Set your callback URL here
            ]);

        return $response->json();
    }
    
    public function verifyTransaction($reference)
    {
        $response = Http::withToken($this->secretKey)
            ->get("{$this->baseUrl}/transaction/verify/{$reference}");

        return $response->json();
    }
}
