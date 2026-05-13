import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Plus, AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Shoes() {
  const { user } = useAuth();
  const { data: shoes, isLoading, refetch } = trpc.shoes.list.useQuery();
  const createShoe = trpc.shoes.create.useMutation();
  const updateShoe = trpc.shoes.update.useMutation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    color: "",
    retirementMileage: 800,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createShoe.mutateAsync({
        ...formData,
        purchaseDate: new Date(formData.purchaseDate),
        retirementMileage: parseFloat(formData.retirementMileage as any),
      });
      toast.success("Shoe added successfully!");
      setShowForm(false);
      setFormData({
        brand: "",
        model: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        color: "",
        retirementMileage: 800,
      });
      refetch();
    } catch (error) {
      toast.error("Failed to add shoe");
    }
  };

  const handleMileageUpdate = async (shoeId: number, newMileage: number) => {
    try {
      await updateShoe.mutateAsync({
        id: shoeId,
        currentMileage: newMileage,
      });
      toast.success("Mileage updated!");
      refetch();
    } catch (error) {
      toast.error("Failed to update mileage");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-muted rounded-lg" />
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
              Shoe Locker
            </h1>
            <p className="text-muted-foreground">
              Track your running shoes and monitor mileage
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Shoe
          </Button>
        </div>

        {/* Add Shoe Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    placeholder="Nike, Adidas, Brooks..."
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    placeholder="Pegasus, Ultraboost..."
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseDate: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    placeholder="Black, White, Blue..."
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Retirement Mileage (km)
                  </label>
                  <input
                    type="number"
                    value={formData.retirementMileage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        retirementMileage: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createShoe.isPending}>
                  {createShoe.isPending ? "Adding..." : "Add Shoe"}
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

        {/* Shoes Grid */}
        {shoes && shoes.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {shoes.map((shoe) => {
              const mileage = parseFloat(shoe.currentMileage as any);
              const retirement = parseFloat(shoe.retirementMileage as any);
              const percentage = Math.min((mileage / retirement) * 100, 100);
              const isNearRetirement = percentage >= 80;
              const isRetired = percentage >= 100;

              return (
                <Card
                  key={shoe.id}
                  className={`p-6 ${
                    isRetired ? "border-destructive/50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {shoe.brand} {shoe.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {shoe.color}
                      </p>
                    </div>
                    {isNearRetirement && !isRetired && (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                    {isRetired && (
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    )}
                  </div>

                  {/* Mileage Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="text-sm font-semibold text-foreground">
                        {mileage.toFixed(1)} / {retirement.toFixed(0)} km
                      </p>
                    </div>
                    <div className="bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isRetired
                            ? "bg-destructive"
                            : isNearRetirement
                              ? "bg-yellow-500"
                              : "bg-accent"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {(100 - percentage).toFixed(0)}% remaining
                    </p>
                  </div>

                  {/* Status */}
                  {isRetired && (
                    <div className="mb-4 p-2 bg-destructive/10 rounded text-sm text-destructive">
                      Time to retire these shoes
                    </div>
                  )}
                  {isNearRetirement && !isRetired && (
                    <div className="mb-4 p-2 bg-yellow-500/10 rounded text-sm text-yellow-700">
                      Approaching retirement
                    </div>
                  )}

                  {/* Update Mileage */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Add Mileage
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="km"
                        id={`mileage-${shoe.id}`}
                        className="flex-1 px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById(
                            `mileage-${shoe.id}`
                          ) as HTMLInputElement;
                          if (input.value) {
                            handleMileageUpdate(
                              shoe.id,
                              mileage + parseFloat(input.value)
                            );
                            input.value = "";
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No shoes logged yet. Add your first pair to get started!
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Shoe
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
