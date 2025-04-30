import React, { useState } from 'react';
import adminAuthService from '../services/adminAuthService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await adminAuthService.Adminlogin({ email, password });
          // Check if the logged-in user is actually an admin
    const user = result?.user;
    if (user?.role !== 'admin') {
      toast.error('Access denied: You are not an admin.');
      // Optionally clear stored user/token to prevent misuse
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return;
    }
    if(user?.password != password){
      toast.error('Access denied: Password is not correct')
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return;
    }
      
      toast.success('Login successful!');
      setTimeout(() => navigate('/admin'), 1500);
      // Optionally redirect after login:
      // navigate('/admin-dashboard');
    } catch (error: any) {
      const errorMsg = error?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <ToastContainer /> {/* This ensures toasts are shown */}
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register-admin" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
