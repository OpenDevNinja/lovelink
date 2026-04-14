import { useState } from 'react';
import { Bell, Shield, User, Globe, Moon, Trash2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { t, lang, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    matchNotifications: true,
    messageNotifications: true,
    showOnlineStatus: true,
    showLastActive: true,
    profileVisibility: 'everyone',
  });

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : ''}`} />
    </button>
  );

  const sections = [
    {
      title: t('accountSettings'),
      icon: User,
      items: [
        {
          label: t('language'),
          type: 'select',
          value: lang,
          options: [{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }],
          onChange: (e) => setLanguage(e.target.value),
        },
        {
          label: isDark ? t('darkMode') : t('lightMode'),
          type: 'toggle',
          value: isDark,
          onChange: toggleTheme,
        },
      ],
    },
    {
      title: t('notificationSettings'),
      icon: Bell,
      items: [
        { label: t('pushNotifications'), type: 'toggle', value: settings.pushNotifications, onChange: () => toggle('pushNotifications') },
        { label: t('emailNotifications'), type: 'toggle', value: settings.emailNotifications, onChange: () => toggle('emailNotifications') },
        { label: t('matchNotifications'), type: 'toggle', value: settings.matchNotifications, onChange: () => toggle('matchNotifications') },
        { label: t('messageNotifications'), type: 'toggle', value: settings.messageNotifications, onChange: () => toggle('messageNotifications') },
      ],
    },
    {
      title: t('privacySettings'),
      icon: Shield,
      items: [
        { label: t('showOnlineStatus'), type: 'toggle', value: settings.showOnlineStatus, onChange: () => toggle('showOnlineStatus') },
        { label: t('showLastActive'), type: 'toggle', value: settings.showLastActive, onChange: () => toggle('showLastActive') },
        {
          label: t('profileVisibility'),
          type: 'select',
          value: settings.profileVisibility,
          options: [
            { value: 'everyone', label: t('everyone') },
            { value: 'matches', label: t('matchesOnly') },
            { value: 'nobody', label: t('nobody') },
          ],
          onChange: (e) => setSettings({...settings, profileVisibility: e.target.value}),
        },
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-surface-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">{t('settingsTitle')}</h1>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="card p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="font-accent font-semibold text-lg">{section.title}</h2>
              </div>

              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                    {item.type === 'toggle' && <Toggle enabled={item.value} onChange={item.onChange} />}
                    {item.type === 'select' && (
                      <select value={item.value} onChange={item.onChange} className="input-field !w-auto !py-2 !px-3 text-sm">
                        {item.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Delete account */}
          <div className="card p-6 border-red-200 dark:border-red-900/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="font-accent font-semibold text-lg text-red-600 dark:text-red-400">{t('deleteAccount')}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('deleteAccountWarning')}</p>
              </div>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2.5 rounded-xl transition-all text-sm">
              {t('deleteAccount')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
