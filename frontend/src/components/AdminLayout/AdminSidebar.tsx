import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthService } from '../../services'; // Assuming index.js exports services
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Newspaper, 
  Calendar, 
  HeartHandshake, 
  HandCoins, 
  UsersRound, 
  HelpCircle 
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const user = AuthService.getCurrentUser();
  const location = useLocation();

  const sidebarNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Projects', href: '/admin/manage-projects', icon: Briefcase },
    { name: 'Manage Users', href: '/admin/manage-users', icon: Users },
    { name: 'Manage News & Events', href: '/admin/manage-news-events', icon: Newspaper }, // Combined News & Events for now
    { name: 'Manage Volunteers', href: '/admin/manage-volunteers', icon: HeartHandshake },
    { name: 'Manage Donations', href: '/admin/manage-donations', icon: HandCoins },
    { name: 'Manage Team', href: '/admin/manage-team', icon: UsersRound },
    { name: 'Manage FAQs', href: '/admin/manage-faqs', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    // Check if the current location pathname starts with the link's path
    // This handles nested routes being active when their parent is active
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        {user && (
          <p className="text-sm text-gray-400 mt-1">Welcome, {user.firstName || user.email}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/admin/dashboard'} // Use 'end' for exact match on dashboard link
            className={({ isActive: isNavLinkActive }) => // Use NavLink's isActive prop
              `flex items-center px-4 py-2 mx-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ` +
              (isNavLinkActive 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white')
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Optional Footer or additional links */}
      {/* <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">© 2025 NGO Name</p>
      </div> */}
    </aside>
  );
};

export default AdminSidebar;
