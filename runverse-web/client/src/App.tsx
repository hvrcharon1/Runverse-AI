import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Shoes from "./pages/Shoes";
import Community from "./pages/Community";
import Marketplace from "./pages/Marketplace";
import Nutrition from "./pages/Nutrition";
import Recovery from "./pages/Recovery";
import AIChatAssistant from "./pages/AIChatAssistant";
import RouteMap from "./pages/RouteMap";
import Profile from "./pages/Profile";
import { useAuth } from "@/_core/hooks/useAuth";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Home />;
  }

  return <Component />;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/shoes" component={() => <ProtectedRoute component={Shoes} />} />
      <Route path="/community" component={() => <ProtectedRoute component={Community} />} />
      <Route path="/marketplace" component={() => <ProtectedRoute component={Marketplace} />} />
      <Route path="/nutrition" component={() => <ProtectedRoute component={Nutrition} />} />
      <Route path="/recovery" component={() => <ProtectedRoute component={Recovery} />} />
      <Route path="/ai-coach" component={() => <ProtectedRoute component={AIChatAssistant} />} />
      <Route path="/routes" component={() => <ProtectedRoute component={RouteMap} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
