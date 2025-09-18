import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Upload,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  BookOpen,
  Star,
  Send
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Calculus Integration Problems",
    subject: "Advanced Mathematics",
    dueDate: "2024-01-20",
    dueTime: "11:59 PM",
    status: "pending",
    priority: "high",
    totalMarks: 100,
    description: "Solve the given integration problems and show all working steps.",
    submitted: false,
    grade: null,
    feedback: null
  },
  {
    id: 2,
    title: "Python Data Structures Project",
    subject: "Computer Science",
    dueDate: "2024-01-25",
    dueTime: "11:59 PM",
    status: "in-progress",
    priority: "medium",
    totalMarks: 150,
    description: "Implement various data structures using Python programming language.",
    submitted: false,
    grade: null,
    feedback: null
  },
  {
    id: 3,
    title: "Physics Lab Report - Wave Motion",
    subject: "Physics",
    dueDate: "2024-01-15",
    dueTime: "11:59 PM",
    status: "submitted",
    priority: "low",
    totalMarks: 50,
    description: "Complete lab report on wave motion experiment conducted last week.",
    submitted: true,
    grade: 45,
    feedback: "Good analysis but needs more detailed conclusion."
  },
  {
    id: 4,
    title: "Literature Essay - Modern Poetry",
    subject: "English Literature",
    dueDate: "2024-01-18",
    dueTime: "11:59 PM",
    status: "graded",
    priority: "medium",
    totalMarks: 75,
    description: "Write a critical essay on modern poetry movements.",
    submitted: true,
    grade: 68,
    feedback: "Excellent analysis of themes. Consider strengthening arguments with more examples."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "in-progress": return "bg-neon-blue/20 text-neon-blue border-neon-blue/30";
    case "submitted": return "bg-neon-green/20 text-neon-green border-neon-green/30";
    case "graded": return "bg-neon-purple/20 text-neon-purple border-neon-purple/30";
    case "overdue": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "text-red-400";
    case "medium": return "text-yellow-400";
    case "low": return "text-green-400";
    default: return "text-muted-foreground";
  }
};

export const AssignmentsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = selectedFilter === "all" || assignment.status === selectedFilter;
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in-progress": return <FileText className="h-4 w-4" />;
      case "submitted": return <CheckCircle className="h-4 w-4" />;
      case "graded": return <Star className="h-4 w-4" />;
      case "overdue": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Assignments & Tasks
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your academic assignments and track progress
          </p>
        </div>
        
        <Button variant="neon">
          <Upload className="h-4 w-4 mr-2" />
          Submit Assignment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-neon-blue">{assignments.length}</p>
            </div>
            <FileText className="h-8 w-8 text-neon-blue" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-orange-400">
                {assignments.filter(a => a.status === "pending").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-400" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Submitted</p>
              <p className="text-2xl font-bold text-neon-green">
                {assignments.filter(a => a.status === "submitted" || a.status === "graded").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-neon-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Grade</p>
              <p className="text-2xl font-bold text-neon-purple">
                {Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade! / a.totalMarks * 100), 0) / assignments.filter(a => a.grade).length) || 0}%
              </p>
            </div>
            <Star className="h-8 w-8 text-neon-purple" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "in-progress", label: "In Progress" },
            { id: "submitted", label: "Submitted" },
            { id: "graded", label: "Graded" }
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "neon" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          const isOverdue = daysUntilDue < 0 && assignment.status !== "submitted" && assignment.status !== "graded";
          
          return (
            <Card
              key={assignment.id}
              className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedAssignment === assignment.id ? "ring-2 ring-neon-blue neon-glow-blue" : ""
              } ${isOverdue ? "ring-1 ring-red-400" : ""}`}
              onClick={() => setSelectedAssignment(assignment.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                  <p className="text-sm text-neon-blue mb-2">{assignment.subject}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`${getPriorityColor(assignment.priority)} border text-xs`}>
                    {assignment.priority}
                  </Badge>
                  <div className={`px-2 py-1 rounded border text-xs ${getStatusColor(isOverdue ? "overdue" : assignment.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(isOverdue ? "overdue" : assignment.status)}
                      <span>{isOverdue ? "Overdue" : assignment.status.replace("-", " ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {assignment.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()} at {assignment.dueTime}
                  </div>
                  <div className="text-right">
                    {daysUntilDue > 0 ? (
                      <span className="text-neon-green">{daysUntilDue} days left</span>
                    ) : daysUntilDue === 0 ? (
                      <span className="text-yellow-400">Due today</span>
                    ) : assignment.status === "submitted" || assignment.status === "graded" ? (
                      <span className="text-neon-green">Submitted</span>
                    ) : (
                      <span className="text-red-400">{Math.abs(daysUntilDue)} days overdue</span>
                    )}
                  </div>
                </div>

                {assignment.grade !== null && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Grade:</span>
                      <span className="font-semibold text-neon-purple">
                        {assignment.grade}/{assignment.totalMarks} ({Math.round(assignment.grade / assignment.totalMarks * 100)}%)
                      </span>
                    </div>
                    <Progress value={assignment.grade / assignment.totalMarks * 100} className="h-2" />
                    {assignment.feedback && (
                      <div className="bg-neon-purple/10 border border-neon-purple/30 rounded p-3">
                        <p className="text-xs text-neon-purple font-medium mb-1">Feedback:</p>
                        <p className="text-xs text-muted-foreground">{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  {assignment.status === "pending" || assignment.status === "in-progress" ? (
                    <>
                      <Button variant="neon" size="sm" className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <Card className="glass-card p-12 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search terms" : "No assignments match the selected filter"}
          </p>
        </Card>
      )}
    </div>
  );
};