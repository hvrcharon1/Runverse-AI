import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Activity, Flame, TrendingUp, Award, Plus } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: stats, isLoading } = trpc.runs.stats.useQuery();
  const { data: shoes } = trpc.shoes.list.useQuery();
  const { data: recentRuns } = trpc.runs.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's your running summary for this month
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Distance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Distance
              </h3>
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats?.totalDistance || 0}
              <span className="text-lg text-muted-foreground ml-2">km</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This month
            </p>
          </Card>

          {/* Total Runs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Runs
              </h3>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats?.totalRuns || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Runs logged
            </p>
          </Card>

          {/* Active Shoes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Active Shoes
              </h3>
              <Flame className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats?.activeShoes || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Shoes in rotation
            </p>
          </Card>

          {/* Current Streak */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Current Streak
              </h3>
              <Award className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              7
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Days running
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Log Run */}
          <Link href="/runs/new">
            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Log a Run</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your activity
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Log Nutrition */}
          <Link href="/nutrition/new">
            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Log Nutrition</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your meals
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Log Recovery */}
          <Link href="/recovery/new">
            <Card className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Log Recovery</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your rest
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Runs */}
          <Card className="p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Runs
              </h2>
              <Link href="/runs">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentRuns && recentRuns.length > 0 ? (
                recentRuns.slice(0, 5).map((run) => (
                  <div key={run.id} className="flex items-center justify-between pb-4 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">
                        {run.distance} km run
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(run.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">
                        {run.pace}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(run.duration / 60)}m
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No runs logged yet. Start by logging your first run!
                </p>
              )}
            </div>
          </Card>

          {/* Shoes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Your Shoes
              </h2>
              <Link href="/shoes/new">
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {shoes && shoes.length > 0 ? (
                shoes.slice(0, 3).map((shoe) => (
                  <div key={shoe.id} className="pb-4 border-b border-border last:border-0">
                    <p className="font-medium text-foreground">
                      {shoe.brand} {shoe.model}
                    </p>
                    <div className="mt-2 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full transition-all"
                        style={{
                          width: `${Math.min(
                            (parseFloat(shoe.currentMileage as any) /
                              parseFloat(shoe.retirementMileage as any)) *
                            100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {parseFloat(shoe.currentMileage as any).toFixed(1)} /{" "}
                      {parseFloat(shoe.retirementMileage as any).toFixed(0)} km
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No shoes logged yet. Add your first pair!
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
