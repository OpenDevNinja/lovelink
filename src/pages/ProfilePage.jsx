import { useState } from 'react';
import { Camera, MapPin, Briefcase, GraduationCap, Ruler, Heart, Shield, Star, Edit3, Save, X, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { interestOptions } from '../data';

export default function ProfilePage() {
  const { t, lang } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio?.[lang] || '',
    location: user?.location || '',
    occupation: user?.occupation?.[lang] || '',
    education: user?.education?.[lang] || '',
    height: user?.height || '',
    lookingFor: user?.lookingFor || 'relationship',
    interests: user?.interests || [],
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const tabs = [
    { key: 'about', label: t('aboutMe') },
    { key: 'photos', label: t('myPhotos') },
    { key: 'interests', label: t('myInterests') },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-surface-dark">
      {/* Success notification */}
      {saved && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-card rounded-2xl px-6 py-3 flex items-center gap-2 animate-slide-up shadow-lg">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Save className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-medium text-sm">{t('profileSaved')}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header card */}
        <div className="card p-0 overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-48 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
            <button className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Profile info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-surface-dark-card shadow-lg"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-md">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
                {user?.status === 'online' && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-surface-dark-card" />
                )}
              </div>

              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">{user?.name}, {user?.age}</h1>
                  {user?.verified && (
                    <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  {user?.premium && <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs">Premium</span>}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {user?.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {user?.occupation?.[lang]}</span>
                </div>
              </div>

              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={editing ? 'btn-primary flex items-center gap-2 !py-2.5 text-sm' : 'btn-outline flex items-center gap-2 !py-2.5 text-sm'}
              >
                {editing ? <><Save className="w-4 h-4" />{t('saveProfile')}</> : <><Edit3 className="w-4 h-4" />{t('editProfile')}</>}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white dark:bg-surface-dark-card rounded-xl p-1 border border-slate-200 dark:border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'about' && (
          <div className="card p-6 space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('bio')}</label>
              {editing ? (
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({...form, bio: e.target.value})}
                  className="input-field min-h-[100px] resize-none"
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{user?.bio?.[lang]}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <MapPin className="w-3.5 h-3.5 inline mr-1" />{t('location')}
                </label>
                {editing ? (
                  <input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="input-field" />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">{user?.location}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Briefcase className="w-3.5 h-3.5 inline mr-1" />{t('occupation')}
                </label>
                {editing ? (
                  <input value={form.occupation} onChange={(e) => setForm({...form, occupation: e.target.value})} className="input-field" />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">{user?.occupation?.[lang]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 inline mr-1" />{t('education')}
                </label>
                {editing ? (
                  <input value={form.education} onChange={(e) => setForm({...form, education: e.target.value})} className="input-field" />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">{user?.education?.[lang]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Ruler className="w-3.5 h-3.5 inline mr-1" />{t('height')}
                </label>
                {editing ? (
                  <input value={form.height} onChange={(e) => setForm({...form, height: e.target.value})} className="input-field" />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">{user?.height}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Heart className="w-3.5 h-3.5 inline mr-1" />{t('lookingFor')}
              </label>
              {editing ? (
                <div className="flex gap-2">
                  {['relationship', 'friendship', 'casual'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setForm({...form, lookingFor: type})}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        form.lookingFor === type ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {t(type)}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="badge-primary">{t(user?.lookingFor)}</span>
              )}
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {user?.photos?.map((photo, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <img src={photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {editing && (
                    <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              ))}
              {editing && (
                <button className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-2 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all">
                  <Plus className="w-8 h-8 text-slate-400" />
                  <span className="text-sm text-slate-500">{t('uploadPhoto')}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="card p-6 animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const isSelected = (editing ? form.interests : user?.interests || []).includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => editing && toggleInterest(interest)}
                    disabled={!editing}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary-500 text-white shadow-md'
                        : editing
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
