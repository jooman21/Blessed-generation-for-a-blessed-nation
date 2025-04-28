import API from './api';

// Donation service functions
const DonationService = {
  // Create a new donation
  createDonation: async (donationData) => {
    try {
      const response = await API.post('/donations', donationData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get donation history for the logged-in user
  getMyDonations: async () => {
    try {
      const response = await API.get('/donations/me');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get donations for a specific project (admin only)
  getDonationsByProject: async (projectId, params = {}) => {
    try {
      const response = await API.get(`/donations/project/${projectId}`, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get overall donation statistics
  getDonationStats: async () => {
    try {
      const response = await API.get('/donations/stats');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a specific donation by ID (admin or owner)
  getDonationById: async (id) => {
    try {
      const response = await API.get(`/donations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update donation status (admin only)
  updateDonationStatus: async (id, status) => {
    try {
      const response = await API.put(`/donations/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default DonationService;
