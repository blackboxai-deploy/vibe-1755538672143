"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    bio?: string
    location?: string
    website?: string
    joinDate: string
    verified: boolean
    following: number
    followers: number
    tweets: number
    avatar?: string
    coverImage?: string
  }
  isOwnProfile?: boolean
  isFollowing?: boolean
  onFollow?: () => void
  onUnfollow?: () => void
  onEditProfile?: () => void
}

export function UserProfile({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onUnfollow,
  onEditProfile
}: UserProfileProps) {
  const [following, setFollowing] = useState(isFollowing)

  const handleFollowClick = () => {
    if (following) {
      setFollowing(false)
      onUnfollow?.()
    } else {
      setFollowing(true)
      onFollow?.()
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    })
  }

  return (
    <Card className="border-0 rounded-none bg-background">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Content */}
      <div className="px-4 pb-4">
        {/* Avatar and Action Button */}
        <div className="flex justify-between items-start -mt-16 mb-4">
          <Avatar className="w-32 h-32 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="mt-16">
            {isOwnProfile ? (
              <Button
                variant="outline"
                onClick={onEditProfile}
                className="rounded-full px-6"
              >
                Edit profile
              </Button>
            ) : (
              <Button
                variant={following ? "outline" : "default"}
                onClick={handleFollowClick}
                className="rounded-full px-6"
              >
                {following ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{user.name}</h1>
              {user.verified && (
                <Badge variant="secondary" className="text-xs">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>

          {user.bio && (
            <p className="text-sm leading-relaxed">{user.bio}</p>
          )}

          {/* Additional Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-1">
                <span>🔗</span>
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>Joined {formatJoinDate(user.joinDate)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex gap-1">
              <span className="font-bold">{formatNumber(user.following)}</span>
              <span className="text-muted-foreground">Following</span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold">{formatNumber(user.followers)}</span>
              <span className="text-muted-foreground">Followers</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button className="flex-1 py-4 text-center font-medium border-b-2 border-blue-500 text-blue-500">
          Posts
        </button>
        <button className="flex-1 py-4 text-center font-medium text-muted-foreground hover:bg-muted/50">
          Replies
        </button>
        <button className="flex-1 py-4 text-center font-medium text-muted-foreground hover:bg-muted/50">
          Media
        </button>
        <button className="flex-1 py-4 text-center font-medium text-muted-foreground hover:bg-muted/50">
          Likes
        </button>
      </div>
    </Card>
  )
}