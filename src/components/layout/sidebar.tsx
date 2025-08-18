"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/", icon: "🏠" },
  { name: "Explore", href: "/explore", icon: "🔍" },
  { name: "Notifications", href: "/notifications", icon: "🔔" },
  { name: "Messages", href: "/messages", icon: "✉️" },
  { name: "Bookmarks", href: "/bookmarks", icon: "🔖" },
  { name: "Profile", href: "/profile/johndoe", icon: "👤" },
  { name: "More", href: "/more", icon: "⋯" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isComposing, setIsComposing] = useState(false)

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8 px-3">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">𝕏</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-4 px-3 py-3 rounded-full text-xl transition-colors hover:bg-accent",
              pathname === item.href && "font-bold"
            )}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="hidden lg:block">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Post Button */}
      <div className="mb-4">
        <Button
          onClick={() => setIsComposing(true)}
          className="w-full lg:w-auto lg:px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          size="lg"
        >
          <span className="lg:hidden text-xl">✏️</span>
          <span className="hidden lg:block">Post</span>
        </Button>
      </div>

      {/* User Profile */}
      <div className="border-t border-border pt-4">
        <Link
          href="/profile/johndoe"
          className="flex items-center space-x-3 p-3 rounded-full hover:bg-accent transition-colors"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src="/api/placeholder/40/40" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">John Doe</p>
            <p className="text-muted-foreground text-sm truncate">@johndoe</p>
          </div>
          <div className="hidden lg:block">
            <span className="text-muted-foreground">⋯</span>
          </div>
        </Link>
      </div>
    </div>
  )
}