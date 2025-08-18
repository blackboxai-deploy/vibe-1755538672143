"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Tweet {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  isLiked?: boolean;
  isRetweeted?: boolean;
  parentId?: string;
  nestedReplies?: Tweet[];
}

interface TweetThreadProps {
  mainTweet: Tweet;
  replies?: Tweet[];
  onReply?: (tweetId: string, content: string) => void;
  onLike?: (tweetId: string) => void;
  onRetweet?: (tweetId: string) => void;
}

export function TweetThread({ mainTweet, replies = [], onReply, onLike, onRetweet }: TweetThreadProps) {
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleReply = (tweetId: string) => {
    if (replyContent.trim() && onReply) {
      onReply(tweetId, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
    }
  };

  const toggleExpandReplies = (tweetId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(tweetId)) {
      newExpanded.delete(tweetId);
    } else {
      newExpanded.add(tweetId);
    }
    setExpandedReplies(newExpanded);
  };

  const renderTweet = (tweet: Tweet, isMainTweet = false, depth = 0) => (
    <div key={tweet.id} className={`${depth > 0 ? 'ml-12 mt-3' : ''}`}>
      <Card className={`p-4 bg-black border-gray-800 hover:bg-gray-950 transition-colors ${isMainTweet ? 'border-gray-700' : ''}`}>
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={tweet.author.avatar} />
            <AvatarFallback className="bg-gray-700 text-white">
              {tweet.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white truncate">{tweet.author.name}</h3>
              {tweet.author.verified && (
                <span className="text-blue-400 text-sm">✓</span>
              )}
              <span className="text-gray-500 text-sm">@{tweet.author.username}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{formatTimestamp(tweet.timestamp)}</span>
            </div>
            
            <div className="mt-2">
              <p className="text-white whitespace-pre-wrap break-words">{tweet.content}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4 max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 p-2"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <span className="mr-2">💬</span>
                {tweet.replies > 0 && formatNumber(tweet.replies)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${tweet.isRetweeted ? 'text-green-400' : 'text-gray-500 hover:text-green-400 hover:bg-green-400/10'}`}
                onClick={() => onRetweet?.(tweet.id)}
              >
                <span className="mr-2">🔄</span>
                {tweet.retweets > 0 && formatNumber(tweet.retweets)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${tweet.isLiked ? 'text-red-400' : 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'}`}
                onClick={() => onLike?.(tweet.id)}
              >
                <span className="mr-2">{tweet.isLiked ? '❤️' : '🤍'}</span>
                {tweet.likes > 0 && formatNumber(tweet.likes)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 p-2"
              >
                <span>📤</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {showReplyForm && isMainTweet && (
        <Card className="mt-3 p-4 bg-black border-gray-800">
          <div className="flex space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gray-700 text-white">U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Tweet your reply"
                className="w-full bg-transparent text-white text-xl placeholder-gray-500 border-none outline-none resize-none"
                rows={3}
                maxLength={280}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-500 text-sm">
                  {280 - replyContent.length} characters remaining
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReply(tweet.id)}
                    disabled={!replyContent.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {tweet.nestedReplies && tweet.nestedReplies.length > 0 && (
        <div className="mt-3">
          {!expandedReplies.has(tweet.id) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpandReplies(tweet.id)}
              className="text-blue-400 hover:text-blue-300 ml-12"
            >
              Show {tweet.nestedReplies.length} {tweet.nestedReplies.length === 1 ? 'reply' : 'replies'}
            </Button>
          )}
          
          {expandedReplies.has(tweet.id) && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpandReplies(tweet.id)}
                className="text-blue-400 hover:text-blue-300 ml-12 mb-2"
              >
                Hide replies
              </Button>
              {tweet.nestedReplies.map((reply) => renderTweet(reply, false, depth + 1))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {renderTweet(mainTweet, true)}
      
      {replies.length > 0 && (
        <div className="space-y-3">
          <Separator className="bg-gray-800" />
          <h3 className="text-white font-bold text-lg px-4">Replies</h3>
          {replies.map((reply) => renderTweet(reply))}
        </div>
      )}
    </div>
  );
}