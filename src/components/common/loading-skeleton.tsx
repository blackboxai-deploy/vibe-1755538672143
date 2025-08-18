import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

interface TweetSkeletonProps {
  showAvatar?: boolean
  showMedia?: boolean
}

function TweetSkeleton({ showAvatar = true, showMedia = false }: TweetSkeletonProps) {
  return (
    <div className="flex space-x-3 p-4 border-b border-border">
      {showAvatar && (
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      )}
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          {showMedia && (
            <Skeleton className="h-48 w-full rounded-lg mt-3" />
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-8">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface UserSkeletonProps {
  showBio?: boolean
  showStats?: boolean
}

function UserSkeleton({ showBio = true, showStats = true }: UserSkeletonProps) {
  return (
    <div className="flex items-start space-x-3 p-4">
      <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        {showBio && (
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        )}
        {showStats && (
          <div className="flex space-x-4 pt-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        )}
      </div>
    </div>
  )
}

function TrendingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-3 space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 rounded-full">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}

function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: count }).map((_, i) => (
        <TweetSkeleton 
          key={i} 
          showMedia={Math.random() > 0.7}
        />
      ))}
    </div>
  )
}

function ProfileHeaderSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="h-48 w-full" />
      <div className="absolute -bottom-16 left-4">
        <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
      </div>
      <div className="pt-20 px-4 pb-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex space-x-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <UserSkeleton key={i} showBio={false} showStats={false} />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <FeedSkeleton count={3} />
      </div>
    </div>
  )
}

export {
  Skeleton,
  TweetSkeleton,
  UserSkeleton,
  TrendingSkeleton,
  SidebarSkeleton,
  FeedSkeleton,
  ProfileHeaderSkeleton,
  SearchSkeleton
}