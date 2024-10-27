<?php

namespace App\Services;

use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;

class PayPalService
{
    protected $apiContext;

    public function __construct()
    {
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                config('services.paypal.client_id'),
                config('services.paypal.secret')
            )
        );
        $this->apiContext->setConfig([
            'mode' => config('services.paypal.mode'),
        ]);
    }

    public function generateApprovalUrl()
    {
        $baseUrl = config('services.paypal.base_url', 'https://www.sandbox.paypal.com');
        $clientId = config('services.paypal.client_id');
        $redirectUri = route('paypal.callback');

        // Construct the PayPal authorization URL
        return "{$baseUrl}/signin/authorize?client_id={$clientId}&response_type=code&redirect_uri={$redirectUri}";
    }

    // public function generateApprovalUrl()
    // {
    //     $baseUri = 'https://www.sandbox.paypal.com/signin/authorize';
    //     $clientId = env('PAYPAL_CLIENT_ID');
    //     $redirectUri = urlencode(env('PAYPAL_REDIRECT_URI'));
    //     $scope = 'openid profile email';
    //     $responseType = 'code';

    //     return "{$baseUri}?client_id={$clientId}&scope={$scope}&redirect_uri={$redirectUri}&response_type={$responseType}";
    // }


    public function getApiContext()
    {
        return $this->apiContext;
    }
}
