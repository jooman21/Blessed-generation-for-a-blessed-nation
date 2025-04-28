import API from './api';

// Team service functions
const TeamService = {
  // Get all active team members
  getAllTeamMembers: async () => {
    try {
      const response = await API.get('/team');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single team member by ID
  getTeamMemberById: async (id) => {
    try {
      const response = await API.get(`/team/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a new team member (admin only)
  createTeamMember: async (memberData) => {
    try {
      const response = await API.post('/team', memberData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a team member (admin only)
  updateTeamMember: async (id, memberData) => {
    try {
      const response = await API.put(`/team/${id}`, memberData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a team member (admin only)
  deleteTeamMember: async (id) => {
    try {
      const response = await API.delete(`/team/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default TeamService;
