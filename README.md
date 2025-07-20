## 📁 Project Structure

This project follows a scalable and maintainable structure inspired by enterprise-grade standards:

```
/src
├── app/                        # Next.js routing (app router)
│   ├── layout.tsx              # Layout, providers, meta
│   ├── page.tsx                # Landing or dashboard
│   └── (route groups, etc.)
│
├── components/                 # Reusable UI components
│   ├── common/                 # Buttons, cards, inputs, logo
│   │   ├── Button.tsx
│   │   ├── Logo.tsx
│   │   ├── Skeleton.tsx
│   │   └── Spinner.tsx
│   ├── layout/                 # Navbar, Sidebar, Footer
│   └── music/                  # Player, Slider, AudioUI
│
├── features/                   # Domain-specific logic
│   ├── auth/                   # Auth login/register/logout
│   ├── music/                  # PlaySong, player UI, recent
│   ├── profile/                # Profile page, settings
│   └── analytics/              # Playback analytics, history
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useMediaQuery.ts
│   └── usePlayer.ts
│
├── lib/                        # Helpers, logic, shared modules
│   ├── api.ts                  # Axios instance with interceptors
│   ├── constants.ts            # App constants, enums
│   ├── auth.ts                 # Token decode, refresh
│   ├── utils.ts                # Format time, debounce
│   └── sentry.ts               # Error logging init
│
├── services/                   # API integrations, external
│   ├── musicService.ts         # Fetch songs, search, etc.
│   ├── authService.ts
│   └── analyticsService.ts
│
├── store/                      # Global state (Zustand, Redux Toolkit)
│   ├── usePlayerStore.ts
│   └── authStore.ts
│
├── assets/                     # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   └── placeholder.png
│   └── icons/
│       ├── play.svg
│       └── pause.svg
│
├── styles/                     # Tailwind / global CSS
│   ├── globals.css
│   └── theme.css
│
├── types/                      # Global TypeScript types
│   ├── song.ts
│   ├── user.ts
│   └── index.d.ts
│
├── constants/                  # Static string enums / settings
│   └── theme.ts
│
├── middleware.ts               # Auth protection, logging
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

> This architecture promotes high modularity, testability, reusability, and code readability. It allows you to scale easily for features like authentication, media playback, analytics, caching, and global state management using tools like Zustand or Redux Toolkit.

---
