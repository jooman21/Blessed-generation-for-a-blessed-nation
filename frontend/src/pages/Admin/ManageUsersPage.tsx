import React, { useState, useEffect } from 'react';
import userService  from '../../services'; // Assuming index.js exports services
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit, KeyRound } from 'lucide-react';

// Define an interface for the user data structure
interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  createdAt: string;
}

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // Items per page
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assuming UserService.getAllUsers accepts pagination params
        const response = await UserService.getAllUsers({ page, limit });
        setUsers(response.users || []);
        setTotalUsers(response.totalUsers || 0);
        setTotalPages(response.totalPages || 1);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users.');
        console.error("Error fetching users:", err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page, limit]);

  const handleUpdatePassword = (userId: string) => {
    // Placeholder for update password modal/logic
    alert(`Update password for user ID: ${userId}`);
    // TODO: Implement password update modal/form
  };

  const handleDeleteUser = async (userId: string) => {
    // Placeholder for delete confirmation
    if (window.confirm(`Are you sure you want to delete user ID: ${userId}?`)) {
      try {
        await UserService.deleteUserById(userId);
        // Refetch users after deletion
        setUsers(users.filter(user => user.id !== userId));
        setTotalUsers(totalUsers - 1);
        alert('User deleted successfully.');
        // Note: If deletion affects pagination, might need to refetch current page
      } catch (err: any) {
        setError(err.message || 'Failed to delete user.');
        console.error("Error deleting user:", err);
        alert(`Error deleting user: ${err.message || 'Unknown error'}`);
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
        <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
        <span className="text-lg text-gray-600">Total Users: {totalUsers}</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.firstName || ''} {user.lastName || ''}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleUpdatePassword(user.id)} title="Update Password">
                          <KeyRound className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)} title="Delete User">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                        {/* Add Edit button if needed */}
                        {/* <Button variant="ghost" size="sm" title="Edit User">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No users found.</TableCell>
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

export default ManageUsersPage;
