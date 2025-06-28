import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reset() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [email, setEmail] = useState(location.state?.email || '');
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_pwd', confirmPassword);

    try {
      // Axios POST request to your API endpoint for password reset
      const response = await axios.put('http://localhost:5000/resetPassword', {
        email: email,
        password: password, // New password
        confirm_pwd: confirmPassword
      });

      setStatus(response.status);
      toast.success('Password reset successfully!');
      navigate('/'); // Redirect to the password page or a desired page
    } catch (error) {
      setServerError(error.response?.data?.message || 'Could not reset password');
      toast.error('Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError}</h1>;
 // if (status && status !== 201) return <Navigate to={'/'} replace={true}></Navigate>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="glass p-8 rounded-lg shadow-lg" style={{ width: '50%' }}>
          <div className="title flex flex-col items-center mb-8">
            <h4 className="text-5xl font-bold">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter your new password below.
            </span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="New Password"
              />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Repeat Password"
              />
              <button
                className="w-full py-4 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-800 focus:outline-none"
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
