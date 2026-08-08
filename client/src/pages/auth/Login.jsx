import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-brand-purple flex items-center justify-center mx-auto mb-4 font-bold text-white text-lg">
          TE
        </div>
        <h1 className="text-display text-white mb-2">Welcome back</h1>
        <p className="text-zinc-500 text-sm">
          Sign in to continue to ThinkEd
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {error && (
          <div className="p-3 border border-red-500/20 bg-red-500/5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input pr-16"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-mono"
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-brand-lavender hover:text-brand-purple transition-colors">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-lavender hover:text-brand-purple transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
