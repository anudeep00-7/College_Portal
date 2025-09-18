import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Brain,
  Calendar,
  MessageCircle,
  Phone,
  Video,
  User,
  Clock,
  Star,
  Send,
  Smile,
  Meh,
  Frown,
  BookOpen,
  Headphones,
  Shield,
  Users,
  Zap
} from "lucide-react";

const counsellors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Anxiety & Stress Management",
    rating: 4.9,
    experience: "8 years",
    available: true,
    nextSlot: "Today 2:00 PM",
    image: "👩‍⚕️"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Depression & Mood Disorders",
    rating: 4.8,
    experience: "10 years",
    available: true,
    nextSlot: "Tomorrow 10:00 AM",
    image: "👨‍⚕️"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Academic Stress & Performance",
    rating: 4.9,
    experience: "6 years",
    available: false,
    nextSlot: "Monday 11:00 AM",
    image: "👩‍⚕️"
  }
];

const resources = [
  {
    type: "video",
    title: "5-Minute Meditation for Students",
    duration: "5 min",
    category: "Mindfulness",
    language: "English"
  },
  {
    type: "audio",
    title: "Deep Breathing Exercises",
    duration: "10 min",
    category: "Relaxation",
    language: "Hindi"
  },
  {
    type: "article",
    title: "Managing Exam Anxiety",
    duration: "8 min read",
    category: "Study Tips",
    language: "English"
  },
  {
    type: "video",
    title: "योग और मानसिक स्वास्थ्य",
    duration: "15 min",
    category: "Yoga",
    language: "Hindi"
  }
];

