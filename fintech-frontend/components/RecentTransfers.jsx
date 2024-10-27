import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import apiClient from '../apiClient'; // Adjust the path based on your project structure
import { toast } from 'react-toastify';

const RecentTransfers = () => {
  const [transactions, setTransactions] = useState([]);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent transactions (adjust the endpoint as necessary)
        const transactionsResponse = await apiClient('/transactions', 'GET');
        setTransactions(transactionsResponse);

        // Fetch linked bank accounts
        const linkedAccountsResponse = await apiClient('/linked-accounts', 'GET');
        setLinkedAccounts(linkedAccountsResponse);
      } catch (error) {
        toast.error('Failed to fetch data. Please try again.', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full m-auto p-4 lg:h-[70vh] h-[50vh] border rounded-lg bg-white'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Recent Transactions */}
          <div className='mb-4'>
            <h2 className='font-semibold mb-2'>Recent Transactions</h2>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                  <div className='bg-purple-100 rounded-lg p-3'>
                    <FaShoppingBag className='text-purple-800' />
                  </div>
                  <div className='pl-4'>
                    <p className='text-gray-800 font-bold'>${parseFloat(transaction.amount).toLocaleString()}</p>
                    <p className='text-gray-400 text-sm'>{transaction.description}</p>
                  </div>
                  <p className='absolute right-6 text-sm'>
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
         <br /><hr /><br />
          {/* Linked Accounts */}
          <div>
            <h2 className='font-semibold mb-2'>Linked Accounts</h2>
            <ul>
              {linkedAccounts.map((account) => (
                <li key={account.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center'>
                  <div className='bg-purple-100 rounded-lg p-3'>
                    <FaShoppingBag className='text-purple-800' />
                  </div>
                  <div className='pl-4'>
                    <p className='text-gray-800 font-bold'>{account.bank_name}</p>
                    <p className='text-gray-400 text-sm'>Account No: {account.account_number}</p>
                    <p className='text-gray-400 text-sm'>Holder: {account.account_holder_name}</p>
                  </div>
                  <p className='absolute right-6 text-sm'>
                    {new Date(account.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentTransfers;
