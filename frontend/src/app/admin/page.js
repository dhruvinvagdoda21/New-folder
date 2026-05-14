'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Users, Calendar, DollarSign, TrendingUp, AlertTriangle, Shield, BarChart3, Settings, Search, CheckCircle, XCircle, Eye, MoreVertical, Activity } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { label: 'Total Users', value: '12,458', change: '+12%', icon: Users, color: 'from-indigo-500 to-blue-500' },
  { label: 'Total Bookings', value: '8,392', change: '+8%', icon: Calendar, color: 'from-purple-500 to-pink-500' },
  { label: 'Revenue', value: '$142,580', change: '+23%', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
  { label: 'Active Sitters', value: '3,247', change: '+5%', icon: Activity, color: 'from-amber-500 to-orange-500' },
];

const users = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@email.com', role: 'owner', status: 'active', joined: '2025-01-15', bookings: 12 },
  { id: 2, name: 'Alex Thompson', email: 'alex@email.com', role: 'sitter', status: 'active', joined: '2025-01-10', bookings: 48 },
  { id: 3, name: 'Maria Garcia', email: 'maria@email.com', role: 'sitter', status: 'active', joined: '2025-02-01', bookings: 36 },
  { id: 4, name: 'James Wilson', email: 'james@email.com', role: 'owner', status: 'suspended', joined: '2025-02-15', bookings: 3 },
  { id: 5, name: 'Emma Roberts', email: 'emma@email.com', role: 'owner', status: 'active', joined: '2025-03-01', bookings: 8 },
];

const flaggedActivities = [
  { id: 1, type: 'Suspicious Login', user: 'unknown@temp.com', time: '2 hours ago', severity: 'high' },
  { id: 2, type: 'Multiple Failed Payments', user: 'james@email.com', time: '5 hours ago', severity: 'medium' },
  { id: 3, type: 'Fake Review Detected', user: 'bot@spam.com', time: '1 day ago', severity: 'high' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-20 lg:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-[Outfit] text-slate-900">Admin Dashboard 🛡️</h1>
            <p className="text-slate-500 mt-1">Manage users, bookings, and platform analytics</p>
          </div>

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

          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                  <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.1 }} className="card !p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800 font-[Outfit]">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="card !p-6">
                  <h3 className="font-bold text-slate-800 font-[Outfit] mb-4">Revenue Overview</h3>
                  <div className="h-48 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl flex items-end justify-around p-4 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-md transition-all hover:from-indigo-600 hover:to-purple-600" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-slate-400">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                </div>
                <div className="card !p-6">
                  <h3 className="font-bold text-slate-800 font-[Outfit] mb-4">User Growth</h3>
                  <div className="h-48 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl flex items-end justify-around p-4 gap-2">
                    {[30, 45, 55, 50, 65, 75, 70, 80, 85, 78, 90, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-md transition-all hover:from-emerald-600 hover:to-teal-600" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-slate-400">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="mb-6 relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field !pl-11" placeholder="Search users..." />
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        {['User', 'Role', 'Status', 'Joined', 'Bookings', 'Actions'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">{u.name.charAt(0)}</div>
                              <div>
                                <p className="font-semibold text-slate-800 text-sm">{u.name}</p>
                                <p className="text-xs text-slate-500">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4"><span className={`badge ${u.role === 'sitter' ? 'badge-primary' : 'badge-warning'}`}>{u.role}</span></td>
                          <td className="px-5 py-4"><span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{u.status}</span></td>
                          <td className="px-5 py-4 text-sm text-slate-500">{u.joined}</td>
                          <td className="px-5 py-4 text-sm font-medium text-slate-700">{u.bookings}</td>
                          <td className="px-5 py-4">
                            <div className="flex gap-1.5">
                              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Eye className="w-4 h-4" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><XCircle className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 font-[Outfit] flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Flagged Activities</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {flaggedActivities.map((a) => (
                    <div key={a.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{a.type}</p>
                          <p className="text-xs text-slate-500">{a.user} • {a.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`badge ${a.severity === 'high' ? 'badge-danger' : 'badge-warning'}`}>{a.severity}</span>
                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Investigate</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 font-[Outfit] mb-4">All Bookings</h3>
              <div className="space-y-3">
                {[
                  { owner: 'Sarah M.', sitter: 'Alex T.', service: 'Dog Walking', date: '2025-03-15', price: 35, status: 'completed' },
                  { owner: 'James K.', sitter: 'Maria G.', service: 'Cat Boarding', date: '2025-03-18', price: 90, status: 'accepted' },
                  { owner: 'Emma R.', sitter: 'David C.', service: 'Pet Daycare', date: '2025-03-20', price: 60, status: 'pending' },
                  { owner: 'Mike T.', sitter: 'Lisa P.', service: 'Grooming', date: '2025-03-22', price: 45, status: 'cancelled' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 gap-3">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{b.owner} → {b.sitter}</p>
                      <p className="text-xs text-slate-500">{b.service} • {b.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800">${b.price}</span>
                      <span className={`badge ${b.status === 'completed' ? 'badge-success' : b.status === 'accepted' ? 'badge-primary' : b.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
