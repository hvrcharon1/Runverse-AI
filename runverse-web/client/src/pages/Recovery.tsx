import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Plus, Moon, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Recovery() {
  const { user } = useAuth();
  const { data: logs, isLoading, refetch } = trpc.recovery.list.useQuery();
  const createLog = trpc.recovery.create.useMutation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    activityType: "rest",
    duration: 0,
    notes: "",
    sleepHours: 0,
    sleepQuality: "good",
    loggedAt: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLog.mutateAsync({
        loggedAt: new Date(formData.loggedAt),
        sleepHours: formData.sleepHours,
        recoveryActivities: formData.activityType ? [formData.activityType] : [],
        isRestDay: formData.activityType === 'rest',
        notes: formData.notes,
      });
      toast.success("Recovery logged successfully!");
      setShowForm(false);
      setFormData({
        activityType: "rest",
        duration: 0,
        notes: "",
        sleepHours: 0,
        sleepQuality: "good",
        loggedAt: new Date().toISOString().split("T")[0],
      });
      refetch();
    } catch (error) {
      toast.error("Failed to log recovery");
    }
  };

  const wellnessScore = Math.min(
    100,
    (logs?.reduce((sum: number, log: any) => sum + (log.sleepHours || 0) * 10, 0) || 0) +
      (logs?.length || 0) * 5
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
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
              Recovery Hub
            </h1>
            <p className="text-muted-foreground">
              Track rest, sleep, and recovery activities
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Log Recovery
          </Button>
        </div>

        {/* Wellness Score */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Wellness Score
              </h3>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.round(wellnessScore)}
            </p>
            <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-accent h-full transition-all"
                style={{ width: `${wellnessScore}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Avg Sleep
              </h3>
              <Moon className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {logs && logs.length > 0
                ? (
                    logs.reduce((sum: number, log: any) => sum + (log.sleepHours || 0), 0) /
                    logs.length
                  ).toFixed(1)
                : "0"}
              <span className="text-lg text-muted-foreground ml-2">hrs</span>
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Recovery Days
              </h3>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {logs?.filter((l: any) => l.isRestDay).length || 0}
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
                    Activity Type
                  </label>
                  <select
                    value={formData.activityType}
                    onChange={(e) =>
                      setFormData({ ...formData, activityType: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="rest">Rest Day</option>
                    <option value="yoga">Yoga</option>
                    <option value="stretching">Stretching</option>
                    <option value="massage">Massage</option>
                    <option value="ice_bath">Ice Bath</option>
                    <option value="foam_roll">Foam Rolling</option>
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

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Sleep Hours
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.sleepHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sleepHours: parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Sleep Quality
                  </label>
                  <select
                    value={formData.sleepQuality}
                    onChange={(e) =>
                      setFormData({ ...formData, sleepQuality: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="How are you feeling?"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createLog.isPending}>
                  {createLog.isPending ? "Logging..." : "Log Recovery"}
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

        {/* Recovery Logs */}
        {logs && logs.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Recovery Log</h2>
            {logs.map((log: any) => (
              <Card key={log.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded capitalize">
                        {log.activityType}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.loggedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {log.notes && (
                      <p className="text-foreground mb-3">{log.notes}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {log.duration > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">
                        {log.duration} min
                      </p>
                    </div>
                  )}
                  {log.sleepHours > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground">Sleep</p>
                      <p className="font-semibold text-foreground">
                        {log.sleepHours} hrs
                      </p>
                    </div>
                  )}
                  {log.sleepQuality && (
                    <div>
                      <p className="text-xs text-muted-foreground">Quality</p>
                      <p className="font-semibold text-foreground capitalize">
                        {log.sleepQuality}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No recovery logged yet. Start tracking your rest!
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Log First Recovery
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
