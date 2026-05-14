'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Star, Heart, MapPin, Filter, SlidersHorizontal, CheckCircle, MessageCircle, ChevronDown, X, Calendar, Clock, PawPrint } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const allSitters = [
  { id: 1, name: 'Alex Thompson', specialty: 'Dog Specialist', rating: 4.9, reviews: 127, price: 35, bio: 'Certified dog trainer with 5+ years of experience caring for all breeds.', petTypes: ['Dogs', 'Cats'], verified: true, avatar: 'A', city: 'San Francisco', experience: 5 },
  { id: 2, name: 'Maria Garcia', specialty: 'Cat Whisperer', rating: 4.8, reviews: 98, price: 30, bio: 'Passionate feline care with vet tech background.', petTypes: ['Cats', 'Birds'], verified: true, avatar: 'M', city: 'Oakland', experience: 4 },
  { id: 3, name: 'David Chen', specialty: 'All Pets Expert', rating: 4.9, reviews: 156, price: 40, bio: 'I love all animals! 8 years of professional pet sitting.', petTypes: ['Dogs', 'Cats', 'Birds'], verified: true, avatar: 'D', city: 'Berkeley', experience: 8 },
  { id: 4, name: 'Lisa Park', specialty: 'Puppy Trainer', rating: 4.7, reviews: 84, price: 45, bio: 'Specialized in puppy training and socialization.', petTypes: ['Dogs'], verified: true, avatar: 'L', city: 'Palo Alto', experience: 3 },
  { id: 5, name: 'Tom Wilson', specialty: 'Dog Walker', rating: 4.6, reviews: 67, price: 25, bio: 'Energetic and reliable dog walker for active pups.', petTypes: ['Dogs'], verified: false, avatar: 'T', city: 'San Jose', experience: 2 },
  { id: 6, name: 'Sara Johnson', specialty: 'Exotic Pet Care', rating: 4.8, reviews: 45, price: 50, bio: 'Expert care for reptiles, birds, and small animals.', petTypes: ['Birds', 'Other'], verified: true, avatar: 'S', city: 'San Francisco', experience: 6 },
  { id: 7, name: 'Ryan Kim', specialty: 'Senior Pet Care', rating: 4.9, reviews: 112, price: 38, bio: 'Gentle and patient care for senior pets with special needs.', petTypes: ['Dogs', 'Cats'], verified: true, avatar: 'R', city: 'Fremont', experience: 7 },
  { id: 8, name: 'Amy Liu', specialty: 'Pet Grooming Pro', rating: 4.7, reviews: 73, price: 42, bio: 'Professional grooming services for all breeds.', petTypes: ['Dogs', 'Cats'], verified: true, avatar: 'A', city: 'Sunnyvale', experience: 4 },
];

