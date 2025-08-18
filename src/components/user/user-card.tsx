import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  username: string
  avatar?: string
  bio?: string
  verified?: boolean
  followers: number
  following: number
  isFollowing?: boolean
}

interface UserCardProps {
  user: User
  onFollow?: (userId: string) => void
  onUnfollow?: (userId: string) => void
  showBio?: boolean
  showStats?: boolean
  compact?: boolean
}

export function UserCard({ 
  user, 
  onFollow, 
  onUnfollow, 
  showBio = true, 
  showStats = true,
  compact = false 
}: UserCardProps) {
  const handleFollowClick = () => {
    if (user.isFollowing) {
      onUnfollow?.(user.id)
    } else {
      onFollow?.(user.id)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name}
              </p>
              {user.verified && (
                <Badge variant="secondary" className="h-4 w-4 p-0 rounded-full bg-blue-500">
                  <span className="text-white text-xs">✓</span>
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
          </div>
        </div>
        {(onFollow || onUnfollow) && (
          <Button
            variant={user.isFollowing ? "outline" : "default"}
            size="sm"
            onClick={handleFollowClick}
            className="ml-2"
          >
            {user.isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    )
  }

  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-foreground truncate">
                  {user.name}
                </h3>
                {user.verified && (
                  <Badge variant="secondary" className="h-5 w-5 p-0 rounded-full bg-blue-500">
                    <span className="text-white text-xs">✓</span>
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
              {showBio && user.bio && (
                <p className="text-sm text-foreground mt-2 line-clamp-2">
                  {user.bio}
                </p>
              )}
              {showStats && (
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <span>
                    <span className="font-semibold text-foreground">
                      {formatNumber(user.following)}
                    </span>{" "}
                    Following
                  </span>
                  <span>
                    <span className="font-semibold text-foreground">
                      {formatNumber(user.followers)}
                    </span>{" "}
                    Followers
                  </span>
                </div>
              )}
            </div>
          </div>
          {(onFollow || onUnfollow) && (
            <Button
              variant={user.isFollowing ? "outline" : "default"}
              size="sm"
              onClick={handleFollowClick}
              className="ml-3 shrink-0"
            >
              {user.isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}