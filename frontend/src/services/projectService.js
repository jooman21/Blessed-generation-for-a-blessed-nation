import API from './api';

// Project service functions
const ProjectService = {
  // Get all projects (with optional filters)
  getAllProjects: async (params = {}) => {
    try {
      const response = await API.get('/projects', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single project by ID
  getProjectById: async (id) => {
    try {
      const response = await API.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a new project (admin only)
  createProject: async (projectData) => {
    try {
      const response = await API.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a project (admin only)
  updateProject: async (id, projectData) => {
    try {
      const response = await API.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a project (admin only)
  deleteProject: async (id) => {
    try {
      const response = await API.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default ProjectService;
