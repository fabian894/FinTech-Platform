<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class TransactionApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_deposit_funds()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/deposit', [
            'amount' => 100,
            'description' => 'Test deposit',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Deposit successful!']);
    }

    /** @test */
    public function a_user_can_withdraw_funds()
    {
        $user = User::factory()->create(['balance' => 500]);
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/withdraw', [
            'amount' => 100,
            'description' => 'Test withdrawal',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Withdrawal successful!']);
        $this->assertEquals(400, $user->fresh()->balance);
    }
}
