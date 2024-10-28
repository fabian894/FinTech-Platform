<?php

namespace App\Http\Controllers;

use App\Services\PayPalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PayPalController extends Controller
{
    protected $payPalService;

    public function __construct(PayPalService $payPalService)
    {
        $this->payPalService = $payPalService;
    }

    public function linkAccount(Request $request)
    {
        $approvalUrl = $this->payPalService->generateApprovalUrl();
        return response()->json(['approval_url' => $approvalUrl], 200);
    }

    public function callback(Request $request)
    {
        if ($request->has('code')) {
            $authorizationCode = $request->get('code');
            $user = Auth::user();

            // Save the authorization code to the user's record or verify it
            $user->update(['paypal_authorization_code' => $authorizationCode]);

            return response()->json(['message' => 'PayPal account successfully linked'], 200);
        }

        return response()->json(['error' => 'Authorization failed'], 400);
    }

}
