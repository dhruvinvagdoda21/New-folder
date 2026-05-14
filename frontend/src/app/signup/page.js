'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  PawPrint,
  ArrowRight,
  User,
} from 'lucide-react';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  const defaultRole = searchParams.get('role') || 'owner';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await authAPI.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      login(data.user, data.token);

      if (data.user.role === 'sitter') {
        router.push('/sitter-dashboard');
      } else {
        router.push('/owner-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 relative items-center justify-center p-12">
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-8">
            <PawPrint className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold font-[Outfit] text-white mb-4">
            Join PetConnect
          </h1>

          <p className="text-lg text-white/80 max-w-md">
            Create your account and start connecting with trusted pet care
            professionals today.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {[
              { n: '10K+', l: 'Sitters' },
              { n: '50K+', l: 'Happy Pets' },
              { n: '4.9', l: 'Rating' },
              { n: '100K+', l: 'Bookings' },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
              >
                <p className="text-2xl font-bold text-white font-[Outfit]">
                  {s.n}
                </p>

                <p className="text-xs text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold font-[Outfit] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PetConnect
            </span>
          </Link>

          <h2 className="text-3xl font-bold font-[Outfit] text-slate-900 mb-2">
            Create Account
          </h2>

          <p className="text-slate-500 mb-6">
            Fill in your details to get started
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: 'owner' })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                form.role === 'owner'
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-1">🐕</div>

              <p
                className={`text-sm font-semibold ${
                  form.role === 'owner'
                    ? 'text-indigo-700'
                    : 'text-slate-600'
                }`}
              >
                Pet Owner
              </p>

              <p className="text-xs text-slate-400">Find a sitter</p>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, role: 'sitter' })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                form.role === 'sitter'
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-1">💼</div>

              <p
                className={`text-sm font-semibold ${
                  form.role === 'sitter'
                    ? 'text-purple-700'
                    : 'text-slate-600'
                }`}
              >
                Pet Sitter
              </p>

              <p className="text-xs text-slate-400">Offer services</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="input-field !pl-11"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="input-field !pl-11"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="input-field !pl-11 !pr-11"
                  placeholder="Min 6 characters"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="input-field !pl-11"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center !py-3.5 text-base disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
