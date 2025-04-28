import API from './api';

// FAQ service functions
const FAQService = {
  // Get all active FAQs (with optional category filter)
  getAllFAQs: async (params = {}) => {
    try {
      const response = await API.get('/faqs', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single active FAQ by ID
  getFAQById: async (id) => {
    try {
      const response = await API.get(`/faqs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get active FAQs by category
  getFAQsByCategory: async (category) => {
    try {
      const response = await API.get(`/faqs/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // --- Admin Functions ---

  // Create a new FAQ (admin only)
  createFAQ: async (faqData) => {
    try {
      const response = await API.post('/faqs', faqData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a FAQ (admin only)
  updateFAQ: async (id, faqData) => {
    try {
      const response = await API.put(`/faqs/${id}`, faqData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a FAQ (admin only)
  deleteFAQ: async (id) => {
    try {
      const response = await API.delete(`/faqs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default FAQService;
