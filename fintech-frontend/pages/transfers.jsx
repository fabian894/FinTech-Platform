import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import apiClient from '../apiClient'; 
import { toast } from 'react-toastify'; 
const Transfers = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(''); // State to hold the user's name

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        // Fetch the user information
        const userResponse = await apiClient('/user', 'GET'); 
        setUserName(userResponse.name); 

        // Fetch the transactions
        const transactionsResponse = await apiClient('/transactions', 'GET'); 
        setTransactions(transactionsResponse); 
      } catch (error) {
        toast.error('Failed to fetch data. Please try again.', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTransactions();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between px-4 pt-4'>
        <h2>Transactions</h2>
        <h2>Welcome Back, {userName || 'User'}</h2> {/* Display the user's name */}
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                <span>Amount</span>
                <span className='sm:text-left text-right'>Status</span>
                <span className='hidden md:grid'>Type</span>
                <span className='hidden sm:grid'>Date & Time</span>
              </div>
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex'>
                      <div className='bg-purple-100 p-3 rounded-lg'>
                        <FaShoppingBag className='text-purple-800' />
                      </div>
                      <div className='pl-4'>
                        <p className='text-gray-800 font-bold'>${parseFloat(transaction.amount).toLocaleString()}</p>
                        <p className='text-gray-800 text-sm'>{transaction.description}</p>
                      </div>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>
                      <span className={
                        transaction.status === 'Processing' ? 'bg-green-200 p-2 rounded-lg' :
                        transaction.status === 'Completed' ? 'bg-blue-200 p-2 rounded-lg' : 
                        transaction.status === 'failed' ? 'bg-red-500 p-2 rounded-lg' :
                        'bg-yellow-200 p-2 rounded-lg'
                      }>
                        {transaction.status}
                      </span>
                    </p>
                    <div className='sm:flex hidden justify-between items-center'>
                      <p>{transaction.type}</p>
                    </div>
                    <p className='hidden md:flex'>{new Date(transaction.created_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfers;
