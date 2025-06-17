import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import NewsEventsPage from './pages/NewsEventsPage';
import VolunteerPage from './pages/VolunteerPage';
import DonatePage from './pages/DonatePage';
import StoriesPage from './pages/StoriesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterAdmin from './pages/RegisterAdmin';
import AdminLogin from './pages/AdminLogin';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageProjectsPage from './pages/Admin/ManageProjectsPage';
import ManageUsersPage from './pages/Admin/ManageUsersPage';
import ManageNewsEventsPage from './pages/Admin/ManageNewsEventsPage';
import ManageVolunteersPage from './pages/Admin/ManageVolunteersPage';
import ManageDonationsPage from './pages/Admin/ManageDonationsPage';
import ManageTeamMembersPage from './pages/Admin/ManageTeamMembersPage';
import ManageFAQsPage from './pages/Admin/ManageFAQsPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedAdminRoute from './components/ProtectedRoute/ProtectedAdminRoute';
import AdminLayout from './components/AdminLayout/AdminLayout';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminPath ? (
        <Routes>
          <Route
            path="/admin"
            element={
              
                <AdminLayout />
             
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="manage-projects" element={<ManageProjectsPage />} />
            <Route path="manage-users" element={<ManageUsersPage />} />
            <Route path="manage-news-events" element={<ManageNewsEventsPage />} />
            <Route path="manage-volunteers" element={<ManageVolunteersPage />} />
            <Route path="manage-donations" element={<ManageDonationsPage />} />
            <Route path="manage-team" element={<ManageTeamMembersPage />} />
            <Route path="manage-faqs" element={<ManageFAQsPage />} />
          </Route>
        </Routes>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* <main className="flex flex-col min-h-screen"> */}
          <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/news-events" element={<NewsEventsPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register-admin" element={<RegisterAdmin />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
