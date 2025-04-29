import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import RegisterAdmin from './pages/RegisterAdmin'
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLogin from "./pages/AdminLogin"
import UserProfilePage from './pages/UserProfilePage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedAdminRoute from './components/ProtectedRoute/ProtectedAdminRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
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
            {/* <Route path="/admin" element={ <AdminDashboardPage />} /> */}
                         
            {/* Add protected routes for admin and user profiles later */}
            
            <Route
               path="/admin"
                element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
             }
              />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

