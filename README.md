# RunVerse - The Complete Running Ecosystem

![RunVerse Logo](logo.png)

RunVerse is a comprehensive cross-platform application ecosystem for runners and joggers, from casual morning joggers to marathon athletes. Built with modern technologies and designed by runners for runners, RunVerse provides everything needed to track runs, manage gear, fuel your body, recover properly, and connect with a vibrant running community.

## Project Overview

RunVerse is a full-featured lifestyle and community platform that celebrates the runner and their shoes through every screen. The application combines GPS tracking, social networking, marketplace functionality, nutrition guidance, and recovery management into one elegant, polished experience.

### Core Philosophy

Every feature is designed to make runners feel understood. RunVerse feels like it was built *by* a runner, *for* runners — not a generic fitness app. Every detail, from shoe mileage warnings to marketplace mileage disclosure, signals deep domain expertise and genuine community care.

## Repository Structure

```
Runverse-AI/
├── runverse-web/           # Web application (React + TypeScript)
├── runverse-mobile/        # Mobile app (React Native + Expo)
├── logo.png               # RunVerse brand logo
└── README.md              # This file
```

## Key Features

### 1. Shoe Locker & Tracking
- Log every pair of shoes with brand, model, purchase date, and color
- Track mileage per pair with automatic calculations
- Receive retirement warnings at 500-800km threshold
- Access shoe history and performance statistics
- Community shoe reviews and ratings

### 2. Fuel & Hydration Module
- Log meals and snacks with macro tracking (protein, carbs, fats)
- Pre-run meal planner with timing recommendations
- Post-run recovery food suggestions based on run intensity
- Hydration tracker for water and sports drinks
- Runner-focused nutrition database with curated food items
- Community-shared recipes and nutrition tips

### 3. Rest & Recovery Section
- Sleep hours logging and trend analysis
- Muscle soreness scale tracking
- Recovery activity logging (stretching, yoga, foam rolling)
- Rest day planning with active recovery suggestions
- Gamified "Rest Score" that rewards proper recovery
- Injury tracker with healing progress monitoring
- Breathing and mindfulness exercises for post-run wind-down

### 4. Community & Social Layer
- Full account creation with runner profiles
- Activity feed for sharing runs, photos, and milestones
- Follow system to build your running network
- Like and comment on posts from other runners
- Direct messaging between runners
- Running groups for local and virtual communities
- Weekly/monthly leaderboards among friends or globally

### 5. RunMarket - Peer-to-Peer Marketplace
- List items for sale or free giveaway
- Browse shoes, gear, apparel, nutrition products, and accessories
- Offer and negotiation system for haggling
- Item swap/trade functionality
- Verified runner badges and transaction ratings
- Report system for safety and trust

### 6. Secure Checkout & Payments
- Stripe integration for peer-to-peer payments
- Buyer protection and seller verification
- Transaction history and receipts
- Dispute resolution system
- Rating and review system for buyers and sellers

### 7. Dashboard & Analytics
- Personal stats overview (total distance, active shoes, recent runs, current streak)
- Weekly and monthly running statistics
- Milestone badges and achievements
- Personal records display
- Activity trends and progress charts

### 8. Run Tracking & Logging
- GPS-based run tracking with live stats
- Real-time pace, distance, time, elevation, and cadence
- Route mapping and saving
- Shareable post-run summary cards
- Weekly and monthly stats dashboard
- Streak tracking and milestone badges

### 9. Route Mapping & Sharing
- Interactive map for drawing running routes
- Distance calculation and elevation data
- Save favorite routes for future runs
- Share routes with the community
- Discover popular routes from other runners
- Route difficulty ratings and reviews

### 10. AI-Powered Chat Assistant
- Personalized training plan suggestions
- Answer runner-specific questions
- Provide advice based on logged activity and goals
- Suggest recovery strategies
- Offer nutrition recommendations
- Motivational support and coaching

### 11. Leaderboards & Challenges
- Weekly and monthly distance leaderboards
- Friend-based competitions
- Global running challenges
- Seasonal events and competitions
- Achievement badges and milestones

### 12. Offline Support
- Run tracking works without connectivity
- Automatic sync when connection restored
- Cached data for offline access
- Local storage of user preferences

## Technology Stack

### Web Application
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **Backend**: Express.js with Node.js
- **API**: tRPC for end-to-end type safety
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Manus OAuth
- **Payments**: Stripe
- **Maps**: Google Maps API
- **Storage**: AWS S3 or Oracle Object Storage
- **Notifications**: Push notifications service

