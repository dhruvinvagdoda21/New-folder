'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/lib/store';
import { Search, Filter, Star, Heart, MapPin, Calendar, MessageCircle, PawPrint, Clock, DollarSign, ChevronDown, SlidersHorizontal, BookOpen, Plus, X } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const mockSitters = [
  { id: 1, name: 'Alex Thompson', specialty: 'Dog Specialist', rating: 4.9, reviews: 127, price: 35, bio: 'Certified dog trainer with 5+ years experience', petTypes: ['Dogs', 'Cats'], verified: true, avatar: 'A', city: 'San Francisco' },
  { id: 2, name: 'Maria Garcia', specialty: 'Cat Whisperer', rating: 4.8, reviews: 98, price: 30, bio: 'Passionate about feline care, vet tech background', petTypes: ['Cats', 'Birds'], verified: true, avatar: 'M', city: 'Oakland' },
  { id: 3, name: 'David Chen', specialty: 'All Pets Expert', rating: 4.9, reviews: 156, price: 40, bio: 'Love all animals! 8 years of professional pet sitting', petTypes: ['Dogs', 'Cats', 'Birds'], verified: true, avatar: 'D', city: 'Berkeley' },
  { id: 4, name: 'Lisa Park', specialty: 'Puppy Trainer', rating: 4.7, reviews: 84, price: 45, bio: 'Specialized in puppy training and socialization', petTypes: ['Dogs'], verified: true, avatar: 'L', city: 'Palo Alto' },
  { id: 5, name: 'Tom Wilson', specialty: 'Dog Walker', rating: 4.6, reviews: 67, price: 25, bio: 'Daily walks and exercise for your active pups', petTypes: ['Dogs'], verified: false, avatar: 'T', city: 'San Jose' },
  { id: 6, name: 'Sara Johnson', specialty: 'Exotic Pet Care', rating: 4.8, reviews: 45, price: 50, bio: 'Expert care for reptiles, birds, and small animals', petTypes: ['Birds', 'Other'], verified: true, avatar: 'S', city: 'San Francisco' },
];

const mockBookings = [
  { id: 1, sitter: 'Alex Thompson', service: 'Dog Walking', date: '2025-03-15', status: 'completed', price: 35 },
  { id: 2, sitter: 'Maria Garcia', service: 'Cat Boarding', date: '2025-03-20', status: 'accepted', price: 90 },
  { id: 3, sitter: 'David Chen', service: 'Pet Daycare', date: '2025-03-25', status: 'pending', price: 60 },
];

const myPets = [
  { id: 1, name: 'Buddy', type: 'dog', breed: 'Golden Retriever', age: 3, emoji: '🐕' },
  { id: 2, name: 'Whiskers', type: 'cat', breed: 'Persian', age: 5, emoji: '🐈' },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, initialize } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ petType: '', minRating: '', maxPrice: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role === 'sitter') {
        router.push('/sitter-dashboard');
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredSitters = mockSitters.filter(s => {
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.petType && !s.petTypes.map(p => p.toLowerCase()).includes(filters.petType)) return false;
    if (filters.minRating && s.rating < parseFloat(filters.minRating)) return false;
    if (filters.maxPrice && s.price > parseFloat(filters.maxPrice)) return false;
    return true;
  });

  const statusColor = { pending: 'badge-warning', accepted: 'badge-primary', completed: 'badge-success', cancelled: 'badge-danger' };

  const tabs = [
    { id: 'search', label: 'Find Sitters', icon: Search },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'pets', label: 'My Pets', icon: PawPrint },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-20 lg:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-[Outfit] text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋</h1>
            <p className="text-slate-500 mt-1">Manage your pets, find sitters, and track bookings</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Search Sitters Tab */}
          {activeTab === 'search' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field !pl-11" placeholder="Search sitters by name..." />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary !rounded-xl">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
              </div>

              {showFilters && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white rounded-xl p-5 border border-slate-200 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Pet Type</label>
                      <select value={filters.petType} onChange={(e) => setFilters({ ...filters, petType: e.target.value })} className="input-field">
                        <option value="">All Types</option>
                        <option value="dogs">Dogs</option>
                        <option value="cats">Cats</option>
                        <option value="birds">Birds</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Min Rating</label>
                      <select value={filters.minRating} onChange={(e) => setFilters({ ...filters, minRating: e.target.value })} className="input-field">
                        <option value="">Any</option>
                        <option value="4.5">4.5+</option>
                        <option value="4.0">4.0+</option>
                        <option value="3.5">3.5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Max Price</label>
                      <select value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="input-field">
                        <option value="">Any</option>
                        <option value="30">$30/day</option>
                        <option value="40">$40/day</option>
                        <option value="50">$50/day</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSitters.map((sitter) => (
                  <motion.div key={sitter.id} initial="hidden" animate="visible" variants={fadeUp} className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {sitter.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 font-[Outfit]">{sitter.name}</h3>
                          <p className="text-xs text-indigo-600 font-medium">{sitter.specialty}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleFavorite(sitter.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        <Heart className={`w-5 h-5 ${favorites.includes(sitter.id) ? 'text-red-500 fill-red-500' : 'text-slate-300'}`} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{sitter.bio}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-slate-700">{sitter.rating}</span>
                        <span className="text-xs text-slate-400">({sitter.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5" /> {sitter.city}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sitter.petTypes.map((pet) => (
                        <span key={pet} className="badge badge-primary">{pet}</span>
                      ))}
                      {sitter.verified && <span className="badge badge-success">✓ Verified</span>}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-lg font-bold text-slate-800">${sitter.price}<span className="text-xs text-slate-400 font-normal">/day</span></span>
                      <div className="flex gap-2">
                        <Link href="/messages" className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </Link>
                        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <div key={booking.id} className="card !p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{booking.service}</h3>
                      <p className="text-sm text-slate-500">with {booking.sitter} • {booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-slate-800">${booking.price}</span>
                    <span className={`badge ${statusColor[booking.status]}`}>{booking.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pets Tab */}
          {activeTab === 'pets' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPets.map((pet) => (
                  <div key={pet.id} className="card">
                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl mb-4">
                      {pet.emoji}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 font-[Outfit]">{pet.name}</h3>
                    <p className="text-sm text-slate-500">{pet.breed} • {pet.age} years old</p>
                  </div>
                ))}
                <button className="card !border-dashed !border-2 !border-slate-300 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-500 hover:!border-indigo-300 min-h-[200px]">
                  <Plus className="w-10 h-10" />
                  <span className="font-semibold">Add New Pet</span>
                </button>
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              {favorites.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-700 font-[Outfit] mb-2">No favorites yet</h3>
                  <p className="text-slate-500 mb-6">Start saving sitters you love!</p>
                  <button onClick={() => setActiveTab('search')} className="btn-primary">Browse Sitters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockSitters.filter(s => favorites.includes(s.id)).map((sitter) => (
                    <div key={sitter.id} className="card">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{sitter.avatar}</div>
                        <div>
                          <h3 className="font-bold text-slate-800">{sitter.name}</h3>
                          <p className="text-xs text-indigo-600">{sitter.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">${sitter.price}/day</span>
                        <button className="btn-primary text-sm !py-2 !px-4">Book Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