const serviceOptions = ['Boarding', 'Walking', 'Daycare', 'Grooming', 'Training', 'Vet Visit'];
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export default function SittersPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ petType: '', sort: 'rating', maxPrice: '' });
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Booking modal state
  const [bookingSitter, setBookingSitter] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingService, setBookingService] = useState('');
  const [bookingPet, setBookingPet] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filtered = allSitters
    .filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.city.toLowerCase().includes(search.toLowerCase()) && !s.specialty.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.petType && !s.petTypes.map(p => p.toLowerCase()).includes(filters.petType.toLowerCase())) return false;
      if (filters.maxPrice && s.price > parseInt(filters.maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'price-low') return a.price - b.price;
      if (filters.sort === 'price-high') return b.price - a.price;
      if (filters.sort === 'reviews') return b.reviews - a.reviews;
      return 0;
    });

  const openBooking = (sitter) => {
    setBookingSitter(sitter);
    setBookingDate('');
    setBookingTime('');
    setBookingService('');
    setBookingPet('');
    setBookingNotes('');
    setBookingConfirmed(false);
  };

  const closeBooking = () => {
    setBookingSitter(null);
    setBookingConfirmed(false);
  };

  const confirmBooking = () => {
    if (!bookingDate || !bookingTime || !bookingService) {
      toast.error('Please fill in date, time, and service.');
      return;
    }
    setBookingConfirmed(true);
    toast.success(`Booking confirmed with ${bookingSitter.name}!`, { icon: '🎉', duration: 4000 });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      if (!prev.includes(id)) toast.success('Added to favorites!', { icon: '❤️' });
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">Find Your Perfect Pet Sitter</h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Browse verified sitters near you. Filter by pet type, price, and rating.</p>
          <div className="max-w-2xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 backdrop-blur text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                placeholder="Search by name, specialty, or city..." />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="px-5 py-3.5 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors backdrop-blur flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-xl p-5 border border-slate-200 mb-6 shadow-sm">
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
                <label className="text-sm font-medium text-slate-700 mb-1 block">Max Price</label>
                <select value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="input-field">
                  <option value="">Any</option>
                  <option value="30">Up to $30</option>
                  <option value="40">Up to $40</option>
                  <option value="50">Up to $50</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Sort By</label>
                <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="input-field">
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        <p className="text-sm text-slate-500 mb-6">{filtered.length} sitters found</p>

        {/* Sitter Grid */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((sitter) => (
            <motion.div key={sitter.id} variants={fadeUp} className="card group">
              <div className="relative mb-4">
                <div className="w-full h-44 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                  <span className="text-5xl font-bold text-indigo-300 font-[Outfit]">{sitter.avatar}</span>
                </div>
                {sitter.verified && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </div>
                )}
                <button onClick={() => toggleFavorite(sitter.id)}
                  className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                  <Heart className={`w-4 h-4 ${favorites.includes(sitter.id) ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 font-[Outfit]">{sitter.name}</h3>
              <p className="text-sm text-indigo-600 font-medium">{sitter.specialty}</p>
              <div className="flex items-center gap-1 mt-1.5 mb-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-slate-700">{sitter.rating}</span>
                <span className="text-xs text-slate-400">({sitter.reviews})</span>
                <span className="text-xs text-slate-400 ml-auto"><MapPin className="w-3 h-3 inline" /> {sitter.city}</span>
              </div>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{sitter.bio}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {sitter.petTypes.map((pet) => (
                  <span key={pet} className="badge badge-primary">{pet}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-800">${sitter.price}<span className="text-xs text-slate-400 font-normal">/day</span></span>
                <div className="flex items-center gap-2">
                  <Link href="/messages" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label={`Message ${sitter.name}`}>
                    <MessageCircle className="w-4 h-4" />
                  </Link>
                  <button onClick={() => openBooking(sitter)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold font-[Outfit] text-slate-700 mb-2">No sitters found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingSitter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeBooking}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl p-5 flex items-center gap-4 z-10">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white font-[Outfit]">{bookingSitter.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white font-[Outfit]">{bookingSitter.name}</h3>
                  <p className="text-white/80 text-sm">{bookingSitter.specialty} • ${bookingSitter.price}/day</p>
                </div>
                <button onClick={closeBooking} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {!bookingConfirmed ? (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h4 className="text-lg font-bold font-[Outfit] text-slate-900 mb-5">Book a Session</h4>

                      {/* Service */}
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Service Type *</label>
                      <select value={bookingService} onChange={(e) => setBookingService(e.target.value)} className="input-field mb-4">
                        <option value="">Select service...</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>

                      {/* Date */}
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Date *</label>
                      <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="input-field mb-4" />

                      {/* Time */}
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Time *</label>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setBookingTime(t)}
                            className={`p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${bookingTime === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                            {t}
                          </button>
                        ))}
                      </div>

                      {/* Pet Name */}
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Pet Name</label>
                      <input type="text" value={bookingPet} onChange={(e) => setBookingPet(e.target.value)} placeholder="e.g. Buddy" className="input-field mb-4" />

                      {/* Notes */}
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Notes</label>
                      <textarea value={bookingNotes} onChange={(e) => setBookingNotes(e.target.value)} placeholder="Any special instructions..." rows={2} className="input-field mb-5 resize-none" />

                      {/* Price Summary */}
                      <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl mb-5">
                        <span className="text-sm font-medium text-slate-600">Total</span>
                        <span className="text-2xl font-bold text-indigo-600 font-[Outfit]">${bookingSitter.price}</span>
                      </div>

                      <button onClick={confirmBooking} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.98]">
                        Confirm Booking
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold font-[Outfit] text-slate-900 mb-2">Booking Confirmed! 🎉</h3>
                      <p className="text-slate-500 mb-1">{bookingService} with {bookingSitter.name}</p>
                      <p className="text-slate-500 mb-6">{bookingDate} at {bookingTime}</p>
                      <div className="flex gap-3 justify-center">
                        <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
                        <button onClick={closeBooking} className="btn-secondary">Close</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
