import API from './api';

// News service functions
const NewsService = {
  // Get all news articles (with optional pagination)
  getAllNews: async (params = {}) => {
    try {
      const response = await API.get('/news', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single news article by ID
  getNewsById: async (id) => {
    try {
      const response = await API.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a new news article (admin only)
  createNews: async (newsData) => {
    try {
      const response = await API.post('/news', newsData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a news article (admin only)
  updateNews: async (id, newsData) => {
    try {
      const response = await API.put(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a news article (admin only)
  deleteNews: async (id) => {
    try {
      const response = await API.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default NewsService;
