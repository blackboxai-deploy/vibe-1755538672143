"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FollowButtonProps {
  userId: string
  username: string
  initialFollowing?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function FollowButton({
  userId,
  username,
  initialFollowing = false,
  variant = "default",
  size = "default",
  className
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsFollowing(!isFollowing)
    setIsLoading(false)
  }

  const getButtonText = () => {
    if (isLoading) return "..."
    if (isFollowing) {
      return isHovered ? "Unfollow" : "Following"
    }
    return "Follow"
  }

  const getButtonVariant = () => {
    if (isFollowing) {
      return isHovered ? "destructive" : "outline"
    }
    return variant
  }

  return (
    <Button
      onClick={handleFollow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant={getButtonVariant()}
      size={size}
      disabled={isLoading}
      className={cn(
        "min-w-[80px] font-semibold transition-all duration-200",
        isFollowing && "border-gray-600 text-white",
        isFollowing && isHovered && "border-red-600 bg-red-600 text-white",
        !isFollowing && "bg-white text-black hover:bg-gray-200",
        className
      )}
    >
      {getButtonText()}
    </Button>
  )
}