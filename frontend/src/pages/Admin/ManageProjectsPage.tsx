import React, { useState, useEffect } from 'react';
import  projectService  from '../../services/projectService'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

// Define an interface for the project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string | null;
  status: string;
  createdAt: string;
}

// Validation Schema for the form
const ProjectSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  goalAmount: Yup.number().positive('Goal amount must be positive').required('Goal amount is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().nullable(),
  status: Yup.string().required('Status is required'),
});

const ManageProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Fetch Projects Function
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProjectService.getAllProjects({ page, limit });
      setProjects(response.projects || []);
      setTotalPages(response.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects.');
      console.error("Error fetching projects:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [page, limit]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      description: '',
      goalAmount: 0,
      startDate: '',
      endDate: '',
      status: 'Ongoing', // Default status
    },
    validationSchema: ProjectSchema,
    onSubmit: async (values) => {
      try {
        const projectData = {
          ...values,
          goalAmount: Number(values.goalAmount),
          startDate: new Date(values.startDate).toISOString(),
          endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
        };

        if (editingProject) {
          // Update existing project
          await ProjectService.updateProject(editingProject.id, projectData);
          alert('Project updated successfully!');
        } else {
          // Create new project
          await ProjectService.createProject(projectData);
          alert('Project created successfully!');
        }
        setIsDialogOpen(false);
        setEditingProject(null);
        fetchProjects(); // Refresh the list
        formik.resetForm();
      } catch (err: any) {
        console.error("Error saving project:", err);
        alert(`Error saving project: ${err.message || 'Unknown error'}`);
      }
    },
  });

  // Handlers
  const handleAddProject = () => {
    setEditingProject(null);
    formik.resetForm(); // Reset form for new entry
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    formik.setValues({
      id: project.id,
      title: project.title,
      description: project.description,
      goalAmount: project.goalAmount,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '', // Format for date input
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '', // Format for date input
      status: project.status,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ProjectService.deleteProject(projectId);
        alert('Project deleted successfully.');
        fetchProjects(); // Refresh the list
      } catch (err: any) {
        console.error("Error deleting project:", err);
        alert(`Error deleting project: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const handlePreviousPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Projects</h2>
        <Button onClick={handleAddProject} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      {/* Project Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update the details of the project.' : 'Fill in the details for the new project.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.title && formik.errors.title ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.title}</div> : null}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.description && formik.errors.description ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.description}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalAmount" className="text-right">Goal Amount ($)</Label>
                <Input id="goalAmount" name="goalAmount" type="number" value={formik.values.goalAmount} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.goalAmount && formik.errors.goalAmount ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.goalAmount}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={formik.values.startDate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.startDate && formik.errors.startDate ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.startDate}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={formik.values.endDate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.endDate && formik.errors.endDate ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.endDate}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="status" className="text-right">Status</Label>
                 <select id="status" name="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3 border rounded p-2">
                    <option value="Planning">Planning</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                 </select>
              </div>
               {formik.touched.status && formik.errors.status ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.status}</div> : null}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                {formik.isSubmitting ? 'Saving...' : 'Save Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Projects Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <p>Loading projects...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Goal Amount</TableHead>
                  <TableHead>Current Amount</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.status}</TableCell>
                      <TableCell>${project.goalAmount.toLocaleString()}</TableCell>
                      <TableCell>${project.currentAmount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)} title="Edit Project">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)} title="Delete Project">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No projects found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center mt-4 space-x-2">
                <Button onClick={handlePreviousPage} disabled={page <= 1} variant="outline" size="sm">
                  Previous
                </Button>
                <span className="text-sm">Page {page} of {totalPages}</span>
                <Button onClick={handleNextPage} disabled={page >= totalPages} variant="outline" size="sm">
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProjectsPage;
