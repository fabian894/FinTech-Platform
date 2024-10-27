import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../apiClient'; 

const Header = () => {
    const [userName, setUserName] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className='flex justify-between px-4 pt-4'>
            <h2>Dashboard</h2>
            <h2>Welcome Back, {userName || 'User'}</h2>
        </div>
    );
};

export default Header;
