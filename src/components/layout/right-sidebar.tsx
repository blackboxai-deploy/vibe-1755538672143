"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const trendingTopics = [
  { topic: "Technology", hashtag: "#AI", tweets: "125K" },
  { topic: "Sports", hashtag: "#WorldCup", tweets: "89K" },
  { topic: "Entertainment", hashtag: "#Movies", tweets: "67K" },
  { topic: "Politics", hashtag: "#Election2024", tweets: "234K" },
  { topic: "Gaming", hashtag: "#Gaming", tweets: "45K" }
]

const suggestedUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    bio: "Product Designer at TechCorp",
    verified: true,
    followers: "12.5K"
  },
  {
    id: "2", 
    name: "Alex Rodriguez",
    username: "alexr",
    bio: "Software Engineer & Open Source Contributor",
    verified: false,
    followers: "8.2K"
  },
  {
    id: "3",
    name: "Maya Patel",
    username: "mayapatel",
    bio: "AI Researcher & Tech Writer",
    verified: true,
    followers: "25.1K"
  }
]

export function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

  const handleFollow = (userId: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  return (
    <div className="w-80 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-muted/50 border-0 rounded-full pl-12 pr-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      {/* Trending Topics */}
      <Card className="bg-muted/30 border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold">What's happening</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {trendingTopics.map((trend, index) => (
            <div key={index} className="cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{trend.topic} · Trending</p>
                  <p className="font-semibold text-foreground hover:underline">{trend.hashtag}</p>
                  <p className="text-sm text-muted-foreground">{trend.tweets} posts</p>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </Button>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-start p-2 h-auto text-primary hover:bg-muted/50">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card className="bg-muted/30 border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <p className="font-semibold text-foreground truncate hover:underline cursor-pointer">
                    {user.name}
                  </p>
                  {user.verified && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0" className="flex-shrink-0">
                      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
                    </svg>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{user.bio}</p>
                <p className="text-xs text-muted-foreground mt-1">{user.followers} followers</p>
              </div>
              <Button
                variant={followedUsers.has(user.id) ? "outline" : "default"}
                size="sm"
                className={`ml-2 rounded-full px-4 ${
                  followedUsers.has(user.id) 
                    ? "hover:bg-destructive hover:text-destructive-foreground hover:border-destructive" 
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
                onClick={() => handleFollow(user.id)}
              >
                {followedUsers.has(user.id) ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-start p-2 h-auto text-primary hover:bg-muted/50">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
          <a href="#" className="hover:underline">More</a>
        </div>
        <p className="text-xs text-muted-foreground mt-2">© 2024 X Corp.</p>
      </div>
    </div>
  )
}