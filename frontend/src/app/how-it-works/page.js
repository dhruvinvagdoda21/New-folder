'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, CalendarCheck, Heart, Shield, Star, MessageCircle, CreditCard, ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const steps = [
  { step: 1, icon: Search, title: 'Search & Browse', desc: 'Find verified pet sitters in your area. Filter by pet type, service, price, and ratings to find your perfect match.', color: 'from-indigo-500 to-blue-500' },
  { step: 2, icon: MessageCircle, title: 'Connect & Chat', desc: 'Message sitters directly to discuss your pet\'s needs. Ask questions and get to know them before booking.', color: 'from-purple-500 to-pink-500' },
  { step: 3, icon: CalendarCheck, title: 'Book & Schedule', desc: 'Choose your dates and services. Book instantly with our real-time calendar system. Easy rescheduling too!', color: 'from-amber-500 to-orange-500' },
  { step: 4, icon: CreditCard, title: 'Pay Securely', desc: 'Secure payment through Stripe. Your money is held safely until the service is complete.', color: 'from-emerald-500 to-teal-500' },
  { step: 5, icon: Heart, title: 'Enjoy Peace of Mind', desc: 'Receive live updates during the sit. Rate and review your sitter after each booking.', color: 'from-rose-500 to-red-500' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">Simple & Secure</motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold font-[Outfit] text-slate-900 mb-6">
              How <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PetConnect</span> Works
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              Finding trusted pet care has never been easier. Follow these simple steps to get started.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-16">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl relative`}>
                    <step.icon className="w-12 h-12 text-white" />
                    <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold text-slate-800 font-[Outfit]">{step.step}</div>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 font-[Outfit] mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold font-[Outfit] text-slate-900 mb-12">Built on Trust & Safety</motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Background Checked', desc: 'All sitters undergo comprehensive background checks' },
                { icon: Star, title: 'Verified Reviews', desc: 'Only verified booking reviews — no fake feedback' },
                { icon: CreditCard, title: 'Secure Payments', desc: 'Stripe-powered payments with full buyer protection' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="card text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 font-[Outfit] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-12 shadow-2xl shadow-indigo-500/25">
            <h2 className="text-3xl lg:text-4xl font-bold font-[Outfit] text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 mb-8 text-lg">Join thousands of happy pet parents on PetConnect</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup" className="bg-white text-indigo-600 px-8 py-3.5 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2">
                Sign Up Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/sitters" className="border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors">
                Browse Sitters
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
