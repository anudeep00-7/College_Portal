import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  BookOpen,
  Users,
  Heart,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Brain,
  FileText,
  MessageSquare,
  Shield,
  BarChart3,
  User
} from "lucide-react";

const getNavigationItems = (role: string) => {
  const baseItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: `/dashboard/${role}` },
  ];

  switch (role) {
    case "student":
      return [
        ...baseItems,
        { id: "timetable", label: "Timetable", icon: Calendar, path: "/dashboard/student/timetable" },
        { id: "assignments", label: "Assignments", icon: FileText, path: "/dashboard/student/assignments" },
        { id: "library", label: "Digital Library", icon: BookOpen, path: "/dashboard/student/library" },
        { id: "wellness", label: "Mental Health", icon: Heart, path: "/dashboard/student/wellness" },
        { id: "skills", label: "Skill Development", icon: Brain, path: "/dashboard/student/skills" },
        { id: "events", label: "Events & Clubs", icon: Users, path: "/dashboard/student/events" },
        { id: "forum", label: "Forum", icon: MessageSquare, path: "/dashboard/student/forum" },
      ];
    case "faculty":
      return [
        ...baseItems,
        { id: "courses", label: "My Courses", icon: BookOpen, path: "/dashboard/faculty/courses" },
        { id: "students", label: "Students", icon: Users, path: "/dashboard/faculty/students" },
        { id: "materials", label: "Course Materials", icon: FileText, path: "/dashboard/faculty/materials" },
        { id: "grades", label: "Grading", icon: Trophy, path: "/dashboard/faculty/grades" },
        { id: "forum", label: "Forum", icon: MessageSquare, path: "/dashboard/faculty/forum" },
      ];
    case "admin":
      return [
        ...baseItems,
        { id: "users", label: "User Management", icon: Users, path: "/dashboard/admin/users" },
        { id: "analytics", label: "Analytics", icon: BarChart3, path: "/dashboard/admin/analytics" },
        { id: "courses", label: "Course Management", icon: BookOpen, path: "/dashboard/admin/courses" },
        { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/admin/reports" },
        { id: "system", label: "System Settings", icon: Shield, path: "/dashboard/admin/system" },
      ];
    case "counsellor":
      return [
        ...baseItems,
        { id: "appointments", label: "Appointments", icon: Calendar, path: "/dashboard/counsellor/appointments" },
        { id: "cases", label: "Active Cases", icon: User, path: "/dashboard/counsellor/cases" },
        { id: "wellness", label: "Wellness Resources", icon: Heart, path: "/dashboard/counsellor/wellness" },
        { id: "forum", label: "Moderate Forum", icon: MessageSquare, path: "/dashboard/counsellor/forum" },
        { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/counsellor/reports" },
      ];
    default:
      return baseItems;
  }
};

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userRole = user.role || 'student';
  const navigationItems = getNavigationItems(userRole);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "student": return "Student Dashboard";
      case "faculty": return "Faculty Dashboard";
      case "admin": return "Admin Dashboard";
      case "counsellor": return "Counsellor Dashboard";
      default: return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg particle-bg">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="glass-card neon-glow-blue"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 glass-card transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-neon-blue mr-3" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                College Portal
              </h1>
              <p className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              return (
                <Button
                  key={item.id}
                  variant={active ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    active
                      ? "bg-gradient-neon text-background neon-glow-blue"
                      : "hover:bg-muted/50 hover:text-neon-blue"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <IconComponent className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start hover:text-neon-blue"
              onClick={() => navigate(`/dashboard/${userRole}/settings`)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="glass-card m-4 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold">{getRoleDisplayName(userRole)}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="neon-border">
                <Trophy className="h-4 w-4 mr-2 text-neon-green" />
                <span className="hidden sm:inline">Achievements</span>
              </Button>
              
              <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center">
                <span className="text-sm font-bold text-background">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};