import React, { useState, useEffect } from 'react';
import { faqServcie } from '../faqService';
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
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null; // Optional category
  createdAt: string;
}

// Validation Schema
const FAQSchema = Yup.object().shape({
  question: Yup.string().required('Question is required'),
  answer: Yup.string().required('Answer is required'),
  category: Yup.string().nullable(),
});

const ManageFAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // Fetch Data
  const fetchFAQs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await FAQService.getAllFAQs({ page, limit });
      setFaqs(response.faqs || []);
      setTotalPages(response.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch FAQs.');
      console.error("Error fetching FAQs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, [page, limit]);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      id: '',
      question: '',
      answer: '',
      category: '',
    },
    validationSchema: FAQSchema,
    onSubmit: async (values) => {
      try {
        const faqData = {
          ...values,
          category: values.category || null,
        };

        if (editingFAQ) {
          await FAQService.updateFAQ(editingFAQ.id, faqData);
          alert('FAQ updated successfully!');
        } else {
          await FAQService.createFAQ(faqData);
          alert('FAQ created successfully!');
        }
        setIsDialogOpen(false);
        setEditingFAQ(null);
        fetchFAQs();
        formik.resetForm();
      } catch (err: any) {
        console.error("Error saving FAQ:", err);
        alert(`Error saving FAQ: ${err.message || 'Unknown error'}`);
      }
    },
  });

  // Handlers
  const handleAddFAQ = () => {
    setEditingFAQ(null);
    formik.resetForm();
    setIsDialogOpen(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    formik.setValues({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteFAQ = async (faqId: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await FAQService.deleteFAQ(faqId);
        alert('FAQ deleted successfully.');
        fetchFAQs();
      } catch (err: any) {
        console.error("Error deleting FAQ:", err);
        alert(`Error deleting FAQ: ${err.message || 'Unknown error'}`);
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
        <h2 className="text-2xl font-semibold text-gray-800">Manage FAQs</h2>
        <Button onClick={handleAddFAQ} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Question */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="question" className="text-right pt-2">Question</Label>
                <Textarea id="question" name="question" value={formik.values.question} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" rows={3} />
              </div>
              {formik.touched.question && formik.errors.question ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.question}</div> : null}
              
              {/* Answer */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="answer" className="text-right pt-2">Answer</Label>
                <Textarea id="answer" name="answer" value={formik.values.answer} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" rows={5} />
              </div>
              {formik.touched.answer && formik.errors.answer ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.answer}</div> : null}

              {/* Category */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" name="category" value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-3" placeholder="e.g., General, Donations"/>
              </div>
              {formik.touched.category && formik.errors.category ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{formik.errors.category}</div> : null}

            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                {formik.isSubmitting ? 'Saving...' : 'Save FAQ'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQs Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <p>Loading FAQs...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.length > 0 ? (
                  faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="max-w-md truncate">{faq.question}</TableCell>
                      <TableCell>{faq.category || 'N/A'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditFAQ(faq)} title="Edit FAQ">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteFAQ(faq.id)} title="Delete FAQ">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No FAQs found.</TableCell>
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

export default ManageFAQsPage;
