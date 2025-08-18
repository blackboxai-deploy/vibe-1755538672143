import { TweetComposer } from "@/components/tweet/tweet-composer";
import { TweetCard } from "@/components/tweet/tweet-card";
import { MainLayout } from "@/components/layout/main-layout";

const mockTweets = [
  {
    id: "1",
    author: {
      id: "1",
      name: "Sarah Chen",
      username: "sarahc_dev",
      avatar: "SC",
      verified: true
    },
    content: "Just shipped a new feature that reduces our API response time by 40%! Sometimes the smallest optimizations make the biggest difference. #webdev #performance",
    timestamp: "2h",
    likes: 127,
    retweets: 23,
    replies: 8,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    media: []
  },
  {
    id: "2",
    author: {
      id: "2",
      name: "Alex Rodriguez",
      username: "alexr_design",
      avatar: "AR",
      verified: false
    },
    content: "Hot take: The best user interfaces are the ones you don't notice. When design gets out of the way and lets users accomplish their goals effortlessly, that's when you know you've succeeded.",
    timestamp: "4h",
    likes: 89,
    retweets: 15,
    replies: 12,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true,
    media: []
  },
  {
    id: "3",
    author: {
      id: "3",
      name: "Tech News Daily",
      username: "technewsdaily",
      avatar: "TN",
      verified: true
    },
    content: "BREAKING: New study shows that remote work productivity has increased by 25% compared to pre-2020 levels. The future of work is here, and it's more flexible than ever.",
    timestamp: "6h",
    likes: 342,
    retweets: 156,
    replies: 45,
    isLiked: false,
    isRetweeted: true,
    isBookmarked: false,
    media: []
  },
  {
    id: "4",
    author: {
      id: "4",
      name: "Maya Patel",
      username: "maya_codes",
      avatar: "MP",
      verified: false
    },
    content: "Debugging is like being a detective in a crime movie where you are also the murderer. 🕵️‍♀️",
    timestamp: "8h",
    likes: 1205,
    retweets: 287,
    replies: 93,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true,
    media: []
  },
  {
    id: "5",
    author: {
      id: "5",
      name: "David Kim",
      username: "davidk_startup",
      avatar: "DK",
      verified: false
    },
    content: "Three years ago, our startup was just an idea on a napkin. Today, we're serving 100k+ users across 15 countries. The journey has been incredible, and we're just getting started. Grateful for every person who believed in our vision.",
    timestamp: "12h",
    likes: 567,
    retweets: 89,
    replies: 34,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    media: []
  },
  {
    id: "6",
    author: {
      id: "6",
      name: "Lisa Thompson",
      username: "lisa_ux",
      avatar: "LT",
      verified: true
    },
    content: "User research isn't just about asking what users want. It's about understanding what they need, observing what they do, and designing solutions that bridge the gap between intention and action.",
    timestamp: "1d",
    likes: 234,
    retweets: 67,
    replies: 19,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    media: []
  }
];

export default function HomePage() {
  return (
    <MainLayout>
      <div className="border-l border-r border-border min-h-screen">
        <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Home</h1>
            <div className="flex space-x-1">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-border">
          <div className="flex border-b border-border">
            <button className="flex-1 py-4 text-center font-medium hover:bg-muted/50 transition-colors border-b-2 border-primary text-primary">
              For you
            </button>
            <button className="flex-1 py-4 text-center font-medium hover:bg-muted/50 transition-colors text-muted-foreground">
              Following
            </button>
          </div>
        </div>

        <TweetComposer />

        <div className="divide-y divide-border">
          {mockTweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>

        <div className="p-8 text-center text-muted-foreground">
          <p>You've caught up with all the latest posts!</p>
        </div>
      </div>
    </MainLayout>
  );
}