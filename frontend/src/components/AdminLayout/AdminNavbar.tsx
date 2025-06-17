import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthService } from '../../services'; // Assuming index.js exports services
import { Button } from "@/components/ui/button"; // Using shadcn/ui button
import { LogOut } from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // AuthService.logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="bg-[#005073] shadow-md h-16 flex items-center justify-between px-6">
      {/* Title - Can be dynamic based on the current page if needed */}
      <h1 className="text-xl font-semibold text-gray-black"> Blessed generation for a blessed nation Admin Dashboard</h1>

      {/* Logout Button */}
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  );
};

export default AdminNavbar;
