import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  Send,
  X,
  Heart,
  Shield,
  Minimize2,
  Maximize2
} from "lucide-react";

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", message: "Hi! I'm your Mental Health Companion. How can I support you today? 😊" }
  ]);

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
        "I'm here to support you. Would you like me to recommend some resources that might help?",
        "Your feelings are valid. Let's explore some coping strategies that might be helpful for you.",
        "I'm glad you reached out. Taking care of your mental health is so important. How can I help you today?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { type: "bot", message: randomResponse }]);
    }, 1000);
    
    setChatMessage("");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-neon shadow-lg hover:scale-110 transition-all duration-300 neon-glow-pink"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
        <div className="absolute -top-12 right-0 bg-background/90 backdrop-blur-sm border border-neon-pink/30 rounded-lg px-3 py-1 text-sm text-neon-pink animate-bounce">
          Mental Health Support 💙
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`glass-card transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      } flex flex-col shadow-2xl border-neon-pink/30`}>
        
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-neon/10">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-neon-pink" />
            <h3 className="font-semibold text-neon-pink">Mental Health Companion</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background/50">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      chat.type === "user"
                        ? "bg-neon-pink text-background"
                        : "bg-muted/70 text-foreground border border-border/50"
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-background/80">
              <div className="flex space-x-2 mb-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Share what's on your mind..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-neon-pink hover:bg-neon-pink/80"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Private & Confidential • Available 24/7
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};