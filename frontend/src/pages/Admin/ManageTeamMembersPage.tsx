import React, { useState, useEffect } from 'react';
import teamService  from '../../services/teamService';
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
interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  imageUrl: string | null;
  createdAt: string;
}

// Validation Schema
const TeamMemberSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  title: Yup.string().required('Title is required'),
  bio: Yup.string().nullable(),
  imageUrl: Yup.string().url('Must be a valid URL').nullable(),
});

const ManageTeamMembersPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Fetch Data
  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await TeamService.getAllTeamMembers({ page, limit });
      setTeamMembers(response.teamMembers || []);
      setTotalPages(response.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team members.');
      console.error("Error fetching team members:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [page, limit]);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      title: '',
      bio: '',
      imageUrl: '',
    },
    validationSchema: TeamMemberSchema,
    onSubmit: async (values) => {
      try {
        const memberData = {
          ...values,
          bio: values.bio || null,
          imageUrl: values.imageUrl || null,
        };

        if (editingMember) {
          await TeamService.updateTeamMember(editingMember.id, memberData);
          alert('Team member updated successfully!');
        } else {
          await TeamService.createTeamMember(memberData);
          alert('Team member created successfully!');
        }
        setIsDialogOpen(false);
        setEditingMember(null);
        fetchTeamMembers();
        formik.resetForm();
      } catch (err: any) {
        console.error("Error saving team member:", err);
        alert(`Error saving team member: ${err.message || 'Unknown error'}`);
      }
    },
  });

  // Handlers
  const handleAddMember = () => {
    setEditingMember(null);
    formik.resetForm();
    setIsDialogOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    formik.setValues({
      id: member.id,
      name: member.name,
      title: member.title,
      bio: member.bio || '',
      imageUrl: member.imageUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await TeamService.deleteTeamMember(memberId);
        alert('Team member deleted successfully.');
        fetchTeamMembers();
      } catch (err: any) {
        console.error("Error deleting team member:", err);
        alert(`Error deleting team member: ${err.message || 'Unknown error'}`);
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
        <h2 className="text-2xl font-semibold text-gray-800">Manage Team Members</h2>
        <Button onClick={handleAddMember} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.name && formik.errors.name ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.name}</div> : null}
              
              {/* Title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" />
              </div>
              {formik.touched.title && formik.errors.title ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.title}</div> : null}

              {/* Bio */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
                <Textarea id="bio" name="bio" value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" rows={4} />
              </div>
              {formik.touched.bio && formik.errors.bio ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.bio}</div> : null}

              {/* Image URL */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" value={formik.values.imageUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" placeholder="https://example.com/image.jpg"/>
              </div>
              {formik.touched.imageUrl && formik.errors.imageUrl ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.imageUrl}</div> : null}

            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                {formik.isSubmitting ? 'Saving...' : 'Save Team Member'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Team Members Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <p>Loading team members...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.title}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditMember(member)} title="Edit Member">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(member.id)} title="Delete Member">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No team members found.</TableCell>
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

export default ManageTeamMembersPage;
