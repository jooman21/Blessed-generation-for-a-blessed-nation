import API from './api';

// Contact service functions
const ContactService = {
  // Submit a contact form (public)
  submitContactForm: async (formData) => {
    try {
      const response = await API.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // --- Admin Functions ---

  // Get all contact submissions (admin only)
  getAllSubmissions: async (params = {}) => {
    try {
      const response = await API.get('/contact', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single submission by ID (admin only)
  getSubmissionById: async (id) => {
    try {
      const response = await API.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update submission status or add notes (admin only)
  updateSubmission: async (id, updateData) => {
    try {
      const response = await API.put(`/contact/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a submission (admin only)
  deleteSubmission: async (id) => {
    try {
      const response = await API.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default ContactService;