### Mobile Application
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: Zustand
- **API Client**: tRPC
- **Maps**: Google Maps for React Native
- **Authentication**: Manus OAuth
- **Payments**: Stripe for React Native
- **Storage**: Secure device storage

### Design System
- **Color Palette**: Electric Orange (#FF6B35), Deep Charcoal (#1A1A1A), White (#FFFFFF)
- **Typography**: Modern, athletic, clean
- **Components**: shadcn/ui with custom RunVerse styling
- **Responsive**: Mobile-first design approach

## Getting Started

### Web Application

```bash
cd runverse-web

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Start development server
pnpm dev

# Build for production
pnpm build
pnpm start
```

### Mobile Application

```bash
cd runverse-mobile

# Install dependencies
npm install

# Start development server
expo start

# Run on iOS
expo start --ios

# Run on Android
expo start --android

# Build for production
eas build --platform ios
eas build --platform android
```

## Database Schema

The application uses a comprehensive database schema supporting all features:

| Table | Purpose |
|-------|---------|
| users | Core user data and profiles |
| shoes | Running shoe inventory and tracking |
| runs | Run activity logs with GPS data |
| routes | Saved running routes |
| nutritionLogs | Meal and nutrition tracking |
| recoveryLogs | Sleep and recovery data |
| posts | Social feed posts |
| comments | Post comments |
| likes | Post likes |
| follows | User follow relationships |
| listings | Marketplace items |
| offers | Marketplace offers and negotiations |
| transactions | Purchase history and payments |
| messages | Direct messaging between users |

## API Documentation

The API is built with tRPC, providing end-to-end type safety. Key routers include:

- **shoes**: Shoe management (list, create, update)
- **runs**: Run tracking (list, create, public, stats)
- **nutrition**: Nutrition logging (list, create)
- **recovery**: Recovery tracking (list, create)
- **social**: Social features (posts, comments, follows)
- **marketplace**: Marketplace (listings, offers, transactions)
- **routes**: Route management (list, create, public)

## Authentication Flow

1. User initiates login via Manus OAuth
2. OAuth callback handler creates/updates user record
3. Session cookie is set with JWT token
4. Protected routes check authentication via `protectedProcedure`
5. User context is available in all procedures

## Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Component-based architecture
- Reusable utility functions

### Testing
- Unit tests with Vitest
- Component tests with React Testing Library
- Integration tests for API endpoints

### Performance
- Code splitting and lazy loading
- Image optimization
- Efficient database queries
- Caching strategies

### Security
- OAuth for authentication
- HTTPS only
- Secure token storage
- Input validation with Zod
- SQL injection prevention via ORM

## Deployment

### Web Application
- Deployed to Manus platform
- Automatic SSL/TLS
- CDN for static assets
- Database backups

### Mobile Application
- iOS: Deployed to App Store via TestFlight
- Android: Deployed to Google Play Store
- Over-the-air updates via Expo

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add your feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## Design Principles

### Visual Identity
- **Energetic & Athletic**: Bold, modern aesthetic
- **Clean & Minimal**: Unnecessary elements removed
- **Premium Spacing**: Generous padding and margins
- **Refined Typography**: Professional, sporty fonts
- **Polished Details**: Micro-interactions and transitions

### User Experience
- **Runner-Centric**: Every feature designed for runners
- **Intuitive Navigation**: Clear information hierarchy
- **Fast Performance**: Optimized for speed
- **Accessible**: WCAG 2.1 AA compliance
- **Mobile-First**: Responsive across all devices

## Roadmap

### Phase 1 (Current)
- Core platform launch
- Basic shoe tracking
- Run logging and GPS
- Social features
- Marketplace MVP

### Phase 2
- AI training plan generation
- Advanced analytics
- Wearable device integration
- Live group runs
- Training challenges

### Phase 3
- Apple Watch app
- Garmin sync
- Advanced coaching
- Professional athlete features
- API for third-party integrations

## Support

For support, feature requests, or bug reports:
- Email: support@runverse.com
- GitHub Issues: [Runverse-AI Issues](https://github.com/hvrcharon1/Runverse-AI/issues)
- Community Forum: [RunVerse Community](https://community.runverse.com)

## License

MIT License - See LICENSE file for details

## Acknowledgments

RunVerse is built by runners, for runners. We're grateful to the running community for inspiring this platform and helping us create something truly special.

---

**RunVerse: Where runners connect, train, and thrive.**

Built with ❤️ by the RunVerse team
