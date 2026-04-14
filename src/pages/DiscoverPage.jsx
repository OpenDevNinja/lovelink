import { useState } from 'react';
import { Heart, X, Star, MapPin, Shield, Briefcase, GraduationCap, Ruler, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { profiles } from '../data';

export default function DiscoverPage() {
  const { t, lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [swipeAnim, setSwipeAnim] = useState(null);
  const [filters, setFilters] = useState({ ageMin: 18, ageMax: 45, distance: 50 });

  const available = profiles.filter((p) => !liked.includes(p.id) && !passed.includes(p.id));
  const profile = available[currentIndex];

  const handleAction = (action) => {
    if (!profile) return;
    setSwipeAnim(action);
    setTimeout(() => {
      if (action === 'like' || action === 'superlike') {
        setLiked((prev) => [...prev, profile.id]);
      } else {
        setPassed((prev) => [...prev, profile.id]);
      }
      setCurrentIndex(0);
      setPhotoIndex(0);
      setSwipeAnim(null);
    }, 300);
  };

  const nextPhoto = () => {
    if (profile) setPhotoIndex((prev) => (prev + 1) % profile.photos.length);
  };
  const prevPhoto = () => {
    if (profile) setPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">{t('discoverTitle')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{t('discoverSubtitle')}</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 !py-2.5 ${showFilters ? '!bg-primary-50 dark:!bg-primary-900/20 !text-primary-600' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="card p-6 mb-8 animate-slide-up">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('filterAge')}: {filters.ageMin} - {filters.ageMax}</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="18" max="60" value={filters.ageMin} onChange={(e) => setFilters({...filters, ageMin: +e.target.value})} className="flex-1 accent-primary-500" />
                  <input type="range" min="18" max="60" value={filters.ageMax} onChange={(e) => setFilters({...filters, ageMax: +e.target.value})} className="flex-1 accent-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('filterDistance')}: {filters.distance} km</label>
                <input type="range" min="1" max="200" value={filters.distance} onChange={(e) => setFilters({...filters, distance: +e.target.value})} className="w-full accent-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('lookingFor')}</label>
                <div className="flex flex-wrap gap-2">
                  {['relationship', 'friendship', 'casual'].map((type) => (
                    <button key={type} className="badge-primary cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800/40 transition-colors">
                      {t(type)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card area */}
        <div className="flex justify-center">
          {profile ? (
            <div className="w-full max-w-md">
              <div
                className={`card p-0 overflow-hidden transition-all duration-300 ${
                  swipeAnim === 'like' ? 'translate-x-32 rotate-6 opacity-0' :
                  swipeAnim === 'pass' ? '-translate-x-32 -rotate-6 opacity-0' :
                  swipeAnim === 'superlike' ? '-translate-y-20 opacity-0 scale-105' : ''
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden group">
                  <img
                    src={profile.photos[photoIndex]}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />

                  {/* Photo indicators */}
                  <div className="absolute top-3 inset-x-3 flex gap-1">
                    {profile.photos.map((_, i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i === photoIndex ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>

                  {/* Nav arrows */}
                  <button onClick={prevPhoto} className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  <button onClick={nextPhoto} className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                  </button>

                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Info overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-white font-display text-2xl font-bold">{profile.name}, {profile.age}</h2>
                      {profile.verified && (
                        <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                          <Shield className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      {profile.premium && <span className="badge bg-amber-400/20 text-amber-300 text-xs">Premium</span>}
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.distance} {t('kmAway')}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {profile.occupation[lang]}</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{profile.bio[lang]}</p>
                  </div>

                  {/* Compatibility badge */}
                  <div className="absolute top-4 right-4 glass-card rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.compatibility}%</span>
                  </div>

                  {/* Online status */}
                  {profile.status === 'online' && (
                    <div className="absolute top-4 left-4 badge-online">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                      {t('online')}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <GraduationCap className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{profile.education[lang]}</span>
                    </div>
                    <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <Ruler className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{profile.height}</span>
                    </div>
                    <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <Heart className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{t(profile.lookingFor)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {profile.interests.map((tag) => (
                      <span key={tag} className="badge-primary">{tag}</span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleAction('pass')}
                      className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center
                      hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 transition-all group shadow-md"
                    >
                      <X className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                    </button>
                    <button
                      onClick={() => handleAction('superlike')}
                      className="w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center
                      hover:bg-sky-100 dark:hover:bg-sky-900/40 hover:scale-110 transition-all group shadow-md"
                    >
                      <Star className="w-5 h-5 text-sky-500 group-hover:fill-sky-500 transition-colors" />
                    </button>
                    <button
                      onClick={() => handleAction('like')}
                      className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center
                      hover:bg-primary-600 hover:scale-110 transition-all shadow-lg shadow-primary-500/30"
                    >
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-16 text-center max-w-md w-full">
              <Heart className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{t('noMoreProfiles')}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {lang === 'en' ? 'Try adjusting your filters or check back later.' : 'Essayez d\'ajuster vos filtres ou revenez plus tard.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
