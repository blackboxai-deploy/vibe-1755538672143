export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  verified: boolean;
  followers: number;
  following: number;
  tweets: number;
  location?: string;
  website?: string;
  joinDate: string;
  coverImage?: string;
}

export interface Tweet {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  liked: boolean;
  retweeted: boolean;
  bookmarked: boolean;
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  }[];
  replyTo?: string;
  isRetweet?: boolean;
  originalTweet?: Tweet;
}

export interface TrendingTopic {
  id: string;
  hashtag: string;
  category: string;
  tweets: number;
  trending: 'up' | 'down' | 'stable';
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    username: 'alexchen',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2f828025-b64d-401e-a449-2410cefb9cc5.png',
    bio: 'Software engineer passionate about web development and open source. Building the future one commit at a time.',
    verified: true,
    followers: 12500,
    following: 890,
    tweets: 3420,
    location: 'San Francisco, CA',
    website: 'alexchen.dev',
    joinDate: 'March 2019',
    coverImage: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/353e998b-353b-4b99-a490-7fa04cd212aa.png'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0d8f5cad-c0c3-42e5-9f4a-57478c449421.png',
    bio: 'UX Designer | Tech enthusiast | Coffee lover ☕ | Sharing design tips and industry insights',
    verified: false,
    followers: 8900,
    following: 1200,
    tweets: 2100,
    location: 'New York, NY',
    website: 'sarahdesigns.com',
    joinDate: 'July 2020',
    coverImage: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1bda60c7-eb90-4ea5-9f5d-20b2aa256c51.png'
  },
  {
    id: '3',
    name: 'Tech News Daily',
    username: 'technewsdaily',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8755c3cf-e532-48a8-b30d-96614c0972cc.png',
    bio: 'Breaking tech news, product launches, and industry analysis. Stay updated with the latest in technology.',
    verified: true,
    followers: 45000,
    following: 500,
    tweets: 8900,
    location: 'Global',
    website: 'technewsdaily.com',
    joinDate: 'January 2018',
    coverImage: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/50eee5c9-3979-49a6-a71c-42f69ef9c5c8.png'
  },
  {
    id: '4',
    name: 'Maria Rodriguez',
    username: 'maria_codes',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/037e4ef0-51f2-4661-9388-d89d107854a8.png',
    bio: 'Full-stack developer | React enthusiast | Teaching coding to the next generation 👩‍💻',
    verified: false,
    followers: 6700,
    following: 980,
    tweets: 1850,
    location: 'Austin, TX',
    website: 'mariacodes.io',
    joinDate: 'September 2021',
    coverImage: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d4c4601b-654e-4b4a-969f-32abe773d07e.png'
  },
  {
    id: '5',
    name: 'David Kim',
    username: 'davidkim',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bae802fb-47cb-4ed7-840e-58a1ced974bb.png',
    bio: 'Product Manager at TechCorp | AI & ML enthusiast | Sharing insights on product strategy and innovation',
    verified: true,
    followers: 15200,
    following: 750,
    tweets: 4200,
    location: 'Seattle, WA',
    website: 'davidkim.pm',
    joinDate: 'May 2019',
    coverImage: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4b37da6c-69e4-46ae-8e5a-96a3aacb8299.png'
  }
];

