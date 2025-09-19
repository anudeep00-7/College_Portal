import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Trophy, 
  BookOpen,
  Clock,
  Star,
  Briefcase,
  Award,
  TrendingUp,
  Users,
  Play,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export const SkillsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "technical", label: "Technical" },
    { id: "soft-skills", label: "Soft Skills" },
    { id: "leadership", label: "Leadership" },
    { id: "creative", label: "Creative" },
  ];

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      provider: "TechEd Academy",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1250,
      price: "Free",
      category: "technical",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      progress: 65,
      isEnrolled: true,
      thumbnail: "💻"
    },
    {
      id: 2,
      title: "Leadership & Communication",
      provider: "Business Skills Pro",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 890,
      price: "$99",
      category: "soft-skills",
      skills: ["Communication", "Team Management", "Public Speaking"],
      progress: 0,
      isEnrolled: false,
      thumbnail: "👥"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      provider: "Design Masters",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 2100,
      price: "Free",
      category: "creative",
      skills: ["Figma", "User Research", "Prototyping", "Design Thinking"],
      progress: 30,
      isEnrolled: true,
      thumbnail: "🎨"
    },
    {
      id: 4,
      title: "Data Science & Analytics",
      provider: "Data Institute",
      duration: "16 weeks",
      level: "Advanced",
      rating: 4.7,
      students: 756,
      price: "$199",
      category: "technical",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      progress: 0,
      isEnrolled: false,
      thumbnail: "📊"
    },
  ];

  const workshops = [
    {
      id: 1,
      title: "Resume Building Workshop",
      date: "March 20, 2024",
      time: "2:00 PM - 4:00 PM",
      instructor: "Career Services",
      attendees: 45,
      maxAttendees: 60,
      isRegistered: true,
      category: "career"
    },
    {
      id: 2,
      title: "Interview Preparation Masterclass",
      date: "March 25, 2024",
      time: "10:00 AM - 12:00 PM",
      instructor: "HR Professionals",
      attendees: 32,
      maxAttendees: 40,
      isRegistered: false,
      category: "career"
    },
    {
      id: 3,
      title: "Project Management Basics",
      date: "April 1, 2024",
      time: "1:00 PM - 3:00 PM",
      instructor: "Industry Experts",
      attendees: 28,
      maxAttendees: 35,
      isRegistered: true,
      category: "leadership"
    },
  ];

  const internships = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Software Development Intern",
      duration: "3 months",
      stipend: "$1000/month",
      location: "Remote",
      skills: ["React", "JavaScript", "Git"],
      deadline: "March 30, 2024",
      isApplied: false
    },
    {
      id: 2,
      company: "Design Studio",
      position: "UI/UX Design Intern",
      duration: "6 months",
      stipend: "$800/month",
      location: "On-site",
      skills: ["Figma", "Adobe Creative Suite", "User Research"],
      deadline: "April 15, 2024",
      isApplied: true
    },
    {
      id: 3,
      company: "Data Analytics Co.",
      position: "Data Science Intern",
      duration: "4 months",
      stipend: "$1200/month",
      location: "Hybrid",
      skills: ["Python", "SQL", "Machine Learning"],
      deadline: "March 25, 2024",
      isApplied: false
    },
  ];

  const mySkills = [
    { name: "JavaScript", level: 85, category: "technical" },
    { name: "Communication", level: 70, category: "soft-skills" },
    { name: "React", level: 75, category: "technical" },
    { name: "Team Leadership", level: 60, category: "leadership" },
    { name: "UI Design", level: 65, category: "creative" },
  ];

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 neon-glow-purple">
        <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Skill Development Hub
        </h1>
        <p className="text-muted-foreground">Enhance your skills with courses, workshops, and internship opportunities</p>
      </div>

      {/* My Progress */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-neon-green" />
          My Skill Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySkills.map((skill, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/20">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{skill.name}</span>
                <Badge className="text-xs">
                  {skill.category}
                </Badge>
              </div>
              <Progress value={skill.level} className="mb-2" />
              <div className="text-right text-sm text-muted-foreground">
                {skill.level}% Complete
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="glass-card p-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "neon-glow-purple" : "neon-border"}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Courses */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-neon-blue" />
              Available Courses
            </h2>
            <div className="grid gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="glass-card p-6 hover:neon-glow-blue transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <Badge className="bg-neon-green/20 text-neon-green">
                          {course.price}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">{course.provider}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students} students
                        </div>
                      </div>
                      
                      {course.isEnrolled ? (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      ) : null}
                      
                      <div className="flex gap-2">
                        <Button 
                          className={course.isEnrolled ? "neon-glow-green" : "neon-glow-blue"}
                          size="sm"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          {course.isEnrolled ? "Continue" : "Enroll Now"}
                        </Button>
                        <Button variant="outline" size="sm" className="neon-border">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Workshops */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Award className="h-4 w-4 mr-2 text-neon-purple" />
              Workshops
            </h3>
            <div className="space-y-3">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="p-3 rounded-lg bg-muted/20">
                  <h4 className="font-medium text-sm mb-1">{workshop.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {workshop.date} • {workshop.time}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {workshop.attendees}/{workshop.maxAttendees}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      {workshop.isRegistered ? "Registered" : "Register"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Internship Opportunities */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-neon-green" />
              Internships
            </h3>
            <div className="space-y-3">
              {internships.map((internship) => (
                <div key={internship.id} className="p-3 rounded-lg bg-muted/20">
                  <h4 className="font-medium text-sm mb-1">{internship.position}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{internship.company}</p>
                  <p className="text-xs text-neon-green mb-2">{internship.stipend}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Due: {internship.deadline}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      {internship.isApplied ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Applied
                        </>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievement Stats */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-neon-blue" />
              Your Stats
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Courses Completed</span>
                <span className="text-neon-green">3</span>
              </div>
              <div className="flex justify-between">
                <span>Certificates Earned</span>
                <span className="text-neon-blue">2</span>
              </div>
              <div className="flex justify-between">
                <span>Workshop Attended</span>
                <span className="text-neon-purple">5</span>
              </div>
              <div className="flex justify-between">
                <span>Skills Acquired</span>
                <span className="text-neon-pink">12</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};