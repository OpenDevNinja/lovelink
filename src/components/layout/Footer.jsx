import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t('about'), to: '#' },
    { label: t('careers'), to: '#' },
    { label: t('press'), to: '#' },
    { label: t('blog'), to: '#' },
    { label: t('support'), to: '#' },
    { label: t('safety'), to: '#' },
    { label: t('terms'), to: '#' },
    { label: t('privacy'), to: '#' },
    { label: t('cookies'), to: '#' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-display font-bold text-lg">
              <span className="text-gradient">Love</span>
              <span className="text-slate-800 dark:text-white">Link</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
            <span>{t('copyright')}</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              {t('madeWith')} <Heart className="w-3.5 h-3.5 text-primary-500 fill-primary-500 animate-heart-beat" /> {t('forYou')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
