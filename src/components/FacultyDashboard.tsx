import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar,
  FileText,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export const FacultyDashboard = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-card p-6 neon-glow-purple">
        <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-muted-foreground">Faculty Dashboard - Manage your classes and students</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card p-6 neon-glow-purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold text-neon-purple">156</p>
            </div>
            <Users className="h-8 w-8 text-neon-purple" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-3xl font-bold text-neon-blue">8</p>
            </div>
            <BookOpen className="h-8 w-8 text-neon-blue" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Grades</p>
              <p className="text-3xl font-bold text-neon-green">23</p>
            </div>
            <FileText className="h-8 w-8 text-neon-green" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-pink">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-3xl font-bold text-neon-pink">4.8</p>
            </div>
            <Award className="h-8 w-8 text-neon-pink" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-neon-blue" />
              Today's Classes
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { time: "09:00 AM", subject: "Advanced Mathematics", room: "Room 201", students: 45 },
              { time: "11:00 AM", subject: "Data Structures", room: "Lab 3", students: 38 },
              { time: "02:00 PM", subject: "Database Systems", room: "Room 105", students: 42 },
            ].map((class_item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-neon-blue" />
                  <div>
                    <p className="font-medium">{class_item.subject}</p>
                    <p className="text-sm text-muted-foreground">{class_item.room} • {class_item.students} students</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-neon-blue">{class_item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-neon-green" />
            Recent Activities
          </h2>
          <div className="space-y-3">
            {[
              { action: "Graded Assignment 3", course: "Data Structures", time: "2 hours ago", status: "completed" },
              { action: "Posted new material", course: "Advanced Math", time: "5 hours ago", status: "completed" },
              { action: "Review pending", course: "Database Systems", time: "1 day ago", status: "pending" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  {activity.status === "completed" ? 
                    <CheckCircle className="h-4 w-4 text-neon-green" /> :
                    <AlertCircle className="h-4 w-4 text-neon-pink" />
                  }
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.course}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-blue">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Upload Material</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-green">
            <Award className="h-6 w-6" />
            <span className="text-sm">Grade Papers</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-purple">
            <Users className="h-6 w-6" />
            <span className="text-sm">View Students</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-pink">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">Schedule Class</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};