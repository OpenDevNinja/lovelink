# LoveLink — Dating Platform 💕

A complete, professional dating website built with React, Vite, and Tailwind CSS.

## Features

### 🌐 Bilingual (EN/FR)
- Full English and French translations
- Language toggle in navbar

### 🌓 Dark/Light Mode
- System preference detection
- Persistent theme choice
- Smooth transitions

### 📱 Fully Responsive
- Mobile-first design
- Adaptive layouts for all screen sizes

### Pages & Features

| Page | Features |
|------|----------|
| **Home** | Hero section, feature cards, testimonials, CTA, stats |
| **Login / Signup** | Forms with social auth, split-screen layout, validation |
| **Discover** | Swipeable profile cards, photo gallery, filters, compatibility % |
| **Matches** | Matched profiles grid, new matches carousel, start chat |
| **Messages** | Real-time chat UI, conversation list, message status, search |
| **Profile** | Edit mode, photo gallery, interests picker, tabs |
| **Dashboard** | Stats cards, revenue chart, user management (CRUD), analytics, activity feed |
| **Settings** | Notifications, privacy, account, theme & language toggles |

### Dashboard (Admin)
- **Overview**: Revenue charts, activity feed, top countries, demographic charts
- **User Management**: Create, edit, delete users with modal dialogs, pagination, search
- **Analytics**: Growth charts, heatmap, country stats, age distribution

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom design system)
- **React Router 6** (SPA routing)
- **Lucide React** (icons)
- **Framer Motion** (animations)

## Project Structure

```
src/
├── components/
│   └── layout/          # Navbar, Footer, Layout
├── context/             # ThemeContext, LanguageContext, AuthContext
├── data/                # All app data (profiles, translations, stats)
├── pages/               # All page components
├── index.css            # Global styles + Tailwind layers
├── main.jsx             # Entry point
└── App.jsx              # Router setup
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Design System

- **Fonts**: Playfair Display (display), DM Sans (body), Outfit (accent)
- **Colors**: Pink primary (#ec4899), Orange accent (#f97316)
- **Components**: `.btn-primary`, `.btn-secondary`, `.card`, `.badge-*`, `.input-field`, `.glass-card`
- **Animations**: float, slide-up, fade-in, scale-in, heart-beat

## Data

All data is centralized in `src/data/index.js`:
- Translations (EN/FR)
- User profiles with photos from Unsplash
- Chat conversations
- Dashboard statistics
- Testimonials

---

Made with ❤️ by LoveLink
