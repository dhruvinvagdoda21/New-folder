'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/lib/store';
import { userAPI, sitterAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Camera, Save, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser, initialize, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '', state: '', zipCode: '' },
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await userAPI.getProfile();
        setForm({
          name: data.user.name || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          address: data.user.address || { street: '', city: '', state: '', zipCode: '' },
        });
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setFetching(false);
      }
    };
    if (user && isAuthenticated) {
      fetchProfile();
    } else if (!isLoading && !isAuthenticated) {
      setFetching(false);
    }
  }, [user, isAuthenticated, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await userAPI.updateProfile(form);
      updateUser(data.user);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-[Outfit] text-slate-900">My Profile</h1>
            <p className="text-slate-500 mt-1">Manage your personal information and preferences.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header / Avatar */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-500 uppercase">
                      {form.name.charAt(0) || 'U'}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-100 text-indigo-600 hover:text-indigo-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1 uppercase">
                <Shield className="w-3 h-3" /> {user?.role}
              </div>
            </div>

            <div className="p-8 pt-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 font-[Outfit] mb-4">Basic Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field !pl-11" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="email" value={form.email} className="input-field !pl-11 bg-slate-50 text-slate-500" disabled />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field !pl-11" placeholder="(555) 123-4567" />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 font-[Outfit] mb-4">Location</h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Street Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" value={form.address.street} onChange={e => setForm({...form, address: {...form.address, street: e.target.value}})} className="input-field !pl-11" placeholder="123 Main St" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                        <input type="text" value={form.address.city} onChange={e => setForm({...form, address: {...form.address, city: e.target.value}})} className="input-field" placeholder="San Francisco" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                        <input type="text" value={form.address.state} onChange={e => setForm({...form, address: {...form.address, state: e.target.value}})} className="input-field" placeholder="CA" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Zip Code</label>
                      <input type="text" value={form.address.zipCode} onChange={e => setForm({...form, address: {...form.address, zipCode: e.target.value}})} className="input-field" placeholder="94105" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button type="submit" disabled={loading} className="btn-primary !px-8 flex items-center gap-2">
                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
