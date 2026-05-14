'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import { Mail, Lock, Eye, EyeOff, PawPrint, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authAPI.login(form);
      login(data.user, data.token);
      if (data.user.role === 'admin') router.push('/admin');
      else if (data.user.role === 'sitter') router.push('/sitter-dashboard');
      else router.push('/owner-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M20%2020.5C20%2020.5%2024%2016%2024%2013C24%2010.79%2022.21%209%2020%209C17.79%209%2016%2010.79%2016%2013C16%2016%2020%2020.5%2020%2020.5Z%22%20fill%3D%22white%22/%3E%3C/svg%3E')]"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-8">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-[Outfit] text-white mb-4">Welcome Back!</h1>
          <p className="text-lg text-white/80 max-w-md">Sign in to access your dashboard, manage bookings, and connect with pet sitters.</p>
          <div className="mt-12 space-y-4 text-left max-w-sm mx-auto">
            {['Manage your bookings', 'Chat with sitters', 'Track your pets'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[Outfit] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PetConnect</span>
          </Link>

          <h2 className="text-3xl font-bold font-[Outfit] text-slate-900 mb-2">Sign In</h2>
          <p className="text-slate-500 mb-8">Enter your credentials to access your account</p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field !pl-11" placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field !pl-11 !pr-11" placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-indigo-600 font-medium hover:text-indigo-700">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary justify-center !py-3.5 text-base disabled:opacity-60">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
