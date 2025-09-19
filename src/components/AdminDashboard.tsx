import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Calendar,
  BarChart3,
  Settings,
  Database,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  BookOpen,
  Heart
} from "lucide-react";

export const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-card p-6 neon-glow-green">
        <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-muted-foreground">Admin Dashboard - System Management & Analytics</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card p-6 neon-glow-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold text-neon-blue">2,847</p>
            </div>
            <GraduationCap className="h-8 w-8 text-neon-blue" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faculty Members</p>
              <p className="text-3xl font-bold text-neon-purple">156</p>
            </div>
            <Users className="h-8 w-8 text-neon-purple" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-3xl font-bold text-neon-green">284</p>
            </div>
            <BookOpen className="h-8 w-8 text-neon-green" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-pink">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Health</p>
              <p className="text-3xl font-bold text-neon-pink">98%</p>
            </div>
            <Shield className="h-8 w-8 text-neon-pink" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-neon-green" />
            System Analytics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
              <span>Daily Active Users</span>
              <span className="text-neon-green font-bold">1,847</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
              <span>Mental Health Sessions</span>
              <span className="text-neon-pink font-bold">127</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
              <span>Assignment Submissions</span>
              <span className="text-neon-blue font-bold">2,456</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
              <span>Library Downloads</span>
              <span className="text-neon-purple font-bold">892</span>
            </div>
          </div>
        </Card>

        {/* System Alerts */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-neon-pink" />
            System Alerts
          </h2>
          <div className="space-y-3">
            {[
              { alert: "Server maintenance scheduled", priority: "high", time: "Today 2:00 PM" },
              { alert: "New user registrations spike", priority: "medium", time: "2 hours ago" },
              { alert: "Mental health module usage up 25%", priority: "info", time: "5 hours ago" },
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-4 w-4 ${
                    alert.priority === 'high' ? 'text-neon-pink' :
                    alert.priority === 'medium' ? 'text-neon-blue' : 'text-neon-green'
                  }`} />
                  <div>
                    <p className="font-medium">{alert.alert}</p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  alert.priority === 'high' ? 'bg-neon-pink/20 text-neon-pink' :
                  alert.priority === 'medium' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-neon-green/20 text-neon-green'
                }`}>
                  {alert.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Management Tools */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Management Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-blue">
            <Users className="h-6 w-6" />
            <span className="text-sm">Manage Users</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-purple">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm">Course Management</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-green">
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm">Analytics</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-pink">
            <Heart className="h-6 w-6" />
            <span className="text-sm">Mental Health</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-blue">
            <Settings className="h-6 w-6" />
            <span className="text-sm">System Config</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-green">
            <Database className="h-6 w-6" />
            <span className="text-sm">Database</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};