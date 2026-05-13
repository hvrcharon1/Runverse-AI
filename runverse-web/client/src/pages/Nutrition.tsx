import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Plus, Flame, Droplet, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Nutrition() {
  const { user } = useAuth();
  const { data: logs, isLoading, refetch } = trpc.nutrition.list.useQuery();
  const createLog = trpc.nutrition.create.useMutation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mealType: "breakfast",
    description: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    loggedAt: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLog.mutateAsync({
        mealType: formData.mealType as any,
        foodItems: [{ name: formData.description, quantity: '1' }],
        loggedAt: new Date(formData.loggedAt),
        calories: formData.calories,
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat,
      });
      toast.success("Meal logged successfully!");
      setShowForm(false);
      setFormData({
        mealType: "breakfast",
        description: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        loggedAt: new Date().toISOString().split("T")[0],
      });
      refetch();
    } catch (error) {
      toast.error("Failed to log meal");
    }
  };

  const totalCalories = logs?.reduce((sum: number, log: any) => sum + (log.calories || 0), 0) || 0;
  const totalProtein = logs?.reduce((sum: number, log: any) => sum + (log.protein || 0), 0) || 0;
  const totalCarbs = logs?.reduce((sum: number, log: any) => sum + (log.carbs || 0), 0) || 0;
  const totalFat = logs?.reduce((sum: number, log: any) => sum + (log.fat || 0), 0) || 0;

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Nutrition Tracker
            </h1>
            <p className="text-muted-foreground">
              Track your meals and monitor macronutrients
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Log Meal
          </Button>
        </div>

        {/* Macro Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Calories
              </h3>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.round(totalCalories)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">kcal today</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Protein
              </h3>
              <Zap className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.round(totalProtein)}g
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalProtein / totalCalories) * 100 * 4)}% of calories
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Carbs
              </h3>
              <Droplet className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.round(totalCarbs)}g
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalCarbs / totalCalories) * 100 * 4)}% of calories
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Fat</h3>
              <Flame className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.round(totalFat)}g
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalFat / totalCalories) * 100 * 9)}% of calories
            </p>
          </Card>
        </div>

        {/* Log Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Meal Type
                  </label>
                  <select
                    value={formData.mealType}
                    onChange={(e) =>
                      setFormData({ ...formData, mealType: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.loggedAt}
                    onChange={(e) =>
                      setFormData({ ...formData, loggedAt: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
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
                  placeholder="What did you eat?"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        calories: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={formData.protein}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        protein: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={formData.carbs}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        carbs: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={formData.fat}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fat: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createLog.isPending}>
                  {createLog.isPending ? "Logging..." : "Log Meal"}
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

        {/* Meal Logs */}
        {logs && logs.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Today's Meals</h2>
            {logs.map((log: any) => (
              <Card key={log.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded capitalize">
                        {log.mealType}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.loggedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="font-medium text-foreground mb-3">
                      {log.description}
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Calories</p>
                        <p className="font-semibold text-foreground">
                          {log.calories}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Protein</p>
                        <p className="font-semibold text-foreground">
                          {log.protein}g
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                        <p className="font-semibold text-foreground">
                          {log.carbs}g
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Fat</p>
                        <p className="font-semibold text-foreground">
                          {log.fat}g
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No meals logged yet. Start tracking your nutrition!
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Log First Meal
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
