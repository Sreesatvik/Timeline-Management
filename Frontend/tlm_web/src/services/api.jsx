// API utility functions for authenticated requests
const API_BASE_URL = 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Authentication required');
  }

  return response;
};

// Category API functions
export const categoryAPI = {
  getAll: () => apiRequest('/categories/getallcategories'),
  create: (data) => apiRequest('/categories/', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`/categories/delete?id=${id}`, {
    method: 'DELETE'
  })
};

// Assignment API functions
export const assignmentAPI = {
  getAll: (categoryId) => apiRequest(`/assignments/get_all_assignments?category_id=${categoryId}`),
  create: (data) => apiRequest('/assignments/add_assignment', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`/assignments/update_assignment?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`/assignments/delete_assignment?id=${id}`, {
    method: 'DELETE'
  })
};

// User API functions
export const userAPI = {
  login: (data) => fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  register: (data) => fetch(`${API_BASE_URL}/users/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
};