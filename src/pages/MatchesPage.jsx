import { Link } from 'react-router-dom';
import { Heart, MessageCircle, MapPin, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { profiles, matchedProfiles } from '../data';

export default function MatchesPage() {
  const { t, lang } = useLanguage();
  const matches = profiles.filter((p) => matchedProfiles.includes(p.id));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">{t('matchesTitle')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t('matchesSubtitle')}</p>
        </div>

        {/* New matches row */}
        <div className="mb-10">
          <h2 className="font-accent font-semibold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {lang === 'en' ? 'New Matches' : 'Nouveaux Matchs'}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {matches.map((match) => (
              <Link
                key={match.id}
                to="/messages"
                className="flex-shrink-0 group"
              >
                <div className="relative">
                  <img
                    src={match.avatar}
                    alt={match.name}
                    className="w-20 h-20 rounded-2xl object-cover border-3 border-primary-400 dark:border-primary-500 group-hover:scale-105 transition-transform"
                  />
                  {match.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-surface-dark" />
                  )}
                </div>
                <p className="text-xs font-medium text-center mt-2 text-slate-700 dark:text-slate-300 max-w-[80px] truncate">
                  {match.name.split(' ')[0]}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Match cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="card p-0 overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={match.photos[0]}
                  alt={match.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Compatibility */}
                <div className="absolute top-3 right-3 glass-card rounded-xl px-2.5 py-1 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-primary-500 fill-primary-500" />
                  <span className="text-xs font-bold">{match.compatibility}%</span>
                </div>

                {match.verified && (
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Status */}
                {match.status === 'online' && (
                  <div className="absolute bottom-14 left-4 badge-online text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    {t('online')}
                  </div>
                )}

                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{match.name}, {match.age}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {match.location}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                  {match.bio[lang]}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {match.interests.slice(0, 3).map((tag) => (
                    <span key={tag} className="badge-primary text-xs">{tag}</span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link to="/messages" className="btn-primary flex-1 text-center flex items-center justify-center gap-2 !py-2.5 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    {t('startChat')}
                  </Link>
                  <button className="btn-secondary !py-2.5 !px-3">
                    <Heart className="w-4 h-4 text-primary-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="card p-16 text-center">
            <Heart className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">{t('noMatches')}</h3>
            <Link to="/discover" className="btn-primary mt-4 inline-block">{t('discover')}</Link>
          </div>
        )}
      </div>
    </div>
  );
}
