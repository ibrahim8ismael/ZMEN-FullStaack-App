import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-light mb-8 text-center">LOGIN</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          autoComplete="email"
        />
        
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 text-black border-gray-300 focus:ring-black"
            />
            Remember me
          </label>
          <a href="#" className="text-black hover:underline">
            Forgot password?
          </a>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </Button>
        
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;