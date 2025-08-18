export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location?: string;
  website?: string;
  verified: boolean;
  followersCount: number;
  followingCount: number;
  tweetsCount: number;
  joinedDate: string;
  coverImage?: string;
  isFollowing?: boolean;
}

export interface Tweet {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likesCount: number;
  retweetsCount: number;
  repliesCount: number;
  bookmarksCount: number;
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  media?: Media[];
  replyTo?: string;
  quoteTweet?: Tweet;
  mentions?: string[];
  hashtags?: string[];
}

export interface Media {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface TrendingTopic {
  id: string;
  name: string;
  category: string;
  tweetsCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Notification {
  id: string;
  type: 'like' | 'retweet' | 'reply' | 'follow' | 'mention';
  user: User;
  tweet?: Tweet;
  createdAt: string;
  read: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  recipient: User;
  createdAt: string;
  read: boolean;
  media?: Media[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface SearchResult {
  tweets: Tweet[];
  users: User[];
  trending: TrendingTopic[];
}

export interface UserStats {
  tweetsCount: number;
  followersCount: number;
  followingCount: number;
  likesCount: number;
}

export interface TweetInteraction {
  type: 'like' | 'retweet' | 'reply' | 'bookmark' | 'share';
  tweetId: string;
  userId: string;
}

export interface ComposeTweetData {
  content: string;
  media?: File[];
  replyTo?: string;
  quoteTweet?: string;
}

export interface UserProfile extends User {
  pinnedTweet?: Tweet;
  isPrivate: boolean;
  isBlocked: boolean;
  isMuted: boolean;
}

export interface TimelineFilter {
  type: 'for-you' | 'following';
  includeReplies: boolean;
  includeRetweets: boolean;
}

export interface SearchFilters {
  type: 'latest' | 'top' | 'people' | 'photos' | 'videos';
  dateRange?: 'day' | 'week' | 'month' | 'year';
  location?: string;
  language?: string;
}