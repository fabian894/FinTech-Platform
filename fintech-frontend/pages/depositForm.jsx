import { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { toast } from 'react-toastify';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default function DepositForm({ userId }) {  // Ensure to pass userId as a prop to this component
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize Laravel Echo with Pusher
    window.Pusher = Pusher;
    const echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      forceTLS: true,
    });

    // Listen to user-specific channel for TransactionUpdated events
    echo.private(`user.${userId}`)
      .listen('TransactionUpdated', (event) => {
        console.log('Transaction updated:', event.transaction);
        toast.info(`Transaction Update: ${event.transaction.message}`, { position: 'top-right' });
      });

    // Clean up the Echo connection when component unmounts
    return () => {
      echo.leave(`user.${userId}`);
    };
  }, [userId]);

  const handleDeposit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient('/deposit', 'POST', {
        amount,
        description,
      });
      toast.success(response.message || 'Deposit successful!', { position: 'top-right' });
      // Reset form fields
      setAmount('');
      setDescription('');
    } catch (error) {
      toast.error(error.message || 'Deposit failed. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <form onSubmit={handleDeposit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Deposit Funds</h2>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Deposit Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button 
          type="submit" 
          className={`bg-green-500 text-white p-2 rounded-lg w-full mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Depositing...' : 'Deposit'}
        </button>
      </form>
    </div>
  );
}