export const MentalHealthPage = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [moodToday, setMoodToday] = useState<string>("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", message: "Hello! I'm your AI wellness companion. How are you feeling today? 😊" }
  ]);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedCounsellor, setSelectedCounsellor] = useState<number | null>(null);

  const handleMoodSelect = (mood: string) => {
    setMoodToday(mood);
    // In real app, save to backend
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = { type: "user", message: chatMessage };
    setChatHistory([...chatHistory, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. Would you like to try some breathing exercises?",
        "That sounds challenging. Let's work through this together. Have you tried our stress management techniques?",
        "Thank you for sharing that with me. Remember, it's completely normal to feel this way sometimes.",
        "I'm here to support you. Would you like me to recommend some resources that might help?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { type: "bot", message: randomResponse }]);
    }, 1000);
    
    setChatMessage("");
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Mood Tracker */}
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
                    onClick={() => handleMoodSelect(item.mood)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      moodToday === item.mood
                        ? `border-${item.color} bg-${item.color}/10`
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </button>
                ))}
              </div>
              {moodToday && (
                <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4">
                  <p className="text-sm text-neon-blue">
                    Thanks for checking in! Based on your mood, here are some personalized recommendations for you.
                  </p>
                </div>
              )}
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Wellness Score</p>
                    <p className="text-2xl font-bold text-neon-green">8.2/10</p>
                  </div>
                  <Heart className="h-8 w-8 text-neon-green" />
                </div>
                <Progress value={82} className="mt-2" />
              </Card>

              <Card className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Session This Week</p>
                    <p className="text-2xl font-bold text-neon-blue">3</p>
                  </div>
                  <Brain className="h-8 w-8 text-neon-blue" />
                </div>
              </Card>

              <Card className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Days Streak</p>
                    <p className="text-2xl font-bold text-neon-purple">12</p>
                  </div>
                  <Zap className="h-8 w-8 text-neon-purple" />
                </div>
              </Card>
            </div>

            {/* Resources */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-neon-purple" />
                Wellness Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource, index) => {
                  const Icon = resource.type === "video" ? Video : resource.type === "audio" ? Headphones : BookOpen;
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 text-neon-blue mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{resource.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{resource.category}</Badge>
                            <span>•</span>
                            <span>{resource.duration}</span>
                            <span>•</span>
                            <span>{resource.language}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        );

      case "chatbot":
        return (
          <Card className="glass-card h-[600px] flex flex-col">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-neon-green" />
                AI Wellness Companion
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your safe space for mental health support • Confidential & Available 24/7
              </p>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === "user"
                        ? "bg-neon-blue text-background"
                        : "bg-muted/50 text-foreground"
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Share what's on your mind..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} variant="neon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <Shield className="h-3 w-3 inline mr-1" />
                Your conversations are private and confidential
              </p>
            </div>
          </Card>
        );

      case "appointments":
        return (
          <div className="space-y-6">
            {bookingStep === 1 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Book a Counselling Session</h2>
                  <p className="text-muted-foreground">Choose from our qualified mental health professionals</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {counsellors.map((counsellor) => (
                    <Card
                      key={counsellor.id}
                      className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedCounsellor === counsellor.id ? "ring-2 ring-neon-blue neon-glow-blue" : ""
                      }`}
                      onClick={() => setSelectedCounsellor(counsellor.id)}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{counsellor.image}</div>
                        <h3 className="font-semibold text-lg">{counsellor.name}</h3>
                        <p className="text-sm text-neon-blue">{counsellor.specialization}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">{counsellor.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-medium">{counsellor.experience}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Next Available:</span>
                          <span className={`font-medium ${counsellor.available ? "text-neon-green" : "text-orange-400"}`}>
                            {counsellor.nextSlot}
                          </span>
                        </div>
                      </div>

                      <Badge
                        variant={counsellor.available ? "secondary" : "destructive"}
                        className="w-full mt-4 justify-center"
                      >
                        {counsellor.available ? "Available" : "Busy"}
                      </Badge>
                    </Card>
                  ))}
                </div>

                {selectedCounsellor && (
                  <div className="text-center">
                    <Button variant="neon" onClick={() => setBookingStep(2)}>
                      Continue Booking
                    </Button>
                  </div>
                )}
              </>
            )}

            {bookingStep === 2 && selectedCounsellor && (
              <Card className="glass-card p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Schedule Your Session</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Session Type</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { type: "video", icon: Video, label: "Video Call" },
                        { type: "phone", icon: Phone, label: "Phone Call" },
                        { type: "chat", icon: MessageCircle, label: "Text Chat" }
                      ].map((option) => (
                        <button
                          key={option.type}
                          className="p-4 rounded-lg border border-border hover:border-neon-blue transition-all duration-300 flex flex-col items-center space-y-2"
                        >
                          <option.icon className="h-6 w-6 text-neon-blue" />
                          <span className="text-sm">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Brief Description (Optional)</label>
                    <Textarea
                      placeholder="Let your counsellor know what you'd like to discuss..."
                      className="h-24"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button variant="outline" onClick={() => setBookingStep(1)}>
                      Back
                    </Button>
                    <Button variant="neon" className="flex-1">
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      case "forum":
        return (
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-neon-purple" />
                Peer Support Forum
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect with fellow students in a safe, moderated environment. Share experiences and support each other.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Dealing with Exam Anxiety",
                    author: "Anonymous",
                    replies: 12,
                    time: "2 hours ago",
                    tags: ["anxiety", "exams"]
                  },
                  {
                    title: "Healthy Study-Life Balance Tips",
                    author: "Anonymous",
                    replies: 8,
                    time: "5 hours ago",
                    tags: ["balance", "productivity"]
                  },
                  {
                    title: "Making Friends in College",
                    author: "Anonymous",
                    replies: 15,
                    time: "1 day ago",
                    tags: ["social", "friendship"]
                  }
                ].map((post, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-neon-purple/50 transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="font-medium mb-2">{post.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>By {post.author}</span>
                        <span>{post.replies} replies</span>
                        <span>{post.time}</span>
                      </div>
                      <div className="flex space-x-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="neon" className="w-full mt-6">
                Start New Discussion
              </Button>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Mental Health & Wellness
          </h1>
          <p className="text-muted-foreground mt-1">
            Your comprehensive mental wellness support system
          </p>
        </div>
        
        <Button variant="outline" className="neon-border">
          <Phone className="h-4 w-4 mr-2" />
          Emergency Help
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { id: "dashboard", label: "Dashboard", icon: Heart },
          { id: "chatbot", label: "AI Companion", icon: MessageCircle },
          { id: "appointments", label: "Book Session", icon: Calendar },
          { id: "forum", label: "Peer Support", icon: Users }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "neon" : "ghost"}
              onClick={() => setSelectedTab(tab.id)}
              className="flex-shrink-0"
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};