# RunVerse Mobile App

A comprehensive cross-platform running application built with React Native and Expo, providing runners with tools to track shoes, nutrition, recovery, and connect with the running community.

## Features

- **Shoe Tracking**: Log and monitor running shoes with mileage tracking and retirement alerts
- **Run Logging**: Track distance, pace, elevation, and cadence with GPS data
- **Nutrition Tracking**: Log meals and track macros with runner-focused dietary guidance
- **Recovery Management**: Log sleep, rest days, and recovery activities with wellness scoring
- **Social Community**: Share runs, follow other runners, like and comment on posts
- **RunMarket**: Buy, sell, and trade running gear with other runners
- **Route Mapping**: Draw, save, and share running routes with elevation data
- **AI Assistant**: Get personalized training plans and running advice
- **Leaderboards**: Compete with friends and the global running community

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux or Zustand
- **Navigation**: React Navigation
- **API**: tRPC client for backend communication
- **Authentication**: Manus OAuth
- **Maps**: Google Maps API
- **Payments**: Stripe for marketplace transactions

## Project Structure

```
runverse-mobile/
├── app/                    # Expo Router navigation
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # Feature screens
│   ├── hooks/              # Custom hooks
│   ├── store/              # State management
│   ├── services/           # API and external services
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
├── assets/                 # Images, fonts, etc.
├── app.json               # Expo configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator or Android Emulator

### Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
expo start

# Run on iOS simulator
expo start --ios

# Run on Android emulator
expo start --android
```

## Core Modules

### Authentication
- Manus OAuth integration
- Secure token storage
- Session management
- Protected routes

### Shoe Tracking
- Create and manage shoe inventory
- Track mileage per shoe
- Retirement alerts at 500-800km
- Shoe history and statistics

### Run Logging
- GPS-based tracking
- Real-time stats (pace, distance, elevation)
- Route saving and sharing
- Activity history

### Nutrition Module
- Meal logging with macro tracking
- Pre/during/post-run recommendations
- Hydration tracking
- Nutrition history

### Recovery Hub
- Sleep logging
- Rest day tracking
- Recovery activity logging
- Wellness score calculation

### Social Features
- Activity feed
- Follow/unfollow system
- Like and comment on posts
- Direct messaging
- Running groups

### RunMarket
- Listing creation and browsing
- Offer and negotiation system
- Secure checkout with Stripe
- Transaction history and ratings

### Route Mapping
- Interactive map drawing
- Distance calculation
- Elevation data
- Route sharing

### AI Assistant
- Training plan suggestions
- Personalized advice
- Q&A capabilities
- Activity-based recommendations

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Both
eas build
```

### Submitting to App Stores

```bash
# Submit to TestFlight and App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

## Environment Variables

Create a `.env.local` file:

```
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
EXPO_PUBLIC_OAUTH_CLIENT_ID=your-client-id
```

## API Integration

The mobile app connects to the RunVerse backend via tRPC. All API calls are authenticated using Manus OAuth tokens stored securely in device storage.

### Example API Call

```typescript
import { trpc } from '@/services/trpc';

// Get user's shoes
const { data: shoes } = trpc.shoes.list.useQuery();

// Create a new run
const createRun = trpc.runs.create.useMutation();
await createRun.mutateAsync({
  distance: 5.2,
  duration: 1800,
  pace: '5:45',
});
```

## Security

- All sensitive data is stored in secure device storage
- OAuth tokens are refreshed automatically
- API calls are made over HTTPS only
- Payment data is handled by Stripe (PCI compliant)
- User passwords are never stored locally

## Performance Optimization

- Lazy loading of screens
- Image caching and optimization
- Efficient list rendering with FlatList
- Background sync for offline support
- Code splitting and bundle optimization

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

MIT

## Support

For support, email support@runverse.com or visit our community forum.

## Roadmap

- [ ] Apple Watch integration
- [ ] Garmin device sync
- [ ] Advanced analytics dashboard
- [ ] Training plan marketplace
- [ ] Live group runs
- [ ] AR running experience
- [ ] Voice coaching
- [ ] Wearable notifications

## Acknowledgments

Built by runners, for runners. RunVerse is a community-driven platform dedicated to making running more enjoyable, connected, and rewarding.
