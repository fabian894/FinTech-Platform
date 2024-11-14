import { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { toast } from 'react-toastify';
import echo from '../echo'; // Import the echo instance

export default function WithdrawalForm({ userId }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return; // Avoid running if no userId

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

  const handleWithdrawal = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Ensure amount is a valid positive number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount.', { position: 'top-right' });
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient('/withdraw', 'POST', {
        amount: parsedAmount,
        description,
      });
      toast.success(response.message || 'Withdrawal successful!', { position: 'top-right' });
      
      // Reset form fields
      setAmount('');
      setDescription('');
    } catch (error) {
      toast.error(error.message || 'Withdrawal failed. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <form onSubmit={handleWithdrawal} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Withdraw Funds</h2>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Withdrawal Amount
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
          className={`bg-red-500 text-white p-2 rounded-lg w-full mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
}
