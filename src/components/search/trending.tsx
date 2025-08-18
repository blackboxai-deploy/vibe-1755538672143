import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrendingTopic {
  id: string;
  category: string;
  hashtag: string;
  tweetCount: number;
  isPromoted?: boolean;
}

interface TrendingProps {
  className?: string;
}

const mockTrendingData: TrendingTopic[] = [
  {
    id: '1',
    category: 'Technology',
    hashtag: 'AI',
    tweetCount: 125000,
    isPromoted: false
  },
  {
    id: '2',
    category: 'Sports',
    hashtag: 'WorldCup',
    tweetCount: 89000,
    isPromoted: true
  },
  {
    id: '3',
    category: 'Entertainment',
    hashtag: 'Netflix',
    tweetCount: 67000,
    isPromoted: false
  },
  {
    id: '4',
    category: 'Politics',
    hashtag: 'Election2024',
    tweetCount: 156000,
    isPromoted: false
  },
  {
    id: '5',
    category: 'Gaming',
    hashtag: 'PlayStation',
    tweetCount: 43000,
    isPromoted: false
  },
  {
    id: '6',
    category: 'Music',
    hashtag: 'Grammys',
    tweetCount: 78000,
    isPromoted: false
  },
  {
    id: '7',
    category: 'Technology',
    hashtag: 'iPhone',
    tweetCount: 92000,
    isPromoted: false
  },
  {
    id: '8',
    category: 'Business',
    hashtag: 'Crypto',
    tweetCount: 134000,
    isPromoted: false
  }
];

const formatTweetCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export function Trending({ className }: TrendingProps) {
  return (
    <Card className={`${className} bg-card border-border`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-foreground">
          What's happening
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {mockTrendingData.slice(0, 6).map((topic, index) => (
            <div
              key={topic.id}
              className="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors duration-200 border-b border-border last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">
                      {index + 1} · Trending in {topic.category}
                    </span>
                    {topic.isPromoted && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        Promoted
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1 truncate">
                    #{topic.hashtag}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatTweetCount(topic.tweetCount)} posts
                  </p>
                </div>
                <button
                  className="ml-2 p-1 rounded-full hover:bg-muted/50 transition-colors duration-200"
                  aria-label="More options"
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-border">
          <button className="text-primary hover:underline text-sm font-medium">
            Show more
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Trending;