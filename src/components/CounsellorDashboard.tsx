import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Video,
  FileText
} from "lucide-react";

export const CounsellorDashboard = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-card p-6 neon-glow-pink">
        <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-muted-foreground">Counsellor Dashboard - Student Wellness & Support</p>
      </div>

      {/* Wellness Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card p-6 neon-glow-pink">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Cases</p>
              <p className="text-3xl font-bold text-neon-pink">47</p>
            </div>
            <Users className="h-8 w-8 text-neon-pink" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sessions Today</p>
              <p className="text-3xl font-bold text-neon-blue">8</p>
            </div>
            <Calendar className="h-8 w-8 text-neon-blue" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Improvement Rate</p>
              <p className="text-3xl font-bold text-neon-green">87%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-neon-green" />
          </div>
        </Card>

        <Card className="glass-card p-6 neon-glow-purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Forum Reports</p>
              <p className="text-3xl font-bold text-neon-purple">3</p>
            </div>
            <MessageSquare className="h-8 w-8 text-neon-purple" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-neon-blue" />
              Today's Appointments
            </h2>
            <Button size="sm" className="neon-border">Schedule New</Button>
          </div>
          <div className="space-y-3">
            {[
              { time: "09:00 AM", student: "Alex Thompson", type: "Initial Consultation", urgent: false },
              { time: "11:00 AM", student: "Sarah Wilson", type: "Follow-up", urgent: true },
              { time: "02:00 PM", student: "Mike Chen", type: "Stress Management", urgent: false },
              { time: "04:00 PM", student: "Emma Davis", type: "Academic Anxiety", urgent: false },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-neon-blue" />
                  <div>
                    <p className="font-medium flex items-center">
                      {appointment.student}
                      {appointment.urgent && <AlertCircle className="h-3 w-3 ml-2 text-neon-pink" />}
                    </p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-neon-blue">{appointment.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Urgent Cases */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-neon-pink" />
            Priority Cases
          </h2>
          <div className="space-y-3">
            {[
              { student: "Jane Doe", issue: "Severe anxiety", lastSeen: "2 days ago", priority: "high" },
              { student: "John Smith", issue: "Depression screening", lastSeen: "1 week ago", priority: "medium" },
              { student: "Lisa Brown", issue: "Academic stress", lastSeen: "3 days ago", priority: "medium" },
            ].map((case_item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <User className={`h-4 w-4 ${
                    case_item.priority === 'high' ? 'text-neon-pink' : 'text-neon-blue'
                  }`} />
                  <div>
                    <p className="font-medium">{case_item.student}</p>
                    <p className="text-sm text-muted-foreground">{case_item.issue}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs ${
                    case_item.priority === 'high' ? 'bg-neon-pink/20 text-neon-pink' : 'bg-neon-blue/20 text-neon-blue'
                  }`}>
                    {case_item.priority}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{case_item.lastSeen}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-pink">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">Schedule Session</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-blue">
            <Video className="h-6 w-6" />
            <span className="text-sm">Video Call</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-green">
            <Phone className="h-6 w-6" />
            <span className="text-sm">Crisis Hotline</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-purple">
            <MessageSquare className="h-6 w-6" />
            <span className="text-sm">Moderate Forum</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-pink">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Case Notes</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 neon-border hover:neon-glow-blue">
            <TrendingUp className="h-6 w-6" />
            <span className="text-sm">Analytics</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};