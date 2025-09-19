import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Filter,
  Plus,
  Search,
  Star,
  Heart,
  Trophy,
  Music,
  Camera,
  Gamepad2
} from "lucide-react";

export const EventsPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const events = [
    {
      id: 1,
      title: "Annual Tech Fest 2024",
      description: "Join us for the biggest technology festival of the year with competitions, workshops, and exhibitions.",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Main Auditorium",
      category: "academic",
      attendees: 250,
      maxAttendees: 300,
      image: "🎯",
      organizer: "Computer Science Dept",
      isJoined: false
    },
    {
      id: 2,
      title: "Mental Health Awareness Week",
      description: "A week dedicated to promoting mental health awareness with workshops, counseling sessions, and activities.",
      date: "2024-03-20",
      time: "9:00 AM",
      location: "Student Center",
      category: "wellness",
      attendees: 180,
      maxAttendees: 200,
      image: "🧠",
      organizer: "Counseling Center",
      isJoined: true
    },
    {
      id: 3,
      title: "Spring Music Festival",
      description: "Celebrate spring with live performances by student bands and local artists. Food stalls and fun activities included!",
      date: "2024-03-25",
      time: "6:00 PM",
      location: "Campus Grounds",
      category: "cultural",
      attendees: 450,
      maxAttendees: 500,
      image: "🎵",
      organizer: "Music Club",
      isJoined: false
    },
    {
      id: 4,
      title: "Career Fair 2024",
      description: "Meet with top employers and explore internship and job opportunities across various industries.",
      date: "2024-04-01",
      time: "2:00 PM",
      location: "Sports Complex",
      category: "career",
      attendees: 320,
      maxAttendees: 400,
      image: "💼",
      organizer: "Career Services",
      isJoined: true
    },
    {
      id: 5,
      title: "Gaming Championship",
      description: "Compete in various gaming tournaments including esports, board games, and mobile gaming competitions.",
      date: "2024-04-05",
      time: "1:00 PM",
      location: "Gaming Lounge",
      category: "sports",
      attendees: 120,
      maxAttendees: 150,
      image: "🎮",
      organizer: "Gaming Club",
      isJoined: false
    },
  ];

  const clubs = [
    {
      id: 1,
      name: "Photography Club",
      description: "Capture moments, create memories. Weekly photo walks and workshops.",
      members: 85,
      category: "creative",
      icon: <Camera className="h-6 w-6" />,
      isJoined: true
    },
    {
      id: 2,
      name: "Coding Club",
      description: "Learn, code, and build amazing projects together.",
      members: 142,
      category: "academic",
      icon: <Trophy className="h-6 w-6" />,
      isJoined: false
    },
    {
      id: 3,
      name: "Mental Wellness Circle",
      description: "Supporting each other's mental health journey through peer support.",
      members: 67,
      category: "wellness",
      icon: <Heart className="h-6 w-6" />,
      isJoined: true
    },
    {
      id: 4,
      name: "Music Society",
      description: "Express yourself through music. All skill levels welcome!",
      members: 94,
      category: "cultural",
      icon: <Music className="h-6 w-6" />,
      isJoined: false
    },
  ];

  const categories = [
    { id: "all", label: "All Events", color: "bg-gradient-neon" },
    { id: "academic", label: "Academic", color: "bg-neon-blue/20 text-neon-blue" },
    { id: "cultural", label: "Cultural", color: "bg-neon-purple/20 text-neon-purple" },
    { id: "wellness", label: "Wellness", color: "bg-neon-pink/20 text-neon-pink" },
    { id: "career", label: "Career", color: "bg-neon-green/20 text-neon-green" },
    { id: "sports", label: "Sports", color: "bg-neon-blue/20 text-neon-blue" },
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === "all" || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleJoinEvent = (eventId: number) => {
    console.log(`Joining event ${eventId}`);
    // In a real app, this would update the backend
  };

  const handleJoinClub = (clubId: number) => {
    console.log(`Joining club ${clubId}`);
    // In a real app, this would update the backend
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 neon-glow-blue">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
              Events & Clubs
            </h1>
            <p className="text-muted-foreground">Discover amazing events and join clubs that match your interests</p>
          </div>
          <Button className="mt-4 md:mt-0 neon-border">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-border focus:border-neon-blue"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category.id)}
                className={filter === category.id ? "neon-glow-blue" : "neon-border"}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-neon-blue" />
            Upcoming Events
          </h2>
          
          {filteredEvents.map((event) => (
            <Card key={event.id} className="glass-card p-6 hover:neon-glow-blue transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="text-4xl">{event.image}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <Badge className={categories.find(c => c.id === event.category)?.color}>
                      {event.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Organized by {event.organizer}
                    </span>
                    <Button
                      onClick={() => handleJoinEvent(event.id)}
                      variant={event.isJoined ? "outline" : "default"}
                      size="sm"
                      className={event.isJoined ? "neon-border" : "neon-glow-blue"}
                    >
                      {event.isJoined ? "Joined" : "Join Event"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Clubs Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center">
            <Users className="h-6 w-6 mr-2 text-neon-purple" />
            Student Clubs
          </h2>
          
          {clubs.map((club) => (
            <Card key={club.id} className="glass-card p-4 hover:neon-glow-purple transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-neon-purple">{club.icon}</div>
                  <div>
                    <h3 className="font-semibold">{club.name}</h3>
                    <p className="text-sm text-muted-foreground">{club.members} members</p>
                  </div>
                </div>
                <Badge className={categories.find(c => c.id === club.category)?.color}>
                  {club.category}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
              
              <Button
                onClick={() => handleJoinClub(club.id)}
                variant={club.isJoined ? "outline" : "default"}
                size="sm"
                className={`w-full ${club.isJoined ? "neon-border" : "neon-glow-purple"}`}
              >
                {club.isJoined ? "Member" : "Join Club"}
              </Button>
            </Card>
          ))}

          {/* Quick Stats */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Your Activity</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Events Joined</span>
                <span className="text-neon-blue">2</span>
              </div>
              <div className="flex justify-between">
                <span>Clubs Joined</span>
                <span className="text-neon-purple">2</span>
              </div>
              <div className="flex justify-between">
                <span>Events Attended</span>
                <span className="text-neon-green">8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};