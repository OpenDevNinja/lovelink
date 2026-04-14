import { Link } from 'react-router-dom';
import { Heart, Shield, MessageCircle, Globe, Sparkles, Lock, ArrowRight, Star, Users, MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { testimonials, profiles } from '../data';

export default function HomePage() {
  const { t, lang } = useLanguage();

  const features = [
    { icon: Sparkles, title: t('featureAI'), desc: t('featureAIDesc'), color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { icon: Shield, title: t('featureSecure'), desc: t('featureSecureDesc'), color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { icon: MessageCircle, title: t('featureChat'), desc: t('featureChatDesc'), color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
    { icon: Globe, title: t('featureGlobal'), desc: t('featureGlobalDesc'), color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { icon: Star, title: t('featureEvents'), desc: t('featureEventsDesc'), color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { icon: Lock, title: t('featurePrivacy'), desc: t('featurePrivacyDesc'), color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  ];

  const stats = [
    { value: t('membersCount'), icon: Users },
    { value: t('matchesCount'), icon: Heart },
    { value: t('countriesCount'), icon: MapPin },
    { value: t('ratingStat'), icon: Star },
  ];

  return (
    <div className="overflow-hidden">
      {/* ─── Hero ──────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-200/30 dark:bg-primary-800/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-200/20 dark:bg-accent-800/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-100/20 dark:bg-primary-900/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text side */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 mb-8">
                <Heart className="w-4 h-4 text-primary-500 fill-primary-500 animate-heart-beat" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{t('tagline')}</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                {t('heroTitle')}{' '}
                <span className="text-gradient">{t('heroHighlight')}</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="btn-primary text-center flex items-center justify-center gap-2 text-lg !px-8 !py-4">
                  {t('getStarted')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="#features" className="btn-secondary text-center text-lg !px-8 !py-4">
                  {t('learnMore')}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start gap-1">
                    <div className="flex items-center gap-1.5">
                      <stat.icon className="w-4 h-4 text-primary-500" />
                      <span className="font-accent font-bold text-lg text-slate-900 dark:text-white">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side — Profile cards */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[600px]">
                {/* Main card */}
                <div className="absolute top-8 left-8 w-72 card p-0 overflow-hidden animate-float z-10 shadow-card-hover">
                  <div className="relative">
                    <img src={profiles[0].photos[0]} alt="" className="w-full h-80 object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{profiles[0].name}, {profiles[0].age}</h3>
                      <p className="text-white/80 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {profiles[0].location}
                      </p>
                    </div>
                    {profiles[0].verified && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {profiles[0].interests.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge-primary">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary card */}
                <div className="absolute top-32 right-0 w-64 card p-0 overflow-hidden animate-float z-20" style={{ animationDelay: '2s' }}>
                  <img src={profiles[2].photos[0]} alt="" className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-semibold">{profiles[2].name}, {profiles[2].age}</h3>
                    <p className="text-white/80 text-xs">{profiles[2].location}</p>
                  </div>
                </div>

                {/* Match notification */}
                <div className="absolute bottom-16 left-0 glass-card rounded-2xl p-4 flex items-center gap-3 animate-slide-up z-30 shadow-card-hover" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">New Match!</p>
                    <p className="text-xs text-slate-500">Sophie & Alex — 95% {t('compatibility')}</p>
                  </div>
                </div>

                {/* Compatibility badge */}
                <div className="absolute bottom-8 right-8 glass-card rounded-2xl p-3 flex items-center gap-2 animate-float z-30" style={{ animationDelay: '3s' }}>
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">95%</div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('compatibility')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────── */}
      <section id="features" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="card p-8 group hover:scale-[1.02] transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feat.icon className={`w-7 h-7 ${feat.color}`} />
                </div>
                <h3 className="font-accent font-semibold text-xl mb-3 text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.id} className="card p-0 overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.photo}
                    alt={item.names}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">{item.names}</h3>
                    <p className="text-white/70 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 badge bg-white/20 backdrop-blur-sm text-white">
                    <Heart className="w-3 h-3 fill-current mr-1" /> {item.date}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{item.story[lang]}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-500 dark:bg-primary-900" />
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-400/30 dark:bg-primary-800/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent-400/20 dark:bg-accent-800/20 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Heart className="w-16 h-16 text-white/80 mx-auto mb-6 animate-heart-beat" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            {lang === 'en' ? 'Ready to Find Love?' : 'Prêt à Trouver l\'Amour ?'}
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            {lang === 'en'
              ? 'Join over 2 million people who have already found their match on LoveLink.'
              : 'Rejoignez plus de 2 millions de personnes qui ont déjà trouvé leur match sur LoveLink.'}
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-2xl
            hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.97] text-lg"
          >
            {t('getStarted')}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
