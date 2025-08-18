"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResult {
  id: string;
  type: "user" | "tweet" | "hashtag";
  content: any;
}

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  verified: boolean;
  followers: number;
}

interface Tweet {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "",
    bio: "Frontend developer passionate about React and TypeScript",
    verified: true,
    followers: 12500
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    username: "alexdev",
    avatar: "",
    bio: "Full-stack engineer | Open source contributor",
    verified: false,
    followers: 8900
  },
  {
    id: "3",
    name: "Maya Patel",
    username: "mayatech",
    avatar: "",
    bio: "Tech lead at startup | AI enthusiast",
    verified: true,
    followers: 15600
  }
];

const mockTweets: Tweet[] = [
  {
    id: "1",
    content: "Just shipped a new feature using Next.js 15! The performance improvements are incredible. #NextJS #WebDev",
    author: mockUsers[0],
    timestamp: "2h",
    likes: 234,
    retweets: 45,
    replies: 12
  },
  {
    id: "2",
    content: "Working on a new open source project that simplifies API development. Can't wait to share it with the community!",
    author: mockUsers[1],
    timestamp: "4h",
    likes: 156,
    retweets: 28,
    replies: 8
  },
  {
    id: "3",
    content: "The future of AI development is looking incredibly promising. Excited to see what we'll build next! #AI #TechTrends",
    author: mockUsers[2],
    timestamp: "6h",
    likes: 445,
    retweets: 89,
    replies: 23
  }
];

const mockHashtags = [
  { tag: "NextJS", tweets: 12500 },
  { tag: "WebDev", tweets: 45600 },
  { tag: "AI", tweets: 78900 },
  { tag: "TechTrends", tweets: 23400 },
  { tag: "OpenSource", tweets: 34500 }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    
    // Search users
    const userResults = mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    userResults.forEach(user => {
      results.push({ id: user.id, type: "user", content: user });
    });

    // Search tweets
    const tweetResults = mockTweets.filter(tweet =>
      tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    tweetResults.forEach(tweet => {
      results.push({ id: tweet.id, type: "tweet", content: tweet });
    });

    // Search hashtags
    const hashtagResults = mockHashtags.filter(hashtag =>
      hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    hashtagResults.forEach(hashtag => {
      results.push({ id: hashtag.tag, type: "hashtag", content: hashtag });
    });

    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const filterResults = (type?: string) => {
    if (!type || type === "all") return searchResults;
    return searchResults.filter(result => result.type === type);
  };

  const UserResult = ({ user }: { user: User }) => (
    <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
            {user.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm">@{user.username}</p>
          <p className="text-sm mt-1 line-clamp-2">{user.bio}</p>
          <p className="text-muted-foreground text-xs mt-1">
            {formatNumber(user.followers)} followers
          </p>
        </div>
        <Button variant="outline" size="sm">
          Follow
        </Button>
      </div>
    </Card>
  );

  const TweetResult = ({ tweet }: { tweet: Tweet }) => (
    <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={tweet.author.avatar} />
          <AvatarFallback>{tweet.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            <span className="font-semibold text-sm">{tweet.author.name}</span>
            {tweet.author.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-muted-foreground text-sm">@{tweet.author.username}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">{tweet.timestamp}</span>
          </div>
          <p className="text-sm mb-3">{tweet.content}</p>
          <div className="flex items-center space-x-6 text-muted-foreground">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <span className="text-sm">💬</span>
              <span className="text-xs">{tweet.replies}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
              <span className="text-sm">🔄</span>
              <span className="text-xs">{tweet.retweets}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              <span className="text-sm">❤️</span>
              <span className="text-xs">{tweet.likes}</span>
            </button>
            <button className="hover:text-blue-500 transition-colors">
              <span className="text-sm">📤</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  const HashtagResult = ({ hashtag }: { hashtag: any }) => (
    <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">#{hashtag.tag}</h3>
          <p className="text-muted-foreground text-sm">
            {formatNumber(hashtag.tweets)} posts
          </p>
        </div>
        <Badge variant="secondary">Trending</Badge>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Search Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search X"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        {/* Search Results */}
        <div className="p-4">
          {searchResults.length > 0 ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="user">People</TabsTrigger>
                <TabsTrigger value="tweet">Posts</TabsTrigger>
                <TabsTrigger value="hashtag">Hashtags</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {searchResults.map((result) => (
                  <div key={`${result.type}-${result.id}`}>
                    {result.type === "user" && <UserResult user={result.content} />}
                    {result.type === "tweet" && <TweetResult tweet={result.content} />}
                    {result.type === "hashtag" && <HashtagResult hashtag={result.content} />}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="user" className="space-y-4 mt-4">
                {filterResults("user").map((result) => (
                  <UserResult key={result.id} user={result.content} />
                ))}
              </TabsContent>

              <TabsContent value="tweet" className="space-y-4 mt-4">
                {filterResults("tweet").map((result) => (
                  <TweetResult key={result.id} tweet={result.content} />
                ))}
              </TabsContent>

              <TabsContent value="hashtag" className="space-y-4 mt-4">
                {filterResults("hashtag").map((result) => (
                  <HashtagResult key={result.id} hashtag={result.content} />
                ))}
              </TabsContent>
            </Tabs>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try searching for something else or check your spelling.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Trending now</h2>
                <div className="space-y-2">
                  {mockHashtags.slice(0, 5).map((hashtag) => (
                    <HashtagResult key={hashtag.tag} hashtag={hashtag} />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Suggested for you</h2>
                <div className="space-y-2">
                  {mockUsers.slice(0, 3).map((user) => (
                    <UserResult key={user.id} user={user} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}