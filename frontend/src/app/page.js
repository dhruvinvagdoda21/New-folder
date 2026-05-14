'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Shield, Star, Clock, Heart, MapPin, ArrowRight, CheckCircle, PawPrint, Dog, Cat, Bird, Sparkles, Quote } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const services = [
  { icon: '🏠', title: 'Pet Boarding', slug: 'pet-boarding', desc: 'Overnight care in a loving home environment', color: 'from-indigo-500 to-blue-500', glow: 'glow-indigo' },
  { icon: '🐕', title: 'Dog Walking', slug: 'dog-walking', desc: 'Daily walks to keep your pup happy & healthy', color: 'from-purple-500 to-pink-500', glow: 'glow-purple' },
  { icon: '☀️', title: 'Pet Daycare', slug: 'pet-daycare', desc: 'Daytime supervision, play & socialization', color: 'from-amber-500 to-orange-500', glow: 'glow-amber' },
  { icon: '✂️', title: 'Grooming', slug: 'grooming', desc: 'Professional grooming for all breeds', color: 'from-emerald-500 to-teal-500', glow: 'glow-emerald' },
  { icon: '🎓', title: 'Pet Training', slug: 'pet-training', desc: 'Behavioral training from certified pros', color: 'from-rose-500 to-red-500', glow: 'glow-rose' },
  { icon: '🏥', title: 'Vet Visits', slug: 'vet-visits', desc: 'We take your pet to vet appointments', color: 'from-cyan-500 to-blue-500', glow: 'glow-cyan' },
];

