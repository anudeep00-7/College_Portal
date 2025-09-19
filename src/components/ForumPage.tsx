import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus,
  Search,
  Filter,
  ThumbsUp,
  Reply,
  Flag,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

export const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("general");

  const categories = [
    { id: "all", label: "All Posts", color: "bg-gradient-neon" },
    { id: "academics", label: "Academics", color: "bg-neon-blue/20 text-neon-blue" },
    { id: "mental-health", label: "Mental Health", color: "bg-neon-pink/20 text-neon-pink" },
    { id: "career", label: "Career Guidance", color: "bg-neon-green/20 text-neon-green" },
    { id: "clubs", label: "Clubs & Events", color: "bg-neon-purple/20 text-neon-purple" },
    { id: "general", label: "General", color: "bg-muted/50 text-muted-foreground" },
  ];

  const posts = [
    {
      id: 1,
      title: "Tips for Managing Exam Stress",
      content: "Hey everyone! With finals approaching, I wanted to share some techniques that have really helped me manage stress. First, try the Pomodoro technique...",
      author: "Sarah Wilson",
      authorRole: "student",
      category: "mental-health",
      createdAt: "2 hours ago",
      likes: 24,
      replies: 8,
      isLiked: false,
      avatar: "SW",
      isPinned: true
    },
    {
      id: 2,
      title: "Study Group for Data Structures",
      content: "Looking to form a study group for our upcoming Data Structures exam. We can meet every Tuesday and Thursday at the library. DM me if interested!",
      author: "Alex Chen",
      authorRole: "student",
      category: "academics",
      createdAt: "4 hours ago",
      likes: 12,
      replies: 15,
      isLiked: true,
      avatar: "AC",
      isPinned: false
    },
    {
      id: 3,
      title: "Mental Health Resources on Campus",
      content: "I wanted to compile a list of mental health resources available on our campus. The counseling center offers free sessions, and there's also...",
      author: "Dr. Martinez",
      authorRole: "counsellor",
      category: "mental-health",
      createdAt: "1 day ago",
      likes: 45,
      replies: 12,
      isLiked: false,
      avatar: "DM",
      isPinned: true
    },
    {
      id: 4,
      title: "Internship Opportunities in Tech",
      content: "Just got an internship at Google! Happy to share my application process and answer any questions about tech internships. Feel free to ask!",
      author: "Mike Johnson",
      authorRole: "student",
      category: "career",
      createdAt: "2 days ago",
      likes: 67,
      replies: 23,
      isLiked: true,
      avatar: "MJ",
      isPinned: false
    },
    {
      id: 5,
      title: "Photography Club Meet & Greet",
      content: "Join us this Friday for our monthly meet and greet! We'll be showcasing member work and planning our next photo walk around the campus.",
      author: "Emma Davis",
      authorRole: "student",
      category: "clubs",
      createdAt: "3 days ago",
      likes: 18,
      replies: 6,
      isLiked: false,
      avatar: "ED",
      isPinned: false
    },
  ];

  const trendingTopics = [
    { tag: "ExamPrep", posts: 45 },
    { tag: "MentalHealth", posts: 23 },
    { tag: "TechInternships", posts: 19 },
    { tag: "StudyGroups", posts: 34 },
    { tag: "CampusEvents", posts: 12 }
  ];

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleCreatePost = () => {
    if (newPostTitle && newPostContent) {
      console.log("Creating post:", { 
        title: newPostTitle, 
        content: newPostContent, 
        category: newPostCategory 
      });
      setNewPostTitle("");
      setNewPostContent("");
      setShowCreatePost(false);
    }
  };

  const handleLikePost = (postId: number) => {
    console.log(`Liking post ${postId}`);
  };

  const handleReplyPost = (postId: number) => {
    console.log(`Replying to post ${postId}`);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "counsellor": return "bg-neon-pink/20 text-neon-pink";
      case "faculty": return "bg-neon-purple/20 text-neon-purple";
      case "admin": return "bg-neon-green/20 text-neon-green";
      default: return "bg-neon-blue/20 text-neon-blue";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 neon-glow-blue">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
              Community Forum
            </h1>
            <p className="text-muted-foreground">Connect, share, and support each other in your academic journey</p>
          </div>
          <Button 
            onClick={() => setShowCreatePost(true)}
            className="mt-4 md:mt-0 neon-border"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <Card className="glass-card p-6 neon-glow-green">
          <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
          <div className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="bg-muted/50 border-border focus:border-neon-blue"
            />
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="w-full p-2 rounded-lg bg-muted/50 border border-border focus:border-neon-blue"
            >
              {categories.slice(1).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <Textarea
              placeholder="Share your thoughts..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
              className="bg-muted/50 border-border focus:border-neon-blue"
            />
            <div className="flex gap-3">
              <Button onClick={handleCreatePost} className="neon-glow-green">
                Post
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreatePost(false)}
                className="neon-border"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Categories */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full justify-start ${
                    selectedCategory === category.id ? "neon-glow-blue" : "hover:bg-muted/50"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Trending Topics */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-neon-green" />
              Trending
            </h3>
            <div className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-neon-blue">#{topic.tag}</span>
                  <span className="text-muted-foreground">{topic.posts}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Community Stats */}
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2 text-neon-purple" />
              Community
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Posts</span>
                <span className="text-neon-blue">1,247</span>
              </div>
              <div className="flex justify-between">
                <span>Active Users</span>
                <span className="text-neon-green">342</span>
              </div>
              <div className="flex justify-between">
                <span>Today's Posts</span>
                <span className="text-neon-purple">23</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="lg:col-span-3 space-y-4">
          {filteredPosts.map((post) => (
            <Card 
              key={post.id} 
              className={`glass-card p-6 hover:neon-glow-blue transition-all duration-300 ${
                post.isPinned ? 'border-neon-green' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10 bg-gradient-neon flex items-center justify-center text-background font-bold">
                  {post.avatar}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{post.author}</h3>
                        <Badge className={getRoleBadgeColor(post.authorRole)}>
                          {post.authorRole}
                        </Badge>
                        {post.isPinned && (
                          <Badge className="bg-neon-green/20 text-neon-green">
                            📌 Pinned
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{post.createdAt}</span>
                        <Badge className={categories.find(c => c.id === post.category)?.color}>
                          {categories.find(c => c.id === post.category)?.label}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:text-neon-pink">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikePost(post.id)}
                      className={`hover:text-neon-pink ${post.isLiked ? 'text-neon-pink' : ''}`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReplyPost(post.id)}
                      className="hover:text-neon-blue"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      {post.replies}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="hover:text-neon-green">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};