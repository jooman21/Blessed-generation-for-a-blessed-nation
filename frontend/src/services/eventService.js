import API from './api';

// Event service functions
const EventService = {
  // Get all events (with optional filters)
  getAllEvents: async (params = {}) => {
    try {
      const response = await API.get('/events', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single event by ID
  getEventById: async (id) => {
    try {
      const response = await API.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a new event (admin only)
  createEvent: async (eventData) => {
    try {
      const response = await API.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update an event (admin only)
  updateEvent: async (id, eventData) => {
    try {
      const response = await API.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete an event (admin only)
  deleteEvent: async (id) => {
    try {
      const response = await API.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Register for an event
  registerForEvent: async (id) => {
    try {
      const response = await API.post(`/events/${id}/register`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default EventService;
