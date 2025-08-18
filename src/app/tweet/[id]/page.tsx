import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Tweet {
  id: string
  content: string
  author: {
    id: string
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  timestamp: string
  likes: number
  retweets: number
  replies: number
  isLiked: boolean
  isRetweeted: boolean
  media?: string[]
  replyTo?: string
}

interface Reply extends Tweet {
  replyTo: string
}

const mockTweets: Record<string, Tweet> = {
  '1': {
    id: '1',
    content: 'Just shipped a major update to our platform! The new real-time collaboration features are going to change how teams work together. Excited to see what you all build with it! 🚀',
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      username: 'sarahbuilds',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    timestamp: '2024-01-15T10:30:00Z',
    likes: 1247,
    retweets: 342,
    replies: 89,
    isLiked: false,
    isRetweeted: false,
    media: ['/api/placeholder/500/300']
  },
  '2': {
    id: '2',
    content: 'The future of AI is not about replacing humans, but about augmenting human creativity and problem-solving capabilities. We are building tools that make people more capable, not obsolete.',
    author: {
      id: 'user2',
      name: 'Alex Rodriguez',
      username: 'alexthinks',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    timestamp: '2024-01-15T14:22:00Z',
    likes: 2156,
    retweets: 891,
    replies: 234,
    isLiked: true,
    isRetweeted: false
  },
  '3': {
    id: '3',
    content: 'Coffee shop coding session complete ☕ Sometimes the best debugging happens away from your usual desk. What is your favorite place to code?',
    author: {
      id: 'user3',
      name: 'Maya Patel',
      username: 'mayacodes',
      avatar: '/api/placeholder/40/40',
      verified: false
    },
    timestamp: '2024-01-15T16:45:00Z',
    likes: 423,
    retweets: 67,
    replies: 156,
    isLiked: false,
    isRetweeted: true
  }
}

const mockReplies: Record<string, Reply[]> = {
  '1': [
    {
      id: 'r1',
      content: 'This looks amazing! When will the API documentation be available?',
      author: {
        id: 'user4',
        name: 'Dev Kumar',
        username: 'devkumar',
        avatar: '/api/placeholder/40/40',
        verified: false
      },
      timestamp: '2024-01-15T10:45:00Z',
      likes: 23,
      retweets: 2,
      replies: 5,
      isLiked: false,
      isRetweeted: false,
      replyTo: '1'
    },
    {
      id: 'r2',
      content: 'Congratulations on the launch! The real-time features are exactly what our team needed.',
      author: {
        id: 'user5',
        name: 'Lisa Wong',
        username: 'lisadesigns',
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      timestamp: '2024-01-15T11:20:00Z',
      likes: 45,
      retweets: 8,
      replies: 2,
      isLiked: true,
      isRetweeted: false,
      replyTo: '1'
    }
  ],
  '2': [
    {
      id: 'r3',
      content: 'Completely agree! AI should be a tool that empowers human creativity, not replaces it.',
      author: {
        id: 'user6',
        name: 'Jordan Smith',
        username: 'jordanai',
        avatar: '/api/placeholder/40/40',
        verified: false
      },
      timestamp: '2024-01-15T14:35:00Z',
      likes: 67,
      retweets: 12,
      replies: 8,
      isLiked: false,
      isRetweeted: true,
      replyTo: '2'
    }
  ],
  '3': [
    {
      id: 'r4',
      content: 'I love coding in libraries! The quiet atmosphere really helps me focus.',
      author: {
        id: 'user7',
        name: 'Emma Johnson',
        username: 'emmacodes',
        avatar: '/api/placeholder/40/40',
        verified: false
      },
      timestamp: '2024-01-15T17:10:00Z',
      likes: 12,
      retweets: 1,
      replies: 3,
      isLiked: false,
      isRetweeted: false,
      replyTo: '3'
    }
  ]
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

function TweetCard({ tweet, isMainTweet = false }: { tweet: Tweet | Reply; isMainTweet?: boolean }) {
  return (
    <Card className={`p-4 ${isMainTweet ? 'border-none shadow-none' : ''}`}>
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={tweet.author.avatar} alt={tweet.author.name} />
          <AvatarFallback>{tweet.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-foreground truncate">{tweet.author.name}</h3>
            {tweet.author.verified && (
              <Badge variant="secondary" className="text-xs px-1 py-0">✓</Badge>
            )}
            <span className="text-muted-foreground text-sm truncate">@{tweet.author.username}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">{formatTimestamp(tweet.timestamp)}</span>
          </div>
          
          <div className={`mt-2 ${isMainTweet ? 'text-xl leading-relaxed' : ''}`}>
            <p className="text-foreground whitespace-pre-wrap">{tweet.content}</p>
            
            {tweet.media && tweet.media.length > 0 && (
              <div className="mt-3">
                <img 
                  src={tweet.media[0]} 
                  alt="Tweet media" 
                  className="rounded-lg max-w-full h-auto border border-border"
                />
              </div>
            )}
          </div>
          
          {isMainTweet && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <span><strong className="text-foreground">{formatNumber(tweet.retweets)}</strong> Retweets</span>
                <span><strong className="text-foreground">{formatNumber(tweet.likes)}</strong> Likes</span>
                <span><strong className="text-foreground">{formatNumber(tweet.replies)}</strong> Replies</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 max-w-md">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10">
              <span className="mr-2">💬</span>
              {!isMainTweet && formatNumber(tweet.replies)}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-muted-foreground hover:text-green-500 hover:bg-green-500/10 ${
                tweet.isRetweeted ? 'text-green-500' : ''
              }`}
            >
              <span className="mr-2">🔄</span>
              {!isMainTweet && formatNumber(tweet.retweets)}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-muted-foreground hover:text-red-500 hover:bg-red-500/10 ${
                tweet.isLiked ? 'text-red-500' : ''
              }`}
            >
              <span className="mr-2">{tweet.isLiked ? '❤️' : '🤍'}</span>
              {!isMainTweet && formatNumber(tweet.likes)}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10">
              <span>📤</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ReplyComposer() {
  return (
    <Card className="p-4">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/api/placeholder/40/40" alt="Your avatar" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <textarea
            placeholder="Tweet your reply"
            className="w-full bg-transparent text-xl placeholder-muted-foreground resize-none border-none outline-none"
            rows={3}
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                📷
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                📊
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                😊
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                📅
              </Button>
            </div>
            
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
              Reply
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default async function TweetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tweet = mockTweets[id]
  const replies = mockReplies[id] || []
  
  if (!tweet) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto border-x border-border min-h-screen">
        <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground">
              ←
            </Button>
            <h1 className="text-xl font-bold">Tweet</h1>
          </div>
        </div>
        
        <div className="p-4">
          <TweetCard tweet={tweet} isMainTweet={true} />
        </div>
        
        <Separator />
        
        <div className="p-4">
          <ReplyComposer />
        </div>
        
        <Separator />
        
        <div>
          {replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply.id} className="border-b border-border last:border-b-0">
                <TweetCard tweet={reply} />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-lg">No replies yet</p>
              <p className="text-sm mt-2">Be the first to reply to this tweet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}