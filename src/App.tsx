import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/components/LoginPage";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TimetablePage } from "@/components/TimetablePage";
import { MentalHealthPage } from "@/components/MentalHealthPage";
import { AssignmentsPage } from "@/components/AssignmentsPage";
import { DigitalLibraryPage } from "@/components/DigitalLibraryPage";
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
            <Route path="student" element={<StudentDashboard />} />
            <Route path="student/timetable" element={<TimetablePage />} />
            <Route path="student/assignments" element={<AssignmentsPage />} />
            <Route path="student/library" element={<DigitalLibraryPage />} />
            <Route path="student/wellness" element={<MentalHealthPage />} />
            <Route path="student/*" element={<StudentDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
