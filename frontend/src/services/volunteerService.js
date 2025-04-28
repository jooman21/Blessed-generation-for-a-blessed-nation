import API from './api';

// Volunteer service functions
const VolunteerService = {
  // Get all volunteer opportunities (with optional filters)
  getAllOpportunities: async (params = {}) => {
    try {
      const response = await API.get('/volunteer', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single volunteer opportunity by ID
  getOpportunityById: async (id) => {
    try {
      const response = await API.get(`/volunteer/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a new volunteer opportunity (admin only)
  createOpportunity: async (opportunityData) => {
    try {
      const response = await API.post('/volunteer', opportunityData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a volunteer opportunity (admin only)
  updateOpportunity: async (id, opportunityData) => {
    try {
      const response = await API.put(`/volunteer/${id}`, opportunityData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a volunteer opportunity (admin only)
  deleteOpportunity: async (id) => {
    try {
      const response = await API.delete(`/volunteer/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Apply for a volunteer opportunity
  applyForOpportunity: async (id) => {
    try {
      const response = await API.post(`/volunteer/${id}/apply`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default VolunteerService;
