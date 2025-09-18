import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  Star,
  Clock,
  FileText,
  Video,
  Link,
  Brain,
  Bookmark,
  Share
} from "lucide-react";

const libraryItems = [
  {
    id: 1,
    title: "Advanced Calculus Textbook",
    type: "pdf",
    subject: "Mathematics",
    author: "Dr. Michael Stewart",
    size: "15.2 MB",
    pages: 450,
    rating: 4.8,
    downloads: 1234,
    uploadDate: "2024-01-10",
    description: "Comprehensive guide to advanced calculus concepts and applications.",
    bookmarked: true
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    type: "pdf",
    subject: "Computer Science",
    author: "Prof. Sarah Johnson",
    size: "22.5 MB",
    pages: 680,
    rating: 4.9,
    downloads: 2156,
    uploadDate: "2024-01-08",
    description: "Complete reference for data structures and algorithmic problem solving.",
    bookmarked: false
  },
  {
    id: 3,
    title: "Quantum Physics Fundamentals",
    type: "video",
    subject: "Physics",
    author: "MIT OpenCourseWare",
    duration: "2h 45m",
    rating: 4.7,
    views: 15623,
    uploadDate: "2024-01-05",
    description: "Introduction to quantum mechanics and wave-particle duality.",
    bookmarked: true
  },
  {
    id: 4,
    title: "Research Paper: ML in Healthcare",
    type: "research",
    subject: "Computer Science",
    author: "Dr. Emily Chen et al.",
    size: "3.2 MB",
    pages: 24,
    rating: 4.6,
    downloads: 892,
    uploadDate: "2024-01-12",
    description: "Recent advances in machine learning applications for healthcare.",
    bookmarked: false
  },
  {
    id: 5,
    title: "Linear Algebra Notes",
    type: "notes",
    subject: "Mathematics",
    author: "Student Contributors",
    size: "8.7 MB",
    pages: 120,
    rating: 4.4,
    downloads: 756,
    uploadDate: "2024-01-15",
    description: "Comprehensive notes on linear algebra topics with examples.",
    bookmarked: false
  }
];

const recommendations = [
  {
    title: "Machine Learning Crash Course",
    source: "Google AI Education",
    type: "external",
    url: "https://developers.google.com/machine-learning/crash-course",
    description: "Free course covering ML fundamentals"
  },
  {
    title: "Khan Academy - Calculus",
    source: "Khan Academy",
    type: "external",
    url: "https://www.khanacademy.org/math/calculus-1",
    description: "Interactive calculus lessons and exercises"
  },
  {
    title: "MIT Physics Lectures",
    source: "YouTube",
    type: "video",
    url: "https://youtube.com/playlist?list=physics",
    description: "Complete physics lecture series"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "pdf": return <FileText className="h-4 w-4" />;
    case "video": return <Video className="h-4 w-4" />;
    case "research": return <BookOpen className="h-4 w-4" />;
    case "notes": return <FileText className="h-4 w-4" />;
    case "external": return <Link className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "pdf": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "video": return "bg-neon-blue/20 text-neon-blue border-neon-blue/30";
    case "research": return "bg-neon-purple/20 text-neon-purple border-neon-purple/30";
    case "notes": return "bg-neon-green/20 text-neon-green border-neon-green/30";
    case "external": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

export const DigitalLibraryPage = () => {
  const [selectedTab, setSelectedTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const subjects = ["all", "Mathematics", "Computer Science", "Physics", "English Literature"];
  const types = ["all", "pdf", "video", "research", "notes"];

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject;
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const renderTabContent = () => {
    switch (selectedTab) {
      case "browse":
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search library resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 bg-muted/50 border border-border rounded-md text-sm"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject === "all" ? "All Subjects" : subject}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 bg-muted/50 border border-border rounded-md text-sm"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === "all" ? "All Types" : type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Library Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="glass-card p-6 hover:neon-glow-blue transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-neon-blue mb-2">{item.subject}</p>
                      <p className="text-sm text-muted-foreground">{item.author}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded border text-xs flex items-center space-x-1 ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                        <span>{item.type.toUpperCase()}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {/* Toggle bookmark */}}
                      >
                        <Bookmark className={`h-4 w-4 ${item.bookmarked ? "fill-current text-neon-blue" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {item.rating}
                        </div>
                        <div>
                          {item.type === "video" ? `${item.views} views` : `${item.downloads} downloads`}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {item.type === "video" 
                        ? `Duration: ${item.duration}`
                        : `${item.pages} pages • ${item.size}`
                      }
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="neon" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        {item.type === "video" ? "Watch" : "Read"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "recommendations":
        return (
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-neon-green" />
                AI-Powered Recommendations
              </h2>
              <p className="text-muted-foreground mb-6">
                Based on your current courses and study patterns, here are some recommended resources:
              </p>

              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-neon-green/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{rec.title}</h3>
                        <p className="text-sm text-neon-green mb-2">{rec.source}</p>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                      <div className={`px-2 py-1 rounded border text-xs flex items-center space-x-1 ${getTypeColor(rec.type)}`}>
                        {getTypeIcon(rec.type)}
                        <span>{rec.type.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="neon" size="sm">
                        <Link className="h-4 w-4 mr-2" />
                        Open Resource
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular This Week */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Trending This Week</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {libraryItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-border hover:border-neon-blue/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.subject}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          {item.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case "upload":
        return (
          <Card className="glass-card p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-neon-blue" />
              Share a Resource
            </h2>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-neon-blue/50 transition-all duration-300">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Drop your files here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <Button variant="neon">Select Files</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input placeholder="Enter resource title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md">
                    <option>Select subject</option>
                    <option>Mathematics</option>
                    <option>Computer Science</option>
                    <option>Physics</option>
                    <option>English Literature</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md h-24"
                  placeholder="Describe the resource..."
                />
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button variant="neon" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </div>
            </div>
          </Card>
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
            Digital Library
          </h1>
          <p className="text-muted-foreground mt-1">
            Access and share academic resources, notes, and study materials
          </p>
        </div>
        
        <Button variant="neon">
          <Upload className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Resources</p>
              <p className="text-2xl font-bold text-neon-blue">{libraryItems.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-neon-blue" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bookmarks</p>
              <p className="text-2xl font-bold text-neon-purple">
                {libraryItems.filter(item => item.bookmarked).length}
              </p>
            </div>
            <Bookmark className="h-8 w-8 text-neon-purple" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Downloads</p>
              <p className="text-2xl font-bold text-neon-green">2.1K</p>
            </div>
            <Download className="h-8 w-8 text-neon-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contributions</p>
              <p className="text-2xl font-bold text-yellow-400">8</p>
            </div>
            <Upload className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { id: "browse", label: "Browse Library", icon: BookOpen },
          { id: "recommendations", label: "AI Recommendations", icon: Brain },
          { id: "upload", label: "Upload Resource", icon: Upload }
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