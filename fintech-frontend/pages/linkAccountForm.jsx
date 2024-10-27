import { useState } from 'react';
import apiClient from '../apiClient'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


export default function LinkBankAccountForm() {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLinkBankAccount = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient('/link-bank-account', 'POST', {
        bank_name: bankName,
        account_number: accountNumber,
        account_holder_name: accountHolderName,
      });
      toast.success(response.message || 'Bank account linked successfully!', { position: 'top-right' });
      // Reset form fields
      setBankName('');
      setAccountNumber('');
      setAccountHolderName('');
    } catch (error) {
      toast.error(error.message || 'Failed to link bank account. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <form onSubmit={handleLinkBankAccount} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Link Bank Account</h2>
        
        <div className="mb-4">
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
            Account Holder Name
          </label>
          <input
            type="text"
            id="accountHolderName"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button 
          type="submit" 
          className={`bg-blue-500 text-white p-2 rounded-lg w-full mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Linking Account...' : 'Link Bank Account'}
        </button>
      </form>
    </div>
  );
}
