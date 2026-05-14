'use client';
import Link from 'next/link';
import { PawPrint, Mail, Phone, MapPin, Globe, MessageSquare, Camera, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[Outfit] text-white">PetConnect</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              The trusted marketplace connecting pet owners with verified, loving pet sitters in your neighborhood.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageSquare, Camera, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[Outfit]">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['Find Sitters', '/sitters'], ['Become a Sitter', '/signup?role=sitter'], ['How It Works', '/how-it-works'], ['AI Assistant', '/ai-assistant']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[Outfit]">Services</h4>
            <ul className="space-y-2.5">
              {['Dog Walking', 'Pet Boarding', 'Pet Daycare', 'Pet Grooming', 'Pet Training', 'Vet Visits'].map((item) => (
                <li key={item}>
                  <Link href="/sitters" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[Outfit]">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                support@petconnect.com
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                123 Pet Street, San Francisco, CA 94102
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2025 PetConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
