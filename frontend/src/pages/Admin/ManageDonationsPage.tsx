import React, { useState, useEffect } from 'react';
import  donationService from '../../services/donationService'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from 'lucide-react'; // Icon for viewing details

// Interface for Donation data
interface Donation {
  id: string;
  userId: string; // Or perhaps donor name/email if user not logged in
  projectId: string | null;
  amount: number;
  currency: string;
  status: string; // e.g., 'Completed', 'Pending', 'Failed'
  transactionId: string | null;
  donationDate: string;
  // Include user/project details if fetched via relations
  User?: { firstName?: string | null; lastName?: string | null; email: string };
  Project?: { title: string };
}

const ManageDonationsPage: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDonations, setTotalDonations] = useState<number>(0);

  // Fetch Data
  const fetchDonations = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming service includes related User/Project data
      const response = await DonationService.getAllDonations({ page, limit, include: 'User,Project' }); 
      setDonations(response.donations || []);
      setTotalPages(response.totalPages || 1);
      setTotalDonations(response.totalDonations || 0); // Assuming total count is returned
    } catch (err: any) {
      setError(err.message || 'Failed to fetch donations.');
      console.error("Error fetching donations:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDonations();
  }, [page, limit]);

  // Handlers
  const handleViewDetails = (donation: Donation) => {
    // Placeholder for viewing details, maybe in a modal
    alert(`View details for Donation ID: ${donation.id}\nAmount: ${donation.currency} ${donation.amount}\nDonor: ${donation.User?.email || 'N/A'}\nStatus: ${donation.status}`);
    // TODO: Implement a detail view modal
  };

  const handlePreviousPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
  };

  const getDonorName = (donation: Donation) => {
    if (donation.User) {
      return `${donation.User.firstName || ''} ${donation.User.lastName || ''}`.trim() || donation.User.email;
    }
    return 'Anonymous/Guest'; // Handle cases where user might not be linked
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Donations</h2>
         <span className="text-lg text-gray-600">Total Donations Recorded: {totalDonations}</span>
      </div>

      {/* Donations Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <p>Loading donations...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.length > 0 ? (
                  donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{new Date(donation.donationDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getDonorName(donation)}</TableCell>
                      <TableCell>{donation.currency} {donation.amount.toLocaleString()}</TableCell>
                      <TableCell>{donation.Project?.title || 'General Fund'}</TableCell>
                      <TableCell>{donation.status}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(donation)} title="View Details">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        {/* Add other actions if needed, e.g., refund (complex), acknowledge */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No donations found.</TableCell>
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

export default ManageDonationsPage;