export const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'Just shipped a new feature that reduces page load time by 40%! The key was optimizing our bundle size and implementing proper code splitting. Performance matters! 🚀',
    author: mockUsers[0],
    timestamp: '2024-01-15T10:30:00Z',
    likes: 234,
    retweets: 45,
    replies: 12,
    views: 2800,
    liked: false,
    retweeted: false,
    bookmarked: true
  },
  {
    id: '2',
    content: 'Hot take: The best user interfaces are the ones you don\'t notice. When design is truly intuitive, users focus on their goals, not figuring out how to use your product.',
    author: mockUsers[1],
    timestamp: '2024-01-15T09:15:00Z',
    likes: 189,
    retweets: 67,
    replies: 23,
    views: 3200,
    liked: true,
    retweeted: false,
    bookmarked: false
  },
  {
    id: '3',
    content: 'BREAKING: Major tech company announces new AI model that can generate code from natural language descriptions. This could revolutionize how we approach software development.',
    author: mockUsers[2],
    timestamp: '2024-01-15T08:45:00Z',
    likes: 892,
    retweets: 234,
    replies: 156,
    views: 12500,
    liked: false,
    retweeted: true,
    bookmarked: true
  },
  {
    id: '4',
    content: 'Teaching my first React workshop today! Excited to share the magic of component-based architecture with new developers. There\'s nothing quite like that "aha!" moment when hooks finally click 💡',
    author: mockUsers[3],
    timestamp: '2024-01-15T07:20:00Z',
    likes: 156,
    retweets: 28,
    replies: 34,
    views: 1900,
    liked: true,
    retweeted: false,
    bookmarked: false
  },
  {
    id: '5',
    content: 'Product strategy tip: Always validate your assumptions with real user data. What seems obvious to your team might be completely wrong. User research saves time, money, and relationships.',
    author: mockUsers[4],
    timestamp: '2024-01-15T06:30:00Z',
    likes: 445,
    retweets: 89,
    replies: 67,
    views: 5600,
    liked: false,
    retweeted: false,
    bookmarked: true
  },
  {
    id: '6',
    content: 'Working on a new open source project that aims to simplify state management in React apps. Early feedback has been incredible! Can\'t wait to share more details soon 👀',
    author: mockUsers[0],
    timestamp: '2024-01-14T22:15:00Z',
    likes: 312,
    retweets: 56,
    replies: 45,
    views: 4100,
    liked: true,
    retweeted: true,
    bookmarked: false
  },
  {
    id: '7',
    content: 'Design systems aren\'t just about consistency—they\'re about empowering teams to move faster while maintaining quality. When done right, they become a competitive advantage.',
    author: mockUsers[1],
    timestamp: '2024-01-14T20:45:00Z',
    likes: 278,
    retweets: 72,
    replies: 19,
    views: 3800,
    liked: false,
    retweeted: false,
    bookmarked: true
  },
  {
    id: '8',
    content: 'The future of web development is here: Server Components, Edge Computing, and AI-assisted coding. We\'re living in exciting times! What trends are you most excited about?',
    author: mockUsers[2],
    timestamp: '2024-01-14T18:30:00Z',
    likes: 567,
    retweets: 123,
    replies: 89,
    views: 8900,
    liked: true,
    retweeted: false,
    bookmarked: false
  }
];

export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: '1',
    hashtag: '#WebDevelopment',
    category: 'Technology',
    tweets: 45600,
    trending: 'up'
  },
  {
    id: '2',
    hashtag: '#ReactJS',
    category: 'Programming',
    tweets: 23400,
    trending: 'up'
  },
  {
    id: '3',
    hashtag: '#UXDesign',
    category: 'Design',
    tweets: 18900,
    trending: 'stable'
  },
  {
    id: '4',
    hashtag: '#AI',
    category: 'Technology',
    tweets: 67800,
    trending: 'up'
  },
  {
    id: '5',
    hashtag: '#OpenSource',
    category: 'Programming',
    tweets: 12300,
    trending: 'down'
  },
  {
    id: '6',
    hashtag: '#TechNews',
    category: 'News',
    tweets: 34500,
    trending: 'stable'
  }
];

export const getCurrentUser = (): User => mockUsers[0];

export const getTweetById = (id: string): Tweet | undefined => {
  return mockTweets.find(tweet => tweet.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserTweets = (userId: string): Tweet[] => {
  return mockTweets.filter(tweet => tweet.author.id === userId);
};

export const getTimelineTweets = (): Tweet[] => {
  return mockTweets.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const searchTweets = (query: string): Tweet[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockTweets.filter(tweet => 
    tweet.content.toLowerCase().includes(lowercaseQuery) ||
    tweet.author.name.toLowerCase().includes(lowercaseQuery) ||
    tweet.author.username.toLowerCase().includes(lowercaseQuery)
  );
};

export const getSuggestedUsers = (currentUserId: string): User[] => {
  return mockUsers.filter(user => user.id !== currentUserId).slice(0, 3);
};