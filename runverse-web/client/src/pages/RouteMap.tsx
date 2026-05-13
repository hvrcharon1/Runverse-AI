import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Plus, MapPin, Trash2, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RouteMap() {
  const { user } = useAuth();
  const { data: routes, isLoading, refetch } = trpc.routes.list.useQuery();
  const createRoute = trpc.routes.create.useMutation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    distance: 0,
    difficulty: "easy",
    isPublic: false,
    gpsData: "{}",
    elevation: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRoute.mutateAsync({
        name: formData.name,
        distance: parseFloat(formData.distance as any),
        description: formData.description,
        difficulty: formData.difficulty as any,
        isPublic: formData.isPublic,
        gpsData: formData.gpsData,
        elevation: formData.elevation,
      });
      toast.success("Route created successfully!");
      setShowForm(false);
      setFormData({
        name: "",
        description: "",
        distance: 0,
        difficulty: "easy",
        isPublic: false,
        gpsData: "{}",
        elevation: 0,
      });
      refetch();
    } catch (error) {
      toast.error("Failed to create route");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="h-96 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Route Builder
            </h1>
            <p className="text-muted-foreground">
              Create, save, and share your favorite running routes
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Route
          </Button>
        </div>

        {/* Create Route Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Route Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Morning Run, Park Loop..."
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.distance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        distance: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your route..."
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Elevation (m)
                  </label>
                  <input
                    type="number"
                    value={formData.elevation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        elevation: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublic: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-foreground">
                      Make Public
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createRoute.isPending}>
                  {createRoute.isPending ? "Creating..." : "Create Route"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Routes Grid */}
        {routes && routes.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route: any) => (
              <Card key={route.id} className="p-6 hover:border-accent/50 transition-colors">
                {/* Map Placeholder */}
                <div className="w-full h-40 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-4 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-accent/40" />
                </div>

                {/* Route Info */}
                <h3 className="font-semibold text-foreground mb-2">
                  {route.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {route.description}
                </p>

                {/* Route Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-semibold text-foreground">
                      {route.distance} km
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-semibold text-foreground capitalize">
                      {route.difficulty}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Elevation</p>
                    <p className="font-semibold text-foreground">
                      {route.elevation} m
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  {route.isPublic && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                      Public
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <MapPin className="w-4 h-4" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No routes created yet. Start by creating your first route!
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create First Route
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
