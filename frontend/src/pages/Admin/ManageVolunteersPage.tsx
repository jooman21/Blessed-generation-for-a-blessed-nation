import React, { useState, useEffect } from 'react';
import volunteerService from '../../services/volunteerService'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

// Interface
interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  requiredSkills: string; // Assuming comma-separated or similar
  startDate: string;
  endDate: string | null;
  status: string;
  createdAt: string;
}

// Validation Schema
const VolunteerSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  requiredSkills: Yup.string(),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().nullable(),
  status: Yup.string().required('Status is required'),
});

const ManageVolunteersPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingOpportunity, setEditingOpportunity] = useState<VolunteerOpportunity | null>(null);

  // Fetch Data
  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await VolunteerService.getAllOpportunities({ page, limit });
      setOpportunities(response.opportunities || []);
      setTotalPages(response.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch volunteer opportunities.');
      console.error("Error fetching opportunities:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
  }, [page, limit]);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      description: '',
      location: '',
      requiredSkills: '',
      startDate: '',
      endDate: '',
      status: 'Open',
    },
    validationSchema: VolunteerSchema,
    onSubmit: async (values) => {
      try {
        const opportunityData = {
          ...values,
          startDate: new Date(values.startDate).toISOString(),
          endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
        };

        if (editingOpportunity) {
          await VolunteerService.updateOpportunity(editingOpportunity.id, opportunityData);
          alert('Opportunity updated successfully!');
        } else {
          await VolunteerService.createOpportunity(opportunityData);
          alert('Opportunity created successfully!');
        }
        setIsDialogOpen(false);
        setEditingOpportunity(null);
        fetchOpportunities();
        formik.resetForm();
      } catch (err: any) {
        console.error("Error saving opportunity:", err);
        alert(`Error saving opportunity: ${err.message || 'Unknown error'}`);
      }
    },
  });

  // Handlers
  const handleAddOpportunity = () => {
    setEditingOpportunity(null);
    formik.resetForm();
    setIsDialogOpen(true);
  };

  const handleEditOpportunity = (opportunity: VolunteerOpportunity) => {
    setEditingOpportunity(opportunity);
    formik.setValues({
      id: opportunity.id,
      title: opportunity.title,
      description: opportunity.description,
      location: opportunity.location,
      requiredSkills: opportunity.requiredSkills,
      startDate: opportunity.startDate ? new Date(opportunity.startDate).toISOString().split('T')[0] : '',
      endDate: opportunity.endDate ? new Date(opportunity.endDate).toISOString().split('T')[0] : '',
      status: opportunity.status,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteOpportunity = async (opportunityId: string) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await VolunteerService.deleteOpportunity(opportunityId);
        alert('Opportunity deleted successfully.');
        fetchOpportunities();
      } catch (err: any) {
        console.error("Error deleting opportunity:", err);
        alert(`Error deleting opportunity: ${err.message || 'Unknown error'}`);
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
        <h2 className="text-2xl font-semibold text-gray-800">Manage Volunteer Opportunities</h2>
        <Button onClick={handleAddOpportunity} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Opportunity
        </Button>
      </div>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingOpportunity ? 'Edit Opportunity' : 'Add New Opportunity'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.title && formik.errors.title ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.title}</div> : null}
              
              {/* Description */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                <Textarea id="description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" rows={4} />
              </div>
              {formik.touched.description && formik.errors.description ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.description}</div> : null}

              {/* Location */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input id="location" name="location" value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.location && formik.errors.location ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.location}</div> : null}

              {/* Required Skills */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="requiredSkills" className="text-right">Required Skills</Label>
                <Input id="requiredSkills" name="requiredSkills" value={formik.values.requiredSkills} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" placeholder="e.g., Communication, Driving"/>
              </div>
              {formik.touched.requiredSkills && formik.errors.requiredSkills ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.requiredSkills}</div> : null}

              {/* Start Date */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={formik.values.startDate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.startDate && formik.errors.startDate ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.startDate}</div> : null}

              {/* End Date */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={formik.values.endDate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.endDate && formik.errors.endDate ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.endDate}</div> : null}

              {/* Status */}
              <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="status" className="text-right">Status</Label>
                 <select id="status" name="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3 border rounded p-2">
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Ongoing">Ongoing</option>
                 </select>
              </div>
               {formik.touched.status && formik.errors.status ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.status}</div> : null}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                {formik.isSubmitting ? 'Saving...' : 'Save Opportunity'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Opportunities Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <p>Loading opportunities...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.length > 0 ? (
                  opportunities.map((opp) => (
                    <TableRow key={opp.id}>
                      <TableCell>{opp.title}</TableCell>
                      <TableCell>{opp.location}</TableCell>
                      <TableCell>{opp.status}</TableCell>
                      <TableCell>{new Date(opp.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditOpportunity(opp)} title="Edit Opportunity">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteOpportunity(opp.id)} title="Delete Opportunity">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No volunteer opportunities found.</TableCell>
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

export default ManageVolunteersPage;
