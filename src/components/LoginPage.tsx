import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  User, 
  GraduationCap, 
  Shield, 
  Heart,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-campus.jpg";

const roles = [
  { 
    id: "student", 
    label: "Student", 
    icon: GraduationCap, 
    variant: "student",
    description: "Access your academic journey"
  },
  { 
    id: "faculty", 
    label: "Faculty", 
    icon: User, 
    variant: "faculty",
    description: "Manage classes and students"
  },
  { 
    id: "admin", 
    label: "Admin", 
    icon: Shield, 
    variant: "admin",
    description: "System administration"
  },
  { 
    id: "counsellor", 
    label: "Counsellor", 
    icon: Heart, 
    variant: "counsellor",
    description: "Support student wellness"
  },
];

export const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role to continue",
        variant: "destructive",
      });
      return;
    }

    if (!username || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        username,
        role: selectedRole,
        loginTime: new Date().toISOString()
      }));
      
      toast({
        title: "Login Successful!",
        description: `Welcome to the portal, ${username}!`,
      });
      
      // Navigate based on role
      switch (selectedRole) {
        case "student":
          navigate("/dashboard/student");
          break;
        case "faculty":
          navigate("/dashboard/faculty");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "counsellor":
          navigate("/dashboard/counsellor");
          break;
        default:
          navigate("/dashboard/student");
      }
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 particle-bg relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl float-animation" style={{ animationDelay: "4s" }}></div>
      </div>

      <Card className="w-full max-w-md glass-card neon-glow-blue relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-neon-blue mr-2" />
              <h1 className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                College Portal
              </h1>
            </div>
            <p className="text-muted-foreground">
              Academic & Wellness Hub
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      selectedRole === role.id
                        ? getRoleStyles(role.variant, true)
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                      selectedRole === role.id ? getRoleTextStyles(role.variant) : "text-muted-foreground"
                    }`} />
                    <p className={`text-sm font-medium ${
                      selectedRole === role.id ? getRoleTextStyles(role.variant) : "text-muted-foreground"
                    }`}>
                      {role.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 bg-muted/50 border-border focus:border-neon-blue"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 border-border focus:border-neon-blue pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="neon"
              className="w-full mt-6 py-6 pulse-glow"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Enter Portal"}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Secure login • Academic Excellence • Mental Wellness
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Helper functions for role-specific styling
const getRoleStyles = (variant: string, isSelected: boolean) => {
  if (!isSelected) return "";
  
  switch (variant) {
    case "student":
      return "border-neon-blue bg-neon-blue/10 shadow-neon-blue";
    case "faculty":
      return "border-neon-purple bg-neon-purple/10 shadow-neon-purple";
    case "admin":
      return "border-neon-green bg-neon-green/10 shadow-neon-green";
    case "counsellor":
      return "border-neon-pink bg-neon-pink/10 shadow-[0_0_20px_hsl(328_86%_70%/0.5)]";
    default:
      return "";
  }
};

const getRoleTextStyles = (variant: string) => {
  switch (variant) {
    case "student":
      return "text-neon-blue";
    case "faculty":
      return "text-neon-purple";
    case "admin":
      return "text-neon-green";
    case "counsellor":
      return "text-neon-pink";
    default:
      return "";
  }
};