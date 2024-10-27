<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class TransactionHistoryApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_their_transactions()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        // Assuming you have a transaction factory set up
        $transaction = \App\Models\Transaction::factory()->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/transactions');

        $response->assertStatus(200)
                 ->assertJsonFragment(['id' => $transaction->id]);
    }
}
