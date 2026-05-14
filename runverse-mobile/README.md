# RunVerse Mobile App

A React Native/Expo mobile application for the RunVerse running platform. Track your runs, connect with runners worldwide, and optimize your training with our comprehensive running ecosystem.

## Features

- **Dashboard**: Personal stats overview with distance, shoes, runs, and streaks
- **Shoe Tracking**: Log running shoes, track mileage, and receive retirement alerts
- **Nutrition**: Log meals, track macros, and access runner-focused dietary tips
- **Recovery**: Track rest days, sleep, recovery activities, and wellness score
- **Community**: Social feed to share runs, like, comment, and follow other runners
- **Marketplace**: Browse and list used running gear with peer-to-peer trading
- **Routes**: Create, save, and share running routes with distance and elevation data
- **AI Coach**: Personalized training plans and running advice powered by AI
- **Profile**: Manage user profile, settings, and view running statistics

## Prerequisites

- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (macOS) or Android Emulator
- Expo Go app (for testing on physical devices)

## Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

## Running the App

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser
```bash
npm run web
```

### Physical Device
1. Install Expo Go from App Store or Google Play
2. Scan the QR code from the terminal after running `npm start`

## Project Structure

```
runverse-mobile/
├── App.tsx                 # Main app entry point with navigation
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── src/
│   ├── screens/           # Feature screens
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── ShoesScreen.tsx
│   │   ├── NutritionScreen.tsx
│   │   ├── RecoveryScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── MarketplaceScreen.tsx
│   │   ├── RoutesScreen.tsx
│   │   ├── AIChatScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/        # Reusable UI components
│   ├── navigation/        # Navigation configuration
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
└── assets/               # Images and static assets
```

## Key Technologies

- **React Native**: Cross-platform mobile development
- **Expo**: Managed React Native framework
- **React Navigation**: Navigation library for mobile
- **Ionicons**: Icon library
- **TypeScript**: Type-safe development

## Authentication

The app uses Manus OAuth for secure authentication. Users can sign in with their Manus account or create a new one.

## API Integration

The mobile app connects to the RunVerse backend API for:
- User authentication and profile management
- Run logging and tracking
- Shoe management and retirement alerts
- Nutrition and recovery data
- Community posts and interactions
- Marketplace listings and transactions
- Route creation and sharing
- AI-powered coaching

## Development Guidelines

### Adding a New Screen

1. Create a new file in `src/screens/FeatureName.tsx`
2. Implement the screen component with proper styling
3. Add the route to the navigation in `App.tsx`
4. Use consistent color scheme and typography

### Styling

- Use React Native StyleSheet for performance
- Follow the RunVerse design system:
  - Primary color: #EF4444 (Electric Orange)
  - Background: #FFFFFF (White)
  - Text: #1F2937 (Dark Charcoal)
  - Accents: #10B981, #3B82F6, #F59E0B

### State Management

Currently using React hooks. For complex state, consider migrating to Redux or Zustand.

## Testing

```bash
# Run tests (if configured)
npm test
```

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## Deployment

Use Expo Application Services (EAS) for building and deploying:

```bash
eas build
eas submit
```

## Troubleshooting

### Port Already in Use
```bash
lsof -ti:19000 | xargs kill -9
```

### Clear Cache
```bash
expo start -c
```

### Reset Dependencies
```bash
rm -rf node_modules && npm install
```

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on the GitHub repository or contact support@runverse.com

## Roadmap

- [ ] Offline mode support
- [ ] Push notifications
- [ ] Wearable integration (Apple Watch, Wear OS)
- [ ] Advanced analytics and insights
- [ ] Social challenges and competitions
- [ ] Integration with popular running apps (Strava, MapMyRun)
