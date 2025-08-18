"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Tweet {
  id: string
  content: string
  author: {
    id: string
    name: string
    username: string
    avatar?: string
    verified: boolean
  }
  timestamp: string
  likes: number
  retweets: number
  replies: number
  isLiked: boolean
  isRetweeted: boolean
  isBookmarked: boolean
  media?: {
    type: 'image' | 'video'
    url: string
    alt?: string
  }[]
  replyTo?: {
    username: string
  }
}

interface TweetCardProps {
  tweet: Tweet
  onLike?: (tweetId: string) => void
  onRetweet?: (tweetId: string) => void
  onReply?: (tweetId: string) => void
  onBookmark?: (tweetId: string) => void
  onShare?: (tweetId: string) => void
  onClick?: (tweetId: string) => void
}

export function TweetCard({
  tweet,
  onLike,
  onRetweet,
  onReply,
  onBookmark,
  onShare,
  onClick
}: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(tweet.isLiked)
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted)
  const [isBookmarked, setIsBookmarked] = useState(tweet.isBookmarked)
  const [likes, setLikes] = useState(tweet.likes)
  const [retweets, setRetweets] = useState(tweet.retweets)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newLiked = !isLiked
    setIsLiked(newLiked)
    setLikes(prev => newLiked ? prev + 1 : prev - 1)
    onLike?.(tweet.id)
  }

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newRetweeted = !isRetweeted
    setIsRetweeted(newRetweeted)
    setRetweets(prev => newRetweeted ? prev + 1 : prev - 1)
    onRetweet?.(tweet.id)
  }

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation()
    onReply?.(tweet.id)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    onBookmark?.(tweet.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare?.(tweet.id)
  }

  const handleCardClick = () => {
    onClick?.(tweet.id)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return date.toLocaleDateString()
  }

  return (
    <Card 
      className="border-0 border-b border-border rounded-none bg-transparent hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-4">
        {tweet.replyTo && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="mr-2">↳</span>
            Replying to @{tweet.replyTo.username}
          </div>
        )}
        
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={tweet.author.avatar} alt={tweet.author.name} />
            <AvatarFallback>
              {tweet.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-bold text-foreground hover:underline cursor-pointer">
                {tweet.author.name}
              </span>
              {tweet.author.verified && (
                <Badge variant="secondary" className="w-4 h-4 p-0 bg-blue-500 hover:bg-blue-500">
                  <span className="text-white text-xs">✓</span>
                </Badge>
              )}
              <span className="text-muted-foreground">@{tweet.author.username}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{formatTimestamp(tweet.timestamp)}</span>
            </div>
            
            <div className="text-foreground mb-3 whitespace-pre-wrap break-words">
              {tweet.content}
            </div>
            
            {tweet.media && tweet.media.length > 0 && (
              <div className="mb-3 rounded-2xl overflow-hidden border border-border">
                {tweet.media.map((media, index) => (
                  <div key={index} className="relative">
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt={media.alt || 'Tweet image'}
                        className="w-full h-auto max-h-96 object-cover"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <video
                        src={media.url}
                        controls
                        className="w-full h-auto max-h-96"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 p-2 h-auto"
                onClick={handleReply}
              >
                <span className="mr-2">💬</span>
                {tweet.replies > 0 && (
                  <span className="text-sm">{formatNumber(tweet.replies)}</span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-green-500/10 p-2 h-auto ${
                  isRetweeted 
                    ? 'text-green-500' 
                    : 'text-muted-foreground hover:text-green-500'
                }`}
                onClick={handleRetweet}
              >
                <span className="mr-2">🔄</span>
                {retweets > 0 && (
                  <span className="text-sm">{formatNumber(retweets)}</span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-red-500/10 p-2 h-auto ${
                  isLiked 
                    ? 'text-red-500' 
                    : 'text-muted-foreground hover:text-red-500'
                }`}
                onClick={handleLike}
              >
                <span className="mr-2">{isLiked ? '❤️' : '🤍'}</span>
                {likes > 0 && (
                  <span className="text-sm">{formatNumber(likes)}</span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-blue-500/10 p-2 h-auto ${
                  isBookmarked 
                    ? 'text-blue-500' 
                    : 'text-muted-foreground hover:text-blue-500'
                }`}
                onClick={handleBookmark}
              >
                <span>{isBookmarked ? '🔖' : '📑'}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 p-2 h-auto"
                onClick={handleShare}
              >
                <span>📤</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}