const features = [
  { icon: Shield, title: 'Verified Sitters', desc: 'Every sitter passes background checks & identity verification' },
  { icon: Star, title: 'Reviewed & Rated', desc: 'Transparent ratings from real pet owners after every booking' },
  { icon: Clock, title: 'Real-Time Updates', desc: 'Get live updates, photos, and GPS tracking of walks' },
  { icon: Heart, title: 'Insurance Covered', desc: 'Every booking includes pet damage & vet coverage' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Dog Owner', text: 'PetConnect made finding a sitter so easy! My golden retriever loves her walker. The live tracking feature gives me peace of mind.', rating: 5, avatar: 'S' },
  { name: 'James K.', role: 'Cat Owner', text: 'I was nervous leaving my cats, but the sitter was amazing. She sent me daily photo updates. Highly recommend!', rating: 5, avatar: 'J' },
  { name: 'Emma R.', role: 'Pet Sitter', text: 'As a sitter, PetConnect helps me find clients and manage my schedule easily. The payment system is seamless.', rating: 5, avatar: 'E' },
];

const topSitters = [
  { name: 'Alex Thompson', specialty: 'Dog Specialist', rating: 4.9, reviews: 127, price: 35, avatar: 'A', pets: ['Dogs', 'Cats'], verified: true },
  { name: 'Maria Garcia', specialty: 'Cat Whisperer', rating: 4.8, reviews: 98, price: 30, avatar: 'M', pets: ['Cats', 'Birds'], verified: true },
  { name: 'David Chen', specialty: 'All Pets Expert', rating: 4.9, reviews: 156, price: 40, avatar: 'D', pets: ['Dogs', 'Cats', 'Birds'], verified: true },
  { name: 'Lisa Park', specialty: 'Puppy Trainer', rating: 4.7, reviews: 84, price: 45, avatar: 'L', pets: ['Dogs'], verified: true },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/10 rounded-full blur-3xl"></div>

        {/* Floating pet emojis */}
        <div className="absolute top-32 left-[15%] text-4xl animate-float" style={{ animationDelay: '0s' }}>🐕</div>
        <div className="absolute top-48 right-[20%] text-3xl animate-float" style={{ animationDelay: '1s' }}>🐈</div>
        <div className="absolute bottom-32 left-[25%] text-3xl animate-float" style={{ animationDelay: '2s' }}>🐾</div>
        <div className="absolute bottom-48 right-[15%] text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🦴</div>
        <div className="absolute top-[40%] left-[8%] text-2xl animate-float" style={{ animationDelay: '1.5s' }}>💜</div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" /> AI-Powered Pet Care Platform
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-[Outfit] leading-[1.1] mb-6">
                <span className="text-slate-900">Trusted</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Pet Care</span>
                <br />
                <span className="text-slate-900">Near You</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Connect with verified, loving pet sitters in your neighborhood. Book dog walking, boarding, daycare & more — all backed by our satisfaction guarantee.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
                <Link href="/sitters" className="btn-primary text-base !py-3.5 !px-7 shadow-lg shadow-indigo-500/25">
                  <Search className="w-5 h-5" /> Find a Pet Sitter
                </Link>
                <Link href="/signup?role=sitter" className="btn-secondary text-base !py-3.5 !px-7">
                  <PawPrint className="w-5 h-5" /> Become a Sitter
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 10,000+ Verified Sitters</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 50,000+ Happy Pets</div>
              </motion.div>
            </motion.div>

            {/* Hero Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative hidden lg:block">
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 border border-white/50">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-4 shadow-lg">
                    🐕
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-[Outfit]">Quick Search</h3>
                  <p className="text-sm text-slate-500">Find the perfect sitter instantly</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <input type="text" placeholder="Enter your location..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none flex-1" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['🐕 Dogs', '🐈 Cats', '🐦 Birds'].map((pet) => (
                      <button key={pet} className="p-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium hover:border-indigo-400 hover:bg-indigo-50 transition-all text-slate-600">{pet}</button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Boarding', 'Walking', 'Daycare', 'Grooming'].map((s) => (
                      <button key={s} className="p-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium hover:border-purple-400 hover:bg-purple-50 transition-all text-slate-600">{s}</button>
                    ))}
                  </div>
                  <Link href="/sitters" className="block w-full text-center py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                    Search Sitters →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">Our Services</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold font-[Outfit] text-slate-900 mb-4">Everything Your Pet Needs</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 max-w-2xl mx-auto">From daily walks to overnight stays, find the perfect care for your furry friend</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.03, y: -6 }} whileTap={{ scale: 0.98 }} className="will-change-transform">
                <Link href={`/services/${service.slug}`} className={`group service-card ${service.glow} card cursor-pointer block relative overflow-hidden`} aria-label={`View ${service.title} service`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 font-[Outfit] mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">{service.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">Why PetConnect</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold font-[Outfit] text-slate-900 mb-4">Why Pet Parents Trust Us</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-[Outfit] mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Sitters */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">Top Rated</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold font-[Outfit] text-slate-900">Popular Pet Sitters</motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/sitters" className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:gap-2 transition-all">
                View All Sitters <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSitters.map((sitter, i) => (
              <motion.div key={i} variants={fadeUp} className="card group">
                <div className="relative mb-4">
                  <div className="w-full h-48 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span className="text-6xl font-bold text-indigo-300 font-[Outfit]">{sitter.avatar}</span>
                  </div>
                  {sitter.verified && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </div>
                  )}
                  <button className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-50 transition-colors group">
                    <Heart className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                  </button>
                </div>
                <h3 className="font-bold text-slate-800 font-[Outfit]">{sitter.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-2">{sitter.specialty}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-700">{sitter.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({sitter.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sitter.pets.map((pet) => (
                    <span key={pet} className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600">{pet}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-lg font-bold text-slate-800">${sitter.price}<span className="text-xs text-slate-400 font-normal">/day</span></span>
                  <Link href="/sitters" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Book Now →</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4">Testimonials</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold font-[Outfit] text-slate-900 mb-4">Loved by Pet Parents</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-8 shadow-lg shadow-indigo-500/5 border border-slate-100 relative">
                <Quote className="w-8 h-8 text-indigo-200 mb-4" />
                <p className="text-slate-600 leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-12 lg:p-16 text-center shadow-2xl shadow-indigo-500/25">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">Ready to Find the Perfect Sitter?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Join thousands of happy pet parents who trust PetConnect for their furry family members.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup" className="bg-white text-indigo-600 px-8 py-3.5 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                  Get Started Free
                </Link>
                <Link href="/how-it-works" className="border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
