'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, MapPin, CheckCircle, Clock, DollarSign, Calendar, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Heart, Shield, Sparkles, MessageCircle, Users, Send } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const reviewsData = [
  { id: 1, name: 'Jessica W.', avatar: 'J', rating: 5, date: '2 weeks ago', text: 'Absolutely amazing experience! My dog was so happy and well cared for. Will definitely book again.' },
  { id: 2, name: 'Michael R.', avatar: 'M', rating: 5, date: '1 month ago', text: 'Professional, reliable, and my cat loved the attention. Highly recommend this service!' },
  { id: 3, name: 'Priya S.', avatar: 'P', rating: 4, date: '1 month ago', text: 'Great service overall. The daily updates were really appreciated. Minor scheduling hiccup but resolved quickly.' },
];

// Hardcoded data matching backend so page works without API call too
const servicesData = {
  'pet-boarding': { _id: '1', title: 'Pet Boarding', slug: 'pet-boarding', icon: '🏠', color: 'from-indigo-500 to-blue-500', description: 'Overnight care in a loving home environment', longDescription: 'Give your pet a home away from home. Our verified pet boarders provide overnight care in safe, comfortable environments. Your pet will receive personalized attention, regular meals, exercise, and lots of love while you are away.', pricing: { basePrice: 45, unit: 'night' }, duration: 'Overnight / Multi-day', features: ['24/7 supervision', 'Home environment', 'Daily photo updates', 'Medication administration', 'Pick-up & drop-off available', 'Emergency vet access'], benefits: ['Peace of mind while traveling', 'Socialization for your pet', 'Personalized care routines', 'No kennel stress'], faqs: [{ question: 'What should I bring for my pet?', answer: 'Bring their regular food, any medications, a favorite toy or blanket, and vaccination records.' }, { question: 'How are emergencies handled?', answer: 'All sitters have access to emergency vet contacts and will notify you immediately.' }, { question: 'Can I get updates during the stay?', answer: 'Yes! Sitters send daily photo and video updates.' }] },
  'dog-walking': { _id: '2', title: 'Dog Walking', slug: 'dog-walking', icon: '🐕', color: 'from-purple-500 to-pink-500', description: 'Daily walks to keep your pup happy & healthy', longDescription: 'Keep your dog active and happy with professional dog walking services. Our experienced walkers provide regular exercise, socialization opportunities, and GPS-tracked walks.', pricing: { basePrice: 25, unit: 'walk' }, duration: '30-60 minutes', features: ['GPS-tracked walks', 'Flexible scheduling', 'Post-walk report cards', 'Solo or group walks', 'Rain or shine reliability', 'Key pickup available'], benefits: ['Regular exercise', 'Reduced destructive behavior', 'Socialization', 'Consistent routine'], faqs: [{ question: 'How long are the walks?', answer: 'Standard walks are 30 minutes. Extended 45-60 min walks also available.' }, { question: 'Do you walk multiple dogs?', answer: 'We offer solo and small group walks (max 3 dogs).' }, { question: 'What about bad weather?', answer: 'Our walkers come rain or shine.' }] },
  'pet-daycare': { _id: '3', title: 'Pet Daycare', slug: 'pet-daycare', icon: '☀️', color: 'from-amber-500 to-orange-500', description: 'Daytime supervision, play & socialization', longDescription: 'A fun-filled day for your pet while you are at work! Our daycare providers offer structured play, socialization, rest periods, and mental stimulation.', pricing: { basePrice: 35, unit: 'day' }, duration: 'Full day (8-10 hours)', features: ['Structured play sessions', 'Socialization activities', 'Supervised rest time', 'Meal service', 'Indoor & outdoor play', 'Webcam access'], benefits: ['Eliminates separation anxiety', 'Burns excess energy', 'Professional supervision', 'Pet makes friends'], faqs: [{ question: 'What are the hours?', answer: 'Standard hours are 7 AM to 6 PM.' }, { question: 'Is my pet temperament-matched?', answer: 'Yes! We group pets by size, energy level, and play style.' }, { question: 'What if my pet prefers being alone?', answer: 'Solo daycare is available.' }] },
  'grooming': { _id: '4', title: 'Grooming', slug: 'grooming', icon: '✂️', color: 'from-emerald-500 to-teal-500', description: 'Professional grooming for all breeds', longDescription: 'Keep your pet looking and feeling their best with professional grooming services. From basic baths to full breed-specific styling.', pricing: { basePrice: 55, unit: 'session' }, duration: '1-3 hours', features: ['Breed-specific styling', 'Nail trimming', 'Ear cleaning', 'Teeth brushing', 'De-shedding treatments', 'Hypoallergenic shampoos'], benefits: ['Healthier skin & coat', 'Early detection of issues', 'Reduced shedding', 'Your pet looks amazing'], faqs: [{ question: 'How often should my pet be groomed?', answer: 'Most dogs benefit from grooming every 4-8 weeks.' }, { question: 'Do you groom cats?', answer: 'Yes! Including baths, brushing, nail trims, and lion cuts.' }, { question: 'What if my pet is anxious?', answer: 'Our groomers use fear-free handling techniques.' }] },
  'pet-training': { _id: '5', title: 'Pet Training', slug: 'pet-training', icon: '🎓', color: 'from-rose-500 to-red-500', description: 'Behavioral training from certified pros', longDescription: 'Transform your pet\'s behavior with certified professional trainers using positive reinforcement methods.', pricing: { basePrice: 65, unit: 'session' }, duration: '45-60 minutes', features: ['Positive reinforcement', 'Basic obedience', 'Behavioral modification', 'Puppy socialization', 'In-home sessions', 'Progress tracking'], benefits: ['Better behaved pet', 'Stronger bond', 'Safer interactions', 'Reduced anxiety'], faqs: [{ question: 'What age can training start?', answer: 'Puppies can start as early as 8 weeks. Never too late for older dogs!' }, { question: 'How many sessions needed?', answer: 'Most basic programs are 6-8 sessions.' }, { question: 'Do you train cats?', answer: 'Yes! Cats can learn tricks and modify behaviors.' }] },
  'vet-visits': { _id: '6', title: 'Vet Visits', slug: 'vet-visits', icon: '🏥', color: 'from-cyan-500 to-blue-500', description: 'We take your pet to vet appointments', longDescription: 'Cannot make it to the vet? Our trusted sitters will transport your pet safely, stay during the visit, and bring them home with a full report.', pricing: { basePrice: 40, unit: 'visit' }, duration: '2-4 hours', features: ['Safe pet transport', 'Vet accompaniment', 'Post-visit report', 'Medication pickup', 'Follow-up coordination', 'Emergency trips'], benefits: ['Never miss an appointment', 'Reduced stress', 'Detailed health reports', 'Professional handling'], faqs: [{ question: 'Will you stay during the appointment?', answer: 'Yes, our sitters stay throughout and take notes.' }, { question: 'Can you pick up medications?', answer: 'Absolutely!' }, { question: 'Emergency vet visits?', answer: 'We offer emergency transport services.' }] },
};

