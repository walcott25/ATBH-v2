<div align="center">
  <br/>
  <picture>
    <source media="(max-width: 768px)" srcset="https://raw.githubusercontent.com/walcott25/ATBH-v2/master/public/og-image-mobile.jpg">
    <img src="https://raw.githubusercontent.com/walcott25/ATBH-v2/master/public/og-image.jpg" alt="Asuogyaman Tourism & Business Hub" width="800" height="auto" style="border-radius:12px;max-width:100%;" />
  </picture>
  <br/>
  <br/>
  <h1>Asuogyaman Tourism & Business Hub</h1>
  <p>
    <strong>Discover the beauty, culture, and adventure of Asuogyaman District — your gateway to Ghana's Volta Region.</strong>
  </p>
  <p>
    <a href="https://atbh.vercel.app"><img src="https://img.shields.io/badge/Live-Website-0A0A0A?style=flat-square" alt="Website"/></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19"/></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite 6"/></a>
    <a href="https://asuogyaman-tourism-hub.com"><img src="https://img.shields.io/badge/PWA-✓-5B0BB5?style=flat-square&logo=pwa" alt="PWA"/></a>
  </p>
  <br/>
</div>

## Overview

ATBH is a modern, feature-rich tourism platform built for the **Asuogyaman District** — a stunning region in Ghana's Eastern Region anchored by the Volta River, the Akosombo Dam, and the iconic Adomi Bridge. The platform serves as a central hub for tourists, locals, and businesses, offering:

