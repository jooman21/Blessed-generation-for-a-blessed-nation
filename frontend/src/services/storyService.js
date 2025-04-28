import API from './api';

// Story service functions
const StoryService = {
  // Get all published stories and testimonials
  getAllStories: async (params = {}) => {
    try {
      const response = await API.get('/stories', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single published story by ID
  getStoryById: async (id) => {
    try {
      const response = await API.get(`/stories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Submit a new story (requires authentication)
  submitStory: async (storyData) => {
    try {
      const response = await API.post('/stories', storyData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a story (admin only or original submitter)
  updateStory: async (id, storyData) => {
    try {
      const response = await API.put(`/stories/${id}`, storyData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a story (admin only)
  deleteStory: async (id) => {
    try {
      const response = await API.delete(`/stories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Toggle publish status of a story (admin only)
  togglePublishStatus: async (id) => {
    try {
      const response = await API.put(`/stories/${id}/publish`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get stories by type (success_story or testimonial)
  getStoriesByType: async (type, params = {}) => {
    try {
      const response = await API.get(`/stories/type/${type}`, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default StoryService;
