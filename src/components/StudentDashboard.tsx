import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Bell,
  Clock,
  Target,
  Brain,
  Heart,
  Users,
  Award,
  Sparkles,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from "lucide-react";

const upcomingClasses = [
  { id: 1, subject: "Advanced Mathematics", time: "09:00 AM", room: "Room 301", status: "next" },
  { id: 2, subject: "Computer Science", time: "11:00 AM", room: "Lab 205", status: "upcoming" },
  { id: 3, subject: "Physics Lab", time: "02:00 PM", room: "Lab 102", status: "upcoming" },
];

const assignments = [
  { id: 1, title: "Calculus Problem Set", due: "Tomorrow", subject: "Mathematics", priority: "high" },
  { id: 2, title: "Python Project", due: "3 days", subject: "Computer Science", priority: "medium" },
  { id: 3, title: "Lab Report", due: "1 week", subject: "Physics", priority: "low" },
];

const notifications = [
  { id: 1, title: "New assignment uploaded", time: "2 hours ago", type: "assignment" },
  { id: 2, title: "Midterm results available", time: "1 day ago", type: "grade" },
  { id: 3, title: "Wellness workshop tomorrow", time: "2 days ago", type: "event" },
];

export const StudentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState({ username: "Student", role: "student" });
  const [selectedMood, setSelectedMood] = useState<string>("");

  // Get current user from localStorage
  useState(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Welcome back, {currentUser.username}! 
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to conquer your academic goals today?
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="neon-border">
            <Heart className="h-4 w-4 mr-2 text-neon-pink" />
            Mood Check
          </Button>
          <div className="relative">
            <Bell className="h-5 w-5 text-neon-blue" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-neon-green rounded-full text-xs flex items-center justify-center text-background">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Daily Mood Check-in */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-neon-pink" />
          Daily Mood Check-in
        </h2>
        <div className="grid grid-cols-5 gap-4 mb-4">
          {[
            { mood: "excellent", icon: "😊", label: "Excellent", color: "neon-green" },
            { mood: "good", icon: "🙂", label: "Good", color: "neon-blue" },
            { mood: "okay", icon: "😐", label: "Okay", color: "yellow-400" },
            { mood: "bad", icon: "😔", label: "Not Great", color: "orange-400" },
            { mood: "terrible", icon: "😢", label: "Terrible", color: "red-400" }
          ].map((item) => (
            <button
              key={item.mood}
              onClick={() => setSelectedMood(item.mood)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                selectedMood === item.mood
                  ? `border-${item.color} bg-${item.color}/10`
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium">{item.label}</p>
            </button>
          ))}
        </div>
        <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
          <p className="text-sm text-neon-blue">
            How are you feeling today? Your mental wellness is just as important as your academics! 💙
          </p>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-neon-blue" />
              Today's Schedule
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {upcomingClasses.map((class_) => (
              <div
                key={class_.id}
                className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  class_.status === "next"
                    ? "border-neon-blue bg-neon-blue/10 neon-glow-blue"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{class_.subject}</h3>
                    <p className="text-sm text-muted-foreground">{class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-neon-blue">{class_.time}</p>
                    {class_.status === "next" && (
                      <Badge variant="secondary" className="bg-neon-blue/20 text-neon-blue">
                        Next Class
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Assignments */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-neon-purple" />
              Assignments
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{assignment.title}</h4>
                    <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={assignment.priority === "high" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {assignment.due}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Study Suggestions */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Brain className="h-5 w-5 mr-2 text-neon-green" />
              AI Study Suggestions
            </h2>
            <Sparkles className="h-5 w-5 text-neon-green" />
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/30">
              <div className="flex items-start space-x-3">
                <PlayCircle className="h-5 w-5 text-neon-green mt-0.5" />
                <div>
                  <h4 className="font-medium text-neon-green">Recommended Video</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Advanced Calculus Explained" - Khan Academy
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-neon-green">
                    Watch Now →
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-neon-purple mt-0.5" />
                <div>
                  <h4 className="font-medium text-neon-purple">Study Plan</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Focus on derivatives for tomorrow's quiz
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-neon-purple">
                    View Plan →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Bell className="h-5 w-5 mr-2 text-neon-blue" />
              Recent Notifications
            </h2>
            <Button variant="ghost" size="sm">Mark All Read</Button>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};