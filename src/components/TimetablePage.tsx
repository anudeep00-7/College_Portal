import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const timetableData = {
  Monday: [
    { time: "09:00-10:30", subject: "Advanced Mathematics", room: "Room 301", professor: "Dr. Smith", type: "lecture" },
    { time: "11:00-12:30", subject: "Computer Science", room: "Lab 205", professor: "Prof. Johnson", type: "lab" },
    { time: "14:00-15:30", subject: "Physics", room: "Room 102", professor: "Dr. Wilson", type: "lecture" }
  ],
  Tuesday: [
    { time: "09:00-10:30", subject: "Data Structures", room: "Lab 301", professor: "Prof. Davis", type: "lab" },
    { time: "11:00-12:30", subject: "Linear Algebra", room: "Room 205", professor: "Dr. Brown", type: "lecture" },
    { time: "15:00-16:30", subject: "English Literature", room: "Room 401", professor: "Prof. Miller", type: "seminar" }
  ],
  Wednesday: [
    { time: "10:00-11:30", subject: "Database Systems", room: "Lab 105", professor: "Dr. Taylor", type: "lab" },
    { time: "13:00-14:30", subject: "Statistics", room: "Room 303", professor: "Prof. Anderson", type: "lecture" },
    { time: "15:00-16:30", subject: "Research Methods", room: "Room 202", professor: "Dr. Thomas", type: "seminar" }
  ],
  Thursday: [
    { time: "09:00-10:30", subject: "Software Engineering", room: "Lab 201", professor: "Prof. White", type: "lab" },
    { time: "11:00-12:30", subject: "Calculus II", room: "Room 301", professor: "Dr. Smith", type: "lecture" },
    { time: "14:00-15:30", subject: "Psychology", room: "Room 501", professor: "Dr. Garcia", type: "lecture" }
  ],
  Friday: [
    { time: "09:00-10:30", subject: "Machine Learning", room: "Lab 305", professor: "Dr. Lee", type: "lab" },
    { time: "11:00-12:30", subject: "Ethics in Technology", room: "Room 403", professor: "Prof. Martinez", type: "seminar" },
    { time: "13:00-14:30", subject: "Project Work", room: "Studio A", professor: "Team Leads", type: "project" }
  ],
  Saturday: [
    { time: "10:00-11:30", subject: "Workshop: Career Skills", room: "Auditorium", professor: "Industry Experts", type: "workshop" },
    { time: "14:00-16:00", subject: "Sports & Recreation", room: "Gymnasium", professor: "Coach Stevens", type: "activity" }
  ]
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "lecture": return "bg-neon-blue/20 text-neon-blue border-neon-blue/30";
    case "lab": return "bg-neon-green/20 text-neon-green border-neon-green/30";
    case "seminar": return "bg-neon-purple/20 text-neon-purple border-neon-purple/30";
    case "project": return "bg-neon-pink/20 text-neon-pink border-neon-pink/30";
    case "workshop": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "activity": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

export const TimetablePage = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState("Monday");

  const getCurrentWeekDates = () => {
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    return weekDays.map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index + (selectedWeek * 7));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Class Timetable
          </h1>
          <p className="text-muted-foreground mt-1">
            Your weekly academic schedule
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedWeek(selectedWeek - 1)}
              className="neon-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-4">
              Week {selectedWeek === 0 ? 'Current' : selectedWeek > 0 ? `+${selectedWeek}` : selectedWeek}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedWeek(selectedWeek + 1)}
              className="neon-border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "week" ? "neon" : "outline"}
              size="sm"
              onClick={() => setViewMode("week")}
            >
              Week View
            </Button>
            <Button
              variant={viewMode === "day" ? "neon" : "outline"}
              size="sm"
              onClick={() => setViewMode("day")}
            >
              Day View
            </Button>
          </div>
        </div>
      </div>

      {/* Week View */}
      {viewMode === "week" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {weekDays.map((day, index) => (
            <Card key={day} className="glass-card p-4 hover:neon-glow-blue transition-all duration-300">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-neon-blue">{day}</h3>
                <p className="text-sm text-muted-foreground">{weekDates[index]}</p>
              </div>
              
              <div className="space-y-2">
                {timetableData[day as keyof typeof timetableData]?.map((class_, classIndex) => (
                  <div
                    key={classIndex}
                    className={`p-3 rounded-lg border ${getTypeColor(class_.type)} transition-all duration-300 hover:scale-105 cursor-pointer`}
                  >
                    <div className="text-xs font-medium mb-1">{class_.time}</div>
                    <div className="text-sm font-semibold mb-1">{class_.subject}</div>
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {class_.room}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      {class_.professor}
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {class_.type}
                    </Badge>
                  </div>
                )) || (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    No classes scheduled
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Day View */}
      {viewMode === "day" && (
        <div className="space-y-4">
          {/* Day Selector */}
          <div className="flex items-center justify-center space-x-2">
            {weekDays.map((day, index) => (
              <Button
                key={day}
                variant={selectedDay === day ? "neon" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(day)}
                className="min-w-[100px]"
              >
                <div className="text-center">
                  <div className="text-sm">{day.slice(0, 3)}</div>
                  <div className="text-xs">{weekDates[index]}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Day Schedule */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-neon-blue" />
              {selectedDay} Schedule
            </h2>
            
            <div className="space-y-3">
              {timetableData[selectedDay as keyof typeof timetableData]?.map((class_, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getTypeColor(class_.type)} hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center text-sm font-medium">
                          <Clock className="h-4 w-4 mr-2" />
                          {class_.time}
                        </div>
                        <Badge variant="secondary">{class_.type}</Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{class_.subject}</h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {class_.room}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {class_.professor}
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              )) || (
                <div className="text-center text-muted-foreground py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No classes scheduled for {selectedDay}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Legend */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Class Types
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { type: "lecture", label: "Lectures" },
            { type: "lab", label: "Labs" },
            { type: "seminar", label: "Seminars" },
            { type: "project", label: "Projects" },
            { type: "workshop", label: "Workshops" },
            { type: "activity", label: "Activities" }
          ].map((item) => (
            <div key={item.type} className={`px-3 py-1 rounded-full border text-sm ${getTypeColor(item.type)}`}>
              {item.label}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};