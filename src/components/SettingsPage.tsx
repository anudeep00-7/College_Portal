import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Moon,
  Sun,
  Camera,
  Save,
  Eye,
  EyeOff
} from "lucide-react";

export const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    assignments: true,
    events: false,
    forum: true,
    wellness: true
  });

  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [profile, setProfile] = useState({
    username: user.username || '',
    email: 'student@college.edu',
    fullName: 'Alex Thompson',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student passionate about web development and mental health advocacy.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      ...JSON.parse(localStorage.getItem('currentUser') || '{}'),
      username: profile.username
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 neon-glow-blue">
        <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-neon-blue" />
              Profile Information
            </h2>
            
            {/* Profile Picture */}
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20 bg-gradient-neon flex items-center justify-center text-background text-2xl font-bold">
                {profile.username.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <Button variant="outline" className="neon-border">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                />
              </div>

              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full mt-1 p-3 rounded-lg bg-muted/50 border border-border focus:border-neon-blue resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <Button onClick={handleSaveProfile} className="mt-4 neon-glow-green">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </Card>

          {/* Security Settings */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-neon-green" />
              Security & Privacy
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={profile.currentPassword}
                    onChange={(e) => setProfile(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="bg-muted/50 border-border focus:border-neon-blue pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <Button variant="outline" className="neon-border">
                Update Password
              </Button>
            </div>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-4">
          {/* Appearance */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Palette className="h-4 w-4 mr-2 text-neon-purple" />
              Appearance
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="text-sm">Dark Mode</span>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Bell className="h-4 w-4 mr-2 text-neon-blue" />
              Notifications
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(value) => handleNotificationChange('email', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(value) => handleNotificationChange('push', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Assignment Reminders</span>
                <Switch
                  checked={notifications.assignments}
                  onCheckedChange={(value) => handleNotificationChange('assignments', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Event Updates</span>
                <Switch
                  checked={notifications.events}
                  onCheckedChange={(value) => handleNotificationChange('events', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Forum Activity</span>
                <Switch
                  checked={notifications.forum}
                  onCheckedChange={(value) => handleNotificationChange('forum', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Wellness Reminders</span>
                <Switch
                  checked={notifications.wellness}
                  onCheckedChange={(value) => handleNotificationChange('wellness', value)}
                />
              </div>
            </div>
          </Card>

          {/* Account Stats */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Account Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Member Since</span>
                <span className="text-neon-blue">Sep 2023</span>
              </div>
              <div className="flex justify-between">
                <span>Login Streak</span>
                <span className="text-neon-green">12 days</span>
              </div>
              <div className="flex justify-between">
                <span>Forum Posts</span>
                <span className="text-neon-purple">23</span>
              </div>
              <div className="flex justify-between">
                <span>Achievements</span>
                <span className="text-neon-pink">8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};