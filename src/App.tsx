import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/components/LoginPage";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StudentDashboard } from "@/components/StudentDashboard";
import { FacultyDashboard } from "@/components/FacultyDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { CounsellorDashboard } from "@/components/CounsellorDashboard";
import { TimetablePage } from "@/components/TimetablePage";
import { MentalHealthPage } from "@/components/MentalHealthPage";
import { AssignmentsPage } from "@/components/AssignmentsPage";
import { DigitalLibraryPage } from "@/components/DigitalLibraryPage";
import { EventsPage } from "@/components/EventsPage";
import { ForumPage } from "@/components/ForumPage";
import { SkillsPage } from "@/components/SkillsPage";
import { SettingsPage } from "@/components/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            {/* Student Routes */}
            <Route path="student" element={<StudentDashboard />} />
            <Route path="student/timetable" element={<TimetablePage />} />
            <Route path="student/assignments" element={<AssignmentsPage />} />
            <Route path="student/library" element={<DigitalLibraryPage />} />
            <Route path="student/wellness" element={<MentalHealthPage />} />
            <Route path="student/skills" element={<SkillsPage />} />
            <Route path="student/events" element={<EventsPage />} />
            <Route path="student/forum" element={<ForumPage />} />
            <Route path="student/settings" element={<SettingsPage />} />
            
            {/* Faculty Routes */}
            <Route path="faculty" element={<FacultyDashboard />} />
            <Route path="faculty/courses" element={<div className="p-6 text-center">Faculty Courses - Coming Soon</div>} />
            <Route path="faculty/students" element={<div className="p-6 text-center">Student Management - Coming Soon</div>} />
            <Route path="faculty/materials" element={<DigitalLibraryPage />} />
            <Route path="faculty/grades" element={<div className="p-6 text-center">Grading System - Coming Soon</div>} />
            <Route path="faculty/forum" element={<ForumPage />} />
            <Route path="faculty/settings" element={<SettingsPage />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<div className="p-6 text-center">User Management - Coming Soon</div>} />
            <Route path="admin/analytics" element={<div className="p-6 text-center">Analytics Dashboard - Coming Soon</div>} />
            <Route path="admin/courses" element={<div className="p-6 text-center">Course Management - Coming Soon</div>} />
            <Route path="admin/reports" element={<div className="p-6 text-center">System Reports - Coming Soon</div>} />
            <Route path="admin/system" element={<div className="p-6 text-center">System Settings - Coming Soon</div>} />
            <Route path="admin/settings" element={<SettingsPage />} />
            
            {/* Counsellor Routes */}
            <Route path="counsellor" element={<CounsellorDashboard />} />
            <Route path="counsellor/appointments" element={<div className="p-6 text-center">Appointment Management - Coming Soon</div>} />
            <Route path="counsellor/cases" element={<div className="p-6 text-center">Case Management - Coming Soon</div>} />
            <Route path="counsellor/wellness" element={<MentalHealthPage />} />
            <Route path="counsellor/forum" element={<ForumPage />} />
            <Route path="counsellor/reports" element={<div className="p-6 text-center">Wellness Reports - Coming Soon</div>} />
            <Route path="counsellor/settings" element={<SettingsPage />} />
            
            {/* Default redirects */}
            <Route path="student/*" element={<StudentDashboard />} />
            <Route path="faculty/*" element={<FacultyDashboard />} />
            <Route path="admin/*" element={<AdminDashboard />} />
            <Route path="counsellor/*" element={<CounsellorDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
