import API from './api';

// Partner service functions
const PartnerService = {
  // Get all active partners
  getAllPartners: async () => {
    try {
      const response = await API.get('/partners');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single partner by ID
  getPartnerById: async (id) => {
    try {
      const response = await API.get(`/partners/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a new partner (admin only)
  createPartner: async (partnerData) => {
    try {
      const response = await API.post('/partners', partnerData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a partner (admin only)
  updatePartner: async (id, partnerData) => {
    try {
      const response = await API.put(`/partners/${id}`, partnerData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a partner (admin only)
  deletePartner: async (id) => {
    try {
      const response = await API.delete(`/partners/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default PartnerService;
