
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('jwtToken'); // Get the JWT token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default apiClient;
