'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/lib/store';
import { Calendar, DollarSign, Star, Clock, CheckCircle, XCircle, Users, TrendingUp, BarChart3, Settings, Edit3, Plus, Eye } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const mockStats = { totalBookings: 48, pendingBookings: 5, completedBookings: 41, totalEarnings: 3240, rating: 4.8, totalReviews: 36 };

const mockBookings = [
  { id: 1, owner: 'Sarah M.', pet: 'Buddy (Golden Retriever)', service: 'Dog Walking', date: '2025-03-15', time: '10:00 AM', status: 'pending', price: 35 },
  { id: 2, owner: 'James K.', pet: 'Whiskers (Persian Cat)', service: 'Cat Boarding', date: '2025-03-18', time: '9:00 AM', status: 'accepted', price: 90 },
  { id: 3, owner: 'Emma R.', pet: 'Max (Labrador)', service: 'Pet Daycare', date: '2025-03-12', time: '8:00 AM', status: 'completed', price: 60 },
  { id: 4, owner: 'Mike T.', pet: 'Luna (Siamese)', service: 'Grooming', date: '2025-03-20', time: '2:00 PM', status: 'pending', price: 45 },
];

const mockReviews = [
  { id: 1, name: 'Sarah M.', rating: 5, text: 'Amazing with my dog! Buddy loves the walks.', date: '2025-03-10' },
  { id: 2, name: 'James K.', rating: 4, text: 'Very professional and caring with cats.', date: '2025-03-05' },
  { id: 3, name: 'Emma R.', rating: 5, text: 'Best sitter we have ever had. Highly recommend!', date: '2025-02-28' },
];

export default function SitterDashboardPage() {
  const { user, isAuthenticated, isLoading, initialize } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== 'sitter') {
        router.push('/owner-dashboard');
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !user || user.role !== 'sitter') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'services', label: 'Services', icon: Settings },
  ];

  const statCards = [
    { label: 'Total Earnings', value: `$${mockStats.totalEarnings}`, icon: DollarSign, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
    { label: 'Total Bookings', value: mockStats.totalBookings, icon: Calendar, color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50' },
    { label: 'Pending', value: mockStats.pendingBookings, icon: Clock, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Rating', value: `${mockStats.rating} ★`, icon: Star, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
  ];

  const statusColor = { pending: 'badge-warning', accepted: 'badge-primary', completed: 'badge-success', rejected: 'badge-danger' };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-20 lg:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-[Outfit] text-slate-900">Sitter Dashboard 🐾</h1>
              <p className="text-slate-500 mt-1">Manage your bookings, services & earnings</p>
            </div>
            <button className="btn-primary"><Edit3 className="w-4 h-4" /> Edit Profile</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, i) => (
                  <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.1 }}
                    className="card !p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-800 font-[Outfit]">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 font-[Outfit]">Recent Bookings</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-sm text-indigo-600 font-semibold">View All →</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {mockBookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {b.owner.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{b.owner}</p>
                          <p className="text-xs text-slate-500">{b.pet} • {b.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">{b.date}</span>
                        <span className="font-bold text-slate-800">${b.price}</span>
                        <span className={`badge ${statusColor[b.status]}`}>{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {mockBookings.map((b) => (
                <div key={b.id} className="card !p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">{b.owner.charAt(0)}</div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{b.owner}</h3>
                        <p className="text-sm text-slate-500">{b.pet}</p>
                        <p className="text-sm text-indigo-600 font-medium">{b.service} • {b.date} at {b.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-slate-800">${b.price}</span>
                      <span className={`badge ${statusColor[b.status]}`}>{b.status}</span>
                      {b.status === 'pending' && (
                        <div className="flex gap-2 ml-2">
                          <button className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"><CheckCircle className="w-5 h-5" /></button>
                          <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"><XCircle className="w-5 h-5" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="card !p-6 text-center mb-6">
                <p className="text-5xl font-bold text-slate-800 font-[Outfit]">{mockStats.rating}</p>
                <div className="flex justify-center gap-1 my-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-5 h-5 ${i <= Math.round(mockStats.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                </div>
                <p className="text-slate-500">{mockStats.totalReviews} total reviews</p>
              </div>
              {mockReviews.map((r) => (
                <div key={r.id} className="card !p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{r.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.date}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Dog Walking', price: 25, emoji: '🐕', active: true },
                  { name: 'Pet Boarding', price: 50, emoji: '🏠', active: true },
                  { name: 'Pet Daycare', price: 40, emoji: '☀️', active: true },
                  { name: 'Grooming', price: 35, emoji: '✂️', active: false },
                  { name: 'Training', price: 60, emoji: '🎓', active: false },
                ].map((s, i) => (
                  <div key={i} className={`card ${!s.active ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{s.emoji}</span>
                      <div className={`w-12 h-6 rounded-full ${s.active ? 'bg-emerald-500' : 'bg-slate-300'} relative cursor-pointer transition-colors`}>
                        <div className={`absolute top-0.5 ${s.active ? 'right-0.5' : 'left-0.5'} w-5 h-5 bg-white rounded-full shadow transition-all`}></div>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 font-[Outfit]">{s.name}</h3>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">${s.price}<span className="text-sm text-slate-400 font-normal">/session</span></p>
                  </div>
                ))}
                <button className="card !border-dashed !border-2 !border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 hover:!border-indigo-300 min-h-[150px]">
                  <Plus className="w-8 h-8" />
                  <span className="font-semibold text-sm">Add Service</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
