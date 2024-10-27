<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class BankAccountApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_link_a_bank_account()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/link-bank-account', [
            'account_number' => '1234567890',
            'bank_name' => 'Test Bank',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Bank account linked successfully!']);
    }
}
