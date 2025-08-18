import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  name: string
  username: string
  bio: string
  location: string
  website: string
  joinDate: string
  following: number
  followers: number
  verified: boolean
  avatar: string
  coverImage: string
}

interface Tweet {
  id: string
  content: string
  author: User
  timestamp: string
  likes: number
  retweets: number
  replies: number
  liked: boolean
  retweeted: boolean
}

const mockUsers: Record<string, User> = {
  'john_doe': {
    id: 'john_doe',
    name: 'John Doe',
    username: 'john_doe',
    bio: 'Software engineer passionate about web development and open source. Building the future one commit at a time.',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    joinDate: 'March 2019',
    following: 1234,
    followers: 5678,
    verified: true,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/600/200'
  },
  'jane_smith': {
    id: 'jane_smith',
    name: 'Jane Smith',
    username: 'jane_smith',
    bio: 'Product designer & UX enthusiast. Creating beautiful and functional digital experiences.',
    location: 'New York, NY',
    website: 'janesmith.design',
    joinDate: 'July 2020',
    following: 892,
    followers: 3456,
    verified: false,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/600/200'
  }
}

const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'Just shipped a new feature! The feeling of seeing your code in production never gets old. Time to celebrate with some coffee ☕',
    author: mockUsers['john_doe'],
    timestamp: '2h',
    likes: 42,
    retweets: 12,
    replies: 8,
    liked: false,
    retweeted: false
  },
  {
    id: '2',
    content: 'Working on some exciting new projects. Can\'t wait to share what we\'ve been building. The future of web development is looking bright! 🚀',
    author: mockUsers['john_doe'],
    timestamp: '5h',
    likes: 128,
    retweets: 34,
    replies: 23,
    liked: true,
    retweeted: false
  },
  {
    id: '3',
    content: 'Beautiful sunset today. Sometimes you need to step away from the screen and appreciate the world around you. Nature is the best designer.',
    author: mockUsers['john_doe'],
    timestamp: '1d',
    likes: 89,
    retweets: 15,
    replies: 12,
    liked: false,
    retweeted: true
  }
]

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <Card className="p-4 border-b border-gray-800 bg-black hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={tweet.author.avatar} alt={tweet.author.name} />
          <AvatarFallback>{tweet.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-white truncate">{tweet.author.name}</h3>
            {tweet.author.verified && (
              <Badge variant="secondary" className="text-xs bg-blue-500 text-white">✓</Badge>
            )}
            <span className="text-gray-500 truncate">@{tweet.author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{tweet.timestamp}</span>
          </div>
          <p className="mt-2 text-white whitespace-pre-wrap">{tweet.content}</p>
          <div className="flex items-center justify-between mt-4 max-w-md">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-400 hover:bg-blue-400/10">
              💬 {tweet.replies}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-gray-500 hover:text-green-400 hover:bg-green-400/10 ${tweet.retweeted ? 'text-green-400' : ''}`}
            >
              🔄 {tweet.retweets}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-gray-500 hover:text-red-400 hover:bg-red-400/10 ${tweet.liked ? 'text-red-400' : ''}`}
            >
              ❤️ {tweet.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-400 hover:bg-blue-400/10">
              📤
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const user = mockUsers[id]
  
  if (!user) {
    return {
      title: 'Profile not found'
    }
  }

  return {
    title: `${user.name} (@${user.username}) / X`,
    description: user.bio
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = mockUsers[id]
  const userTweets = mockTweets.filter(tweet => tweet.author.id === id)

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto border-x border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
              ←
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <p className="text-sm text-gray-500">{userTweets.length} posts</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="h-48 bg-gray-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <Avatar className="w-32 h-32 border-4 border-black">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button className="mt-16 bg-white text-black hover:bg-gray-200 font-bold">
              Follow
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                {user.verified && (
                  <Badge variant="secondary" className="bg-blue-500 text-white">✓</Badge>
                )}
              </div>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            <p className="text-white">{user.bio}</p>

            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              {user.location && (
                <span className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{user.location}</span>
                </span>
              )}
              {user.website && (
                <span className="flex items-center space-x-1">
                  <span>🔗</span>
                  <span className="text-blue-400 hover:underline cursor-pointer">{user.website}</span>
                </span>
              )}
              <span className="flex items-center space-x-1">
                <span>📅</span>
                <span>Joined {user.joinDate}</span>
              </span>
            </div>

            <div className="flex space-x-6">
              <span className="text-white">
                <span className="font-bold">{user.following.toLocaleString()}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </span>
              <span className="text-white">
                <span className="font-bold">{user.followers.toLocaleString()}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full bg-black border-b border-gray-800 rounded-none h-auto p-0">
            <TabsTrigger 
              value="posts" 
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-4 text-gray-500 hover:bg-gray-900"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="replies" 
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-4 text-gray-500 hover:bg-gray-900"
            >
              Replies
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-4 text-gray-500 hover:bg-gray-900"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes" 
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-4 text-gray-500 hover:bg-gray-900"
            >
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            <div className="divide-y divide-gray-800">
              {userTweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))}
              {userTweets.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No posts yet</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="replies" className="mt-0">
            <div className="p-8 text-center text-gray-500">
              <p>No replies yet</p>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <div className="p-8 text-center text-gray-500">
              <p>No media yet</p>
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-0">
            <div className="p-8 text-center text-gray-500">
              <p>No likes yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}