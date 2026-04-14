import { useState } from 'react';
import { Users, Heart, Crown, TrendingUp, Activity, UserPlus, AlertTriangle, Search, Plus, Edit3, Trash2, MoreVertical, ChevronLeft, ChevronRight, BarChart3, DollarSign, Globe, PieChart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dashboardStats, revenueData, topCountries, genderStats, ageStats, activityFeed, profiles } from '../data';

export default function DashboardPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [userSearch, setUserSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersList, setUsersList] = useState(profiles.map((p) => ({
    ...p,
    role: 'user',
    accountStatus: 'active',
  })));

  const [newUser, setNewUser] = useState({ name: '', email: '', gender: 'male', role: 'user', accountStatus: 'active' });

  const perPage = 5;
  const filteredUsers = usersList.filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()));
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleCreateUser = () => {
    const created = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email || `${newUser.name.toLowerCase().replace(/\s/g, '.')}@lovelink.com`,
      age: 25,
      gender: newUser.gender,
      location: 'Unknown',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=ec4899&color=fff&size=150`,
      status: 'offline',
      verified: false,
      premium: false,
      role: newUser.role,
      accountStatus: newUser.accountStatus,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      interests: [],
      photos: [],
      bio: { en: '', fr: '' },
      occupation: { en: '', fr: '' },
      education: { en: '', fr: '' },
      compatibility: 0,
      lookingFor: 'relationship',
      height: '',
      distance: 0,
    };
    setUsersList((prev) => [created, ...prev]);
    setShowCreateModal(false);
    setNewUser({ name: '', email: '', gender: 'male', role: 'user', accountStatus: 'active' });
  };

  const handleDeleteUser = (id) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveEdit = () => {
    setUsersList((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  const formatNumber = (n) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n;

  const statCards = [
    { label: t('totalUsers'), value: formatNumber(dashboardStats.totalUsers), icon: Users, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', change: '+12.5%' },
    { label: t('activeToday'), value: formatNumber(dashboardStats.activeToday), icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', change: '+8.2%' },
    { label: t('newMatches'), value: formatNumber(dashboardStats.newMatches), icon: Heart, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/20', change: '+15.3%' },
    { label: t('premiumUsers'), value: formatNumber(dashboardStats.premiumUsers), icon: Crown, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', change: '+5.7%' },
  ];

  const tabs = [
    { key: 'overview', label: lang === 'en' ? 'Overview' : 'Vue d\'ensemble', icon: BarChart3 },
    { key: 'users', label: t('userManagement'), icon: Users },
    { key: 'analytics', label: t('analytics'), icon: PieChart },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'match': return <Heart className="w-4 h-4 text-primary-500" />;
      case 'signup': return <UserPlus className="w-4 h-4 text-emerald-500" />;
      case 'premium': return <Crown className="w-4 h-4 text-amber-500" />;
      case 'report': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">{t('dashboardTitle')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'en' ? 'Manage your platform' : 'Gérez votre plateforme'}
            </p>
          </div>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white dark:bg-surface-dark-card text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards — always shown */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold font-accent">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── OVERVIEW TAB ───────────────── */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Revenue chart */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-accent font-semibold text-lg">{t('revenue')}</h3>
                <span className="badge-primary flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> ${formatNumber(dashboardStats.monthlyRevenue)}
                </span>
              </div>
              <div className="flex items-end gap-2 h-52">
                {revenueData.map((item, i) => {
                  const maxRevenue = Math.max(...revenueData.map((r) => r.revenue));
                  const height = (item.revenue / maxRevenue) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative" style={{ height: `${height}%` }}>
                        <div className="absolute inset-0 bg-primary-400 dark:bg-primary-500 rounded-t-lg group-hover:bg-primary-500 dark:group-hover:bg-primary-400 transition-colors" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          ${(item.revenue / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity feed */}
            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('recentActivity')}</h3>
              <div className="space-y-3">
                {activityFeed.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getActivityIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.user}</p>
                      <p className="text-xs text-slate-400">{lang === 'fr' ? item.timeFr : item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top countries */}
            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('topCountries')}</h3>
              <div className="space-y-3">
                {topCountries.slice(0, 5).map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{c.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{c.country}</span>
                        <span className="text-xs text-slate-500">{formatNumber(c.users)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(c.users / topCountries[0].users) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender distribution */}
            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('genderDistribution')}</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="16" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="16" strokeDasharray={`${genderStats.male * 2.51} 251`} className="text-sky-500" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="16" strokeDasharray={`${genderStats.female * 2.51} 251`} strokeDashoffset={`${-genderStats.male * 2.51}`} className="text-primary-500" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500" />
                    <span className="text-sm">{t('male')}: {genderStats.male}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary-500" />
                    <span className="text-sm">{t('female')}: {genderStats.female}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-sm">{t('other')}: {genderStats.other}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Age distribution */}
            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('ageDistribution')}</h3>
              <div className="space-y-3">
                {ageStats.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12 text-slate-600 dark:text-slate-400">{a.range}</span>
                    <div className="flex-1 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-lg bg-primary-400 dark:bg-primary-500 flex items-center justify-end pr-2 transition-all duration-500"
                        style={{ width: `${a.percent}%` }}
                      >
                        <span className="text-xs font-medium text-white">{a.percent}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── USER MANAGEMENT TAB ────────── */}
        {activeTab === 'users' && (
          <div className="animate-fade-in">
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => { setUserSearch(e.target.value); setCurrentPage(1); }}
                    placeholder={t('search')}
                    className="input-field pl-10 !py-2.5 text-sm"
                  />
                </div>
                <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 !py-2.5 text-sm">
                  <Plus className="w-4 h-4" />
                  {t('createUser')}
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{lang === 'en' ? 'User' : 'Utilisateur'}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">{t('location')}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('status')}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">{t('role')}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">{t('joinDate')}</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt="" className="w-9 h-9 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-slate-400">{user.age} {t('yearsOld')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500 hidden sm:table-cell">{user.location}</td>
                        <td className="py-3 px-4">
                          <span className={`badge text-xs ${user.accountStatus === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                            {user.accountStatus === 'active' ? t('active') : t('suspended')}
                          </span>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="badge-primary text-xs">{t(user.role)}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500 hidden lg:table-cell">{user.joinDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => handleEditUser(user)} className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
                              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                            <button onClick={() => setDeleteConfirm(user.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors">
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-500">
                  {t('showing')} {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filteredUsers.length)} {t('of')} {filteredUsers.length} {t('results')}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="btn-secondary !py-2 !px-3 text-sm disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === i + 1 ? 'bg-primary-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="btn-secondary !py-2 !px-3 text-sm disabled:opacity-50">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── ANALYTICS TAB ─────────────── */}
        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('monthlyGrowth')}</h3>
              <div className="flex items-end gap-1.5 h-48">
                {revenueData.map((item, i) => {
                  const max = Math.max(...revenueData.map((r) => r.users));
                  const h = (item.users / max) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="w-full rounded-t-md bg-accent-400 dark:bg-accent-500 group-hover:bg-accent-500 dark:group-hover:bg-accent-400 transition-colors relative" style={{ height: `${h}%` }}>
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                          {formatNumber(item.users)}
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('weeklySignups')}</h3>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, i) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-lg transition-colors"
                      style={{
                        backgroundColor: intensity > 0.7 ? 'rgb(236,72,153)' : intensity > 0.4 ? 'rgb(251,191,209)' : intensity > 0.2 ? 'rgb(252,231,240)' : 'rgb(248,250,252)',
                        opacity: 0.5 + intensity * 0.5,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
                <span>{lang === 'en' ? 'Less' : 'Moins'}</span>
                <div className="flex gap-1">
                  {[0.2, 0.4, 0.6, 0.8, 1].map((v, i) => (
                    <div key={i} className="w-3 h-3 rounded" style={{ backgroundColor: `rgba(236,72,153,${v})` }} />
                  ))}
                </div>
                <span>{lang === 'en' ? 'More' : 'Plus'}</span>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-4">{t('topCountries')}</h3>
              <div className="space-y-3">
                {topCountries.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-lg">{c.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{c.country}</span>
                        <span className="text-xs text-slate-500">{formatNumber(c.users)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-accent-500 rounded-full transition-all duration-700" style={{ width: `${(c.users / topCountries[0].users) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-accent font-semibold text-lg mb-6">{t('ageDistribution')}</h3>
              <div className="space-y-4">
                {ageStats.map((a, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{a.range}</span>
                      <span className="text-slate-500">{a.percent}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${a.percent}%`,
                          backgroundColor: ['#8b5cf6', '#ec4899', '#f97316', '#10b981', '#06b6d4'][i],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── CREATE USER MODAL ────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}>
          <div className="card p-6 w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold mb-6">{t('createUser')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('fullName')}</label>
                <input value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('email')}</label>
                <input value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="input-field" placeholder="john@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('gender')}</label>
                  <select value={newUser.gender} onChange={(e) => setNewUser({...newUser, gender: e.target.value})} className="input-field">
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('role')}</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="input-field">
                    <option value="user">{t('user')}</option>
                    <option value="moderator">{t('moderator')}</option>
                    <option value="admin">{t('admin')}</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="btn-secondary flex-1">{t('cancel')}</button>
                <button onClick={handleCreateUser} className="btn-primary flex-1" disabled={!newUser.name}>{t('save')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDIT USER MODAL ──────────────── */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setEditingUser(null)}>
          <div className="card p-6 w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold mb-6">{t('editUser')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('fullName')}</label>
                <input value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('role')}</label>
                  <select value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})} className="input-field">
                    <option value="user">{t('user')}</option>
                    <option value="moderator">{t('moderator')}</option>
                    <option value="admin">{t('admin')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('status')}</label>
                  <select value={editingUser.accountStatus} onChange={(e) => setEditingUser({...editingUser, accountStatus: e.target.value})} className="input-field">
                    <option value="active">{t('active')}</option>
                    <option value="suspended">{t('suspended')}</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditingUser(null)} className="btn-secondary flex-1">{t('cancel')}</button>
                <button onClick={handleSaveEdit} className="btn-primary flex-1">{t('save')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRM MODAL ─────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="card p-6 w-full max-w-sm animate-scale-in text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2">{t('deleteUser')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t('confirmDelete')}</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">{t('cancel')}</button>
              <button onClick={() => handleDeleteUser(deleteConfirm)} className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-2xl transition-all flex-1">
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
