'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { Menu, X, PawPrint, Bell, Moon, Sun, User, LogOut, Heart, MessageCircle, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, initialize } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    initialize();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialize]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'sitter') return '/sitter-dashboard';
    return '/owner-dashboard';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-indigo-500/5 border-b border-slate-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[Outfit] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PetConnect
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/sitters" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Find Sitters
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              How It Works
            </Link>
            <Link href="/ai-assistant" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              AI Assistant
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Toggle dark mode">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link href="/messages" className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors relative">
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{user?.name?.split(' ')[0]}</span>
                  </button>
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                      >
                        <div className="p-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                          <p className="text-xs text-slate-500">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700 uppercase">
                            {user?.role}
                          </span>
                        </div>
                        <div className="p-1">
                          <Link href={getDashboardLink()} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg" onClick={() => setShowDropdown(false)}>
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                          </Link>
                          <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg" onClick={() => setShowDropdown(false)}>
                            <User className="w-4 h-4" /> Profile
                          </Link>
                          <Link href="/favorites" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg" onClick={() => setShowDropdown(false)}>
                            <Heart className="w-4 h-4" /> Favorites
                          </Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary text-sm !py-2.5 !px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="p-4 space-y-2">
              <Link href="/sitters" className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>Find Sitters</Link>
              <Link href="/how-it-works" className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>How It Works</Link>
              <Link href="/ai-assistant" className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>AI Assistant</Link>
              {isAuthenticated ? (
                <>
                  <Link href={getDashboardLink()} className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <Link href="/messages" className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>Messages</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium">Sign Out</button>
                </>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link href="/login" className="block text-center px-4 py-3 rounded-xl border-2 border-indigo-500 text-indigo-600 font-semibold" onClick={() => setIsOpen(false)}>Sign In</Link>
                  <Link href="/signup" className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold" onClick={() => setIsOpen(false)}>Get Started</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
