import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Calendar, MapPin, Edit2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Running enthusiast",
    location: "Earth",
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
  });

  const handleSave = async () => {
    try {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              Please log in to view your profile
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {formData.name}
              </h2>
              <p className="text-muted-foreground mb-4">{formData.bio}</p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4" />
                  {formData.email}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4" />
                  {formData.location}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4" />
                  Joined {formData.joinDate}
                </div>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Card>

            {/* Stats */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-foreground mb-4">
                Your Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Runs</span>
                  <span className="font-semibold text-foreground">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Distance</span>
                  <span className="font-semibold text-foreground">
                    342.5 km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Pace</span>
                  <span className="font-semibold text-foreground">5:45/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Followers</span>
                  <span className="font-semibold text-foreground">128</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {isEditing ? (
                <form className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="City, Country"
                      className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Full Name
                    </h3>
                    <p className="text-lg text-foreground">{formData.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Email
                    </h3>
                    <p className="text-lg text-foreground">{formData.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Bio
                    </h3>
                    <p className="text-lg text-foreground">{formData.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Location
                    </h3>
                    <p className="text-lg text-foreground">
                      {formData.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Member Since
                    </h3>
                    <p className="text-lg text-foreground">
                      {formData.joinDate}
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Preferences */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Preferences
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">
                    Receive email notifications
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">
                    Allow others to see my runs
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">
                    Show my stats on my profile
                  </span>
                </label>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