- **Curated listings** of attractions, dining, accommodations, events, businesses, and schools
- **Interactive map** with geolocated points of interest
- **360° virtual tours** of key landmarks
- **AI-powered travel assistant** (NVIDIA NIM + Gemini)
- **Donation & payment processing** via Paystack
- **Admin dashboard** with analytics and content management
- **Progressive Web App** — installable on mobile and desktop
- **Authentication & user profiles** powered by Clerk

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animation** | [Framer Motion](https://motion.dev/) / `motion` |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Auth** | [Clerk](https://clerk.com/) |
| **Maps** | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) |
| **360° Tours** | [Photo Sphere Viewer](https://photo-sphere-viewer.js.org/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Payments** | [Paystack](https://paystack.com/) |
| **AI** | [NVIDIA NIM](https://build.nvidia.com/) + [Google Gemini](https://ai.google.dev/) |
| **PWA** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| **SEO** | [react-helmet-async](https://github.com/staylor/react-helmet-async) + structured data |
| **Analytics** | Google Tag Manager / GA4 |
| **Backend** | Express proxy server, Vercel serverless functions |
| **Database** | Neon (Postgres), SQLite (local dev) |
| **Hosting** | [Vercel](https://vercel.com/) |

## Features

### 🏞️ Tourism Listings
- **Attractions** — Adomi Bridge, Volta Lake cruises, Dodi Island, Akosombo Dam, Akwamu Gorge, and more
- **Dining** — Restaurants, bars, and local cuisine spots
- **Stay** — Hotels, resorts, and lodges along the Volta River
- **Events** — Festivals, cruises, and cultural celebrations
- Each listing includes images, descriptions, ratings, contact info, and a detail panel

### 🗺️ Interactive Map
- Full-page map with geolocated pins for every listing
- Categorized markers with popup details
- Built with Leaflet + OpenStreetMap tiles

### 🎥 360° Virtual Tours
- Immersive panorama viewer powered by Photo Sphere Viewer
- Explore landmarks from any angle — works on mobile and desktop

### 🤖 AI Travel Assistant
- Ask questions about Asuogyaman attractions, history, and travel logistics
- Powered by NVIDIA NIM API for natural language responses
- Chat interface accessible from anywhere in the app

### 👤 Authentication & Profiles
- Sign up / Sign in via Clerk (email, Google, social)
- User profiles with name display
- Admin role detection for content management
- Protected routes for admin-only pages

### 📊 Admin Dashboard
- Analytics with revenue charts (bar, pie, line)
- Donation history tracking
- Content management tools
- Role-based access control

### 💳 Donations & Payments
- Secure payment processing via Paystack
- Checkout form, payment verification via serverless API
- Donation history for authenticated users

### 📱 Progressive Web App
- Installable on iOS and Android
- Service worker with caching strategies
- Offline-ready shell
- Web app manifest with theme colors and icons

### 🎨 UI/UX Highlights
- Smooth page transitions with Framer Motion
- Scroll-triggered reveal animations
- Animated counters and stat cards
- Parallax and zoom effects on hero sections
- Cookie consent banner (GDPR-aware)
- Fully responsive across all screen sizes
- Dark/light theme via Tailwind classes

## Getting Started

### Prerequisites
- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/walcott25/ATBH-v2.git
cd ATBH-v2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Then edit `.env.local` with your keys:

| Variable | Required | Description |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (from Clerk Dashboard) |
| `NVIDIA_API_KEY` | Yes (for AI) | NVIDIA NIM API key from [build.nvidia.com](https://build.nvidia.com/) |
| `CLERK_WEBHOOK_SIGNING_SECRET` | For webhooks | Clerk webhook signing secret |

### Development

```bash
# Start the Vite dev server
npm run dev

# Or run with the Express proxy server (for API routes)
npm run dev:all
```

The app runs at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
npx vercel --prod
```

The project includes a `vercel.json` with SPA rewrites and serverless function config.

## Project Structure

```
ATBH-v2/
├── api/                  # Vercel serverless functions
│   ├── donations/        # Donation processing
│   ├── nvidia/           # NVIDIA NIM AI chat
│   ├── paystack/         # Paystack payment verification
│   └── health.ts         # Health check endpoint
├── public/
│   └── Images/           # Static images and assets
├── server/               # Express proxy server (local dev)
│   └── index.ts
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── animations/   # Scroll-reveal, section animations
│   │   ├── chat/         # AI chat interface
│   │   ├── layout/       # Header, footer, navigation
│   │   ├── modals/       # Cookie consent, legal modals
│   │   ├── seo/          # SEO / structured data helpers
│   │   └── ui/           # GlassCard, ImageCard, PageHero, etc.
│   ├── context/          # App-wide React context
│   ├── layouts/          # Main layout with nav + footer
│   ├── pages/            # Route pages (18 pages)
│   ├── services/         # Analytics, Gemini AI service
│   └── utils/            # Shared utilities
├── .env.example          # Environment variable template
├── vercel.json           # Vercel deployment config
├── vite.config.ts        # Vite + Tailwind + PWA config
└── tsconfig.json         # TypeScript configuration
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run dev:proxy` | Start Express proxy server |
| `npm run dev:all` | Run both Vite + proxy concurrently |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript type-check |
| `npm run clean` | Remove dist directory |

## API Endpoints

### Serverless (Vercel)

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Health check |
| `/api/nvidia/chat` | POST | AI chat with NVIDIA NIM |
| `/api/paystack/verify` | POST | Verify Paystack payment |
| `/api/donations/record` | POST | Record a donation |
| `/api/donations/history` | GET | Get donation history (auth required) |

### Local Express Proxy

| Endpoint | Method | Description |
|---|---|---|
| `/api/nvidia/chat` | POST | Proxies to NVIDIA NIM API |

## Environment Variables

See [.env.example](.env.example) for the full list.

Key variables:

- **`VITE_CLERK_PUBLISHABLE_KEY`** — Clerk publishable key for authentication
- **`NVIDIA_API_KEY`** — API key for NVIDIA NIM (AI assistant)
- **`CLERK_WEBHOOK_SIGNING_SECRET`** — Webhook secret for Clerk events
- **`APP_URL`** — Public URL of the app (auto-injected by AI Studio / Vercel)

Analytics (GA4) is configured via Google Tag Manager — no env vars needed.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgments

- **Asuogyaman Tourism Board** — Content and regional guidance
- **[Clerk](https://clerk.com/)** — Authentication infrastructure
- **[NVIDIA](https://build.nvidia.com/)** — AI inference API
- **[Paystack](https://paystack.com/)** — Payment processing
- **[Photo Sphere Viewer](https://photo-sphere-viewer.js.org/)** — 360° tour technology
- **[Google Gemini](https://ai.google.dev/)** — AI foundation models
- All image credits and tourism content belong to the Asuogyaman Tourism Board

---

<div align="center">
  <p>
    <a href="https://atbh.vercel.app">🌐 Visit the Live Site</a> ·
    <a href="mailto:asuogyamantourismboard@gmail.com">📧 Contact</a> ·
    <a href="https://github.com/walcott25/ATBH-v2/issues">🐛 Report a Bug</a>
  </p>
  <p>
    <sub>Crafted with care for Asuogyaman District, Eastern Region, Ghana 🇬🇭</sub>
  </p>
</div>
