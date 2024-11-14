import { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { toast } from 'react-toastify';
import echo from '../echo';  // Import the echo instance

export default function DepositForm({ userId }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !echo) return; // Avoid running if no userId or echo is undefined

    // Listen to user-specific channel for TransactionUpdated events
    const channel = echo.private(`user.${userId}`);
    channel.listen('TransactionUpdated', (event) => {
      console.log('Transaction updated:', event.transaction);
      toast.info(`Transaction Update: ${event.transaction.message}`, { position: 'top-right' });
    });

    // Clean up the Echo connection when component unmounts
    return () => {
      channel.leave();
    };
  }, [userId]);

  const handleDeposit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Ensure amount is a valid positive number
    if (amount <= 0) {
      toast.error('Please enter a valid amount.', { position: 'top-right' });
      setLoading(false);
      return;
    }

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
      const errorMessage = error.response?.data?.message || error.message || 'Deposit failed. Please try again.';
      toast.error(errorMessage, { position: 'top-right' });
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