const providersData = [
  { _id: 'p1', name: 'Alex Thompson', rating: 4.9, reviews: 127, price: 35, avatar: 'A', city: 'San Francisco', bio: 'Certified dog trainer with 5+ years experience', services: ['pet-boarding', 'dog-walking', 'pet-daycare'], verified: true, availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  { _id: 'p2', name: 'Maria Garcia', rating: 4.8, reviews: 98, price: 30, avatar: 'M', city: 'Oakland', bio: 'Passionate feline care, vet tech background', services: ['pet-boarding', 'grooming', 'vet-visits'], verified: true, availability: ['Mon', 'Wed', 'Fri', 'Sat'] },
  { _id: 'p3', name: 'David Chen', rating: 4.9, reviews: 156, price: 40, avatar: 'D', city: 'Berkeley', bio: '8 years professional pet sitting', services: ['pet-boarding', 'dog-walking', 'pet-daycare', 'pet-training'], verified: true, availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  { _id: 'p4', name: 'Lisa Park', rating: 4.7, reviews: 84, price: 45, avatar: 'L', city: 'Palo Alto', bio: 'Puppy training specialist', services: ['pet-training', 'dog-walking'], verified: true, availability: ['Tue', 'Thu', 'Sat', 'Sun'] },
  { _id: 'p5', name: 'Sara Johnson', rating: 4.8, reviews: 45, price: 50, avatar: 'S', city: 'San Francisco', bio: 'Expert care for all pets', services: ['grooming', 'vet-visits', 'pet-boarding'], verified: true, availability: ['Mon', 'Tue', 'Wed', 'Fri'] },
  { _id: 'p6', name: 'Ryan Kim', rating: 4.9, reviews: 112, price: 38, avatar: 'R', city: 'Fremont', bio: 'Gentle care for senior pets', services: ['pet-boarding', 'vet-visits', 'dog-walking'], verified: true, availability: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const service = servicesData[slug];
  const providers = providersData.filter(p => p.services.includes(slug));

  const [openFaq, setOpenFaq] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState(reviewsData);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-3xl font-bold font-[Outfit] text-slate-800 mb-2">Service Not Found</h1>
          <p className="text-slate-500 mb-6">The service you are looking for does not exist.</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleBook = (provider) => {
    setSelectedProvider(provider);
    setBookingStep(1);
    window.scrollTo({ top: document.getElementById('booking-section')?.offsetTop - 100, behavior: 'smooth' });
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) return;
    setBookingStep(2);
    toast.success(`Booking confirmed with ${selectedProvider?.name}!`, { duration: 4000, icon: '🎉' });
  };

  const submitReview = () => {
    if (!reviewText.trim()) return;
    const newReview = { id: Date.now(), name: 'You', avatar: 'Y', rating: reviewRating, date: 'Just now', text: reviewText };
    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewRating(5);
    toast.success('Review submitted! Thank you.');
  };

  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {isLoading ? (
        <div className="pt-32 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-8 w-32 mb-6"></div>
          <div className="skeleton h-12 w-3/4 mb-4"></div>
          <div className="skeleton h-6 w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div><div className="skeleton h-40 mb-4"></div><div className="skeleton h-4 w-full mb-2"></div><div className="skeleton h-4 w-3/4"></div></div>
            <div><div className="skeleton h-40 mb-4"></div><div className="skeleton h-4 w-full mb-2"></div><div className="skeleton h-4 w-2/3"></div></div>
          </div>
        </div>
      ) : (
      <>

      {/* Hero Section */}
      <section className={`relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br ${service.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl shadow-lg">{service.icon}</div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-[Outfit] text-white">{service.title}</h1>
                <p className="text-lg text-white/80 mt-1">{service.description}</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From ${service.pricing.basePrice}/{service.pricing.unit}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {service.duration}</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {providers.length} providers available</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <a href="#providers-section" className="bg-white text-slate-800 px-8 py-3.5 rounded-full font-bold hover:bg-white/90 transition-colors shadow-lg inline-flex items-center gap-2">
                Book Now <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold font-[Outfit] text-slate-900 mb-4">About This Service</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed mb-8">{service.longDescription}</motion.p>
              <motion.h3 variants={fadeUp} className="text-lg font-bold font-[Outfit] text-slate-900 mb-4">Key Features</motion.h3>
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((f, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{f}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h3 variants={fadeUp} className="text-lg font-bold font-[Outfit] text-slate-900 mb-4">Benefits</motion.h3>
              <motion.div variants={stagger} className="space-y-4 mb-8">
                {service.benefits.map((b, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 pt-1">{b}</span>
                  </motion.div>
                ))}
              </motion.div>
              {/* Pricing Card */}
              <motion.div variants={fadeUp} className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-lg font-bold font-[Outfit] text-slate-900 mb-2">Pricing</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-indigo-600 font-[Outfit]">${service.pricing.basePrice}</span>
                  <span className="text-slate-500">/ {service.pricing.unit}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">Duration: {service.duration}</p>
                <a href="#providers-section" className="btn-primary w-full justify-center">Find a Provider</a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Providers */}
      <section id="providers-section" className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold font-[Outfit] text-slate-900 mb-2">Available Providers</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 mb-8">{providers.length} verified professionals for {service.title}</motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((p) => (
                <motion.div key={p._id} variants={fadeUp} className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">{p.avatar}</div>
                    <div>
                      <h3 className="font-bold text-slate-800 font-[Outfit]">{p.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{p.rating}</span>
                        <span className="text-xs text-slate-400">({p.reviews})</span>
                      </div>
                    </div>
                    {p.verified && <span className="ml-auto badge badge-success text-[10px]">✓ Verified</span>}
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{p.bio}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-3"><MapPin className="w-3.5 h-3.5" /> {p.city}</div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.availability.map(d => <span key={d} className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-semibold">{d}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-lg font-bold text-slate-800">${p.price}<span className="text-xs text-slate-400 font-normal">/{service.pricing.unit}</span></span>
                    <button onClick={() => handleBook(p)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {bookingStep === 0 && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-[Outfit] text-slate-700 mb-2">Ready to Book?</h3>
                <p className="text-slate-500">Select a provider above to start scheduling</p>
              </motion.div>
            )}

            {bookingStep === 1 && selectedProvider && (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold font-[Outfit] text-slate-900 mb-6">Book {service.title}</h2>
                <div className="card !p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{selectedProvider.avatar}</div>
                    <div>
                      <p className="font-semibold text-slate-800">{selectedProvider.name}</p>
                      <p className="text-xs text-slate-500">{selectedProvider.city} • ${selectedProvider.price}/{service.pricing.unit}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Date</label>
                      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                        className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${selectedTime === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-sm text-slate-500">Total</p>
                        <p className="text-2xl font-bold text-slate-800 font-[Outfit]">${selectedProvider.price}</p>
                      </div>
                      <button onClick={confirmBooking} disabled={!selectedDate || !selectedTime}
                        className="btn-primary !py-3 !px-8 disabled:opacity-50 disabled:cursor-not-allowed">
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {bookingStep === 2 && (
              <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold font-[Outfit] text-slate-900 mb-2">Booking Confirmed! 🎉</h2>
                <p className="text-slate-500 mb-2">{service.title} with {selectedProvider?.name}</p>
                <p className="text-slate-500 mb-6">{selectedDate} at {selectedTime}</p>
                <div className="flex justify-center gap-4">
                  <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
                  <button onClick={() => { setBookingStep(0); setSelectedProvider(null); setSelectedDate(''); setSelectedTime(''); }} className="btn-secondary">Book Another</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-[Outfit] text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-[Outfit] text-slate-900 mb-2 text-center">Reviews & Ratings</h2>
          <p className="text-slate-500 text-center mb-8">{reviews.length} reviews from happy pet parents</p>
          <div className="space-y-4 mb-8">
            {reviews.map((r) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{r.avatar}</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.date}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
          {/* Review Form */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold font-[Outfit] text-slate-900 mb-4">Leave a Review</h3>
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map((s) => (
                <button key={s} onClick={() => setReviewRating(s)} className="p-0.5">
                  <Star className={`w-6 h-6 transition-colors ${s <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your experience..." rows={3} className="input-field mb-3 resize-none" />
            <button onClick={submitReview} disabled={!reviewText.trim()} className="btn-primary !py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" /> Submit Review
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`rounded-2xl bg-gradient-to-r ${service.color} p-10 shadow-xl`}>
            <h2 className="text-2xl lg:text-3xl font-bold font-[Outfit] text-white mb-3">Ready to book {service.title}?</h2>
            <p className="text-white/80 mb-6">Join thousands of happy pet parents on PetConnect</p>
            <a href="#providers-section" className="bg-white text-slate-800 px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors shadow-lg inline-flex items-center gap-2">
              Find a Provider <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      </>
      )}

      <Footer />
    </div>
  );
}
