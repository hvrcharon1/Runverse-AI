import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, MapPin, Flame, ShoppingBag, Brain } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RunVerse</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <a href="#" onClick={() => window.location.href = '/'} >
                  <Button variant="ghost">Dashboard</Button>
                </a>
              </>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="ghost">Sign In</Button>
                </a>
                <a href={getLoginUrl()}>
                  <Button>Get Started</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Your Running <span className="text-accent">Community</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Track your shoes, fuel your body, recover smarter, and connect with runners worldwide. RunVerse is the complete ecosystem built by runners, for runners.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getLoginUrl()}>
                <Button size="lg" className="gap-2">
                  Start Running <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-accent">50K+</p>
                <p className="text-sm text-muted-foreground">Active Runners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">2M+</p>
                <p className="text-sm text-muted-foreground">Miles Tracked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">100%</p>
                <p className="text-sm text-muted-foreground">Runner-Built</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-24 h-24 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">Your running journey starts here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From tracking your shoes to connecting with the community, RunVerse has it all.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Shoe Tracking */}
          <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Shoe Locker</h3>
            <p className="text-muted-foreground mb-4">
              Track every pair of shoes, monitor mileage, and get retirement alerts when they reach their limit.
            </p>
            <div className="text-sm text-accent font-medium">Learn more →</div>
          </div>

          {/* Nutrition */}
          <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Fuel & Hydration</h3>
            <p className="text-muted-foreground mb-4">
              Log meals, track macros, and access runner-focused nutrition guides for optimal performance.
            </p>
            <div className="text-sm text-accent font-medium">Learn more →</div>
          </div>

          {/* Recovery */}
          <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Recovery Hub</h3>
            <p className="text-muted-foreground mb-4">
              Log sleep, rest days, and recovery activities. Get a personalized wellness score.
            </p>
            <div className="text-sm text-accent font-medium">Learn more →</div>
          </div>

          {/* Community */}
          <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Community</h3>
            <p className="text-muted-foreground mb-4">
              Share your runs, follow other runners, and build connections with your local running community.
            </p>
            <div className="text-sm text-accent font-medium">Learn more →</div>
          </div>

          {/* Marketplace */}
          <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">RunMarket</h3>
            <p className="text-muted-foreground mb-4">
              Buy, sell, and trade running gear with other runners. Secure peer-to-peer transactions.
            </p>
            <div className="text-sm text-accent font-medium">Learn more →</div>
          </div>

          {/* Routes */}
          <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Route Maps</h3>
            <p className="text-muted-foreground mb-4">
              Draw, save, and share running routes with elevation data and distance calculations.
            </p>
            <div className="text-sm text-accent font-medium">Learn more →</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="container py-20">
        <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-accent-foreground mb-4">
            Ready to Join the RunVerse?
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Start tracking your runs, connect with runners, and become part of the most comprehensive running ecosystem.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-bold text-foreground">RunVerse</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete running ecosystem built by runners, for runners.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-accent transition">Features</a></li>
                <li><a href="#" className="hover:text-accent transition">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">About</a></li>
                <li><a href="#" className="hover:text-accent transition">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Privacy</a></li>
                <li><a href="#" className="hover:text-accent transition">Terms</a></li>
                <li><a href="#" className="hover:text-accent transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 RunVerse. Built by runners, for runners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
