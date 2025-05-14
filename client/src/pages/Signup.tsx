import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      console.log('Sending signup request:', userData);
      const response = await axios.post('/api/users', userData);
      console.log('User created:', response.data);
      navigate('/login'); // Redirect to login after successful signup
      
    } catch (error: unknown) {
      console.error('Full error object:', error);
      if (axios.isAxiosError(error)) {
        console.error('Signup error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        setError(error.response?.data?.message || 'Error creating account');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-light mb-8 text-center">CREATE ACCOUNT</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          autoComplete="name"
        />
        
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          autoComplete="email"
        />
        
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          autoComplete="new-password"
        />
        
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
          autoComplete="new-password"
        />
        
        <div className="text-sm">
          <p>By creating an account, you agree to our</p>
          <p>
            <a href="#" className="text-black hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-black hover:underline">Privacy Policy</a>
          </p>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </Button>
        
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;