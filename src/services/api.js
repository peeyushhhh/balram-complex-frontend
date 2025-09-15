const API_BASE_URL = 'http://localhost:5000/api';

export const shopsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/shops`);
    return response.json();
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/shops/${id}`);
    return response.json();
  },
  
  create: async (shopData) => {
    const response = await fetch(`${API_BASE_URL}/shops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shopData)
    });
    return response.json();
  }
};
