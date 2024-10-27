import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient'; // Ensure you have the apiClient configured for API requests
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient('/user', 'GET');
        setUser(response);
      } catch (error) {
        setError(error.message || 'Failed to fetch user data');
        toast.error(error.message || 'Failed to fetch user data', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <p className="mt-4"><strong>Name:</strong> {user.name}</p>
        <p className="mt-2"><strong>Email:</strong> {user.email}</p>
        <p className="mt-2"><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile;
