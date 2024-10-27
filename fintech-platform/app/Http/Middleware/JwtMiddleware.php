<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Validation\Constraint\ValidAt;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Validator;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Carbon\Carbon;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        try {
            $jwt = (new Parser())->parse($token);

            $signer = new Sha256();
            $validationConstraints = [
                new SignedWith($signer, new \Lcobucci\JWT\Signer\Key(env('JWT_SECRET'))),
                new ValidAt(Carbon::now())
            ];

            $validator = new Validator();

            if (!$validator->validate($jwt, ...$validationConstraints)) {
                return response()->json(['error' => 'Invalid token'], 401);
            }

            // If valid, add user to request
            $request->user = $jwt->getClaim('email');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token validation failed: ' . $e->getMessage()], 401);
        }

        return $next($request);
    }
}
