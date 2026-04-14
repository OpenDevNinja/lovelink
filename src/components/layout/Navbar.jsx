import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Sun, Moon, Globe, Bell, MessageCircle, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t, lang, toggleLang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/discover', label: t('discover') },
    { to: '/matches', label: t('matches') },
    { to: '/messages', label: t('messages') },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ to: '/dashboard', label: t('dashboard') });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-pink group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-gradient">Love</span>
              <span className="text-slate-800 dark:text-white">Link</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Bell className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
              </button>
            )}

            {/* Messages shortcut */}
            {isAuthenticated && (
              <Link
                to="/messages"
                className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
              >
                <MessageCircle className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
              </Link>
            )}

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={lang === 'en' ? 'Français' : 'English'}
            >
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-500" />
              )}
            </button>

            {/* Auth buttons or Avatar */}
            {isAuthenticated ? (
              <Link to="/profile" className="hidden sm:block">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-9 h-9 rounded-xl object-cover border-2 border-primary-300 dark:border-primary-600 hover:border-primary-500 transition-colors"
                />
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn-secondary !py-2 !px-4 text-sm">{t('login')}</Link>
                <Link to="/signup" className="btn-primary !py-2 !px-4 text-sm">{t('signup')}</Link>
              </div>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('search')}
                className="input-field pl-11"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200/50 dark:border-slate-700/50 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <img src={user?.avatar} alt="" className="w-7 h-7 rounded-lg object-cover" />
                {t('profile')}
              </Link>
            )}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-center !py-2.5 text-sm">{t('login')}</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center !py-2.5 text-sm">{t('signup')}</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
