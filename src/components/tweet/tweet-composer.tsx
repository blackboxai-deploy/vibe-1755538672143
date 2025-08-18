"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface TweetComposerProps {
  onTweet?: (content: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function TweetComposer({ 
  onTweet, 
  placeholder = "What is happening?!", 
  maxLength = 280 
}: TweetComposerProps) {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim() && content.length <= maxLength) {
      onTweet?.(content.trim());
      setContent("");
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const canTweet = content.trim().length > 0 && !isOverLimit;

  return (
    <Card className="border-0 border-b border-border rounded-none bg-background">
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              U
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[52px] text-xl placeholder:text-muted-foreground border-0 resize-none focus-visible:ring-0 p-0 bg-transparent"
              style={{ fontSize: "20px", lineHeight: "24px" }}
            />
            
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {content.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5">
                          <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              className="text-muted-foreground/20"
                            />
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeDasharray={`${(content.length / maxLength) * 50.27} 50.27`}
                              className={isOverLimit ? "text-red-500" : remainingChars <= 20 ? "text-yellow-500" : "text-blue-500"}
                            />
                          </svg>
                        </div>
                        {remainingChars <= 20 && (
                          <span className={`text-sm ${isOverLimit ? "text-red-500" : "text-yellow-500"}`}>
                            {remainingChars}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <Button
                      onClick={handleSubmit}
                      disabled={!canTweet}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-1.5 h-auto rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}