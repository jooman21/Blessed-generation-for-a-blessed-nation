import API from './api';

// User service functions
const UserService = {
  // Get current user profile
  getCurrentUserProfile: async () => {
    try {
      const response = await API.get('/users/me');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update current user profile
  updateCurrentUserProfile: async (userData) => {
    try {
      const response = await API.put('/users/me', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // --- Admin Functions ---

  // Get all users (admin only)
  getAllUsers: async (params = {}) => {
    try {
      const response = await API.get('/users', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a specific user by ID (admin only)
  getUserById: async (id) => {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a specific user by ID (admin only)
  updateUserById: async (id, userData) => {
    try {
      const response = await API.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a specific user by ID (admin only)
  deleteUserById: async (id) => {
    try {
      const response = await API.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default UserService;
