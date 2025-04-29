import API from './api';

// Authentication service functions
const adminAuthService = {
  // Register a new user
  createAdmin: async (userData) => {
    try {
      const response = await API.post('/AdminAuth/createAdmin', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Login a user
  Adminlogin: async (credentials) => {
    try {
      const response = await API.post('/AdminAuth/Adminlogin', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Logout a user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true, message: 'Logged out successfully' };
  },

// Get current user info
getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
  
      const parsedUser = JSON.parse(user);
  
      // Optional: Validate structure (e.g., must have id, role)
      if (!parsedUser.id || !parsedUser.role) {
        console.warn("Invalid user object in storage. Clearing.");
        localStorage.removeItem('user');
        return null;
      }
  
      return parsedUser;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      localStorage.removeItem('user'); // Clear corrupted data
      return null;
    }
  },
  // Get last login timestamp
  lastLogin: () => {
    const user = adminAuthService.getCurrentUser();
    return user?.lastLogin || null;
  },

  // Refresh user profile data
  refreshUserProfile: async () => {
    try {
      const response = await API.get('/auth/getAdmin');
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default adminAuthService;
