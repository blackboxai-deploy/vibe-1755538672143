"use client"

import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { RightSidebar } from "./right-sidebar"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:flex md:w-64 lg:w-80 flex-shrink-0">
          <div className="fixed h-full w-64 lg:w-80">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-gray-800">
          <main className="min-h-screen">
            {children}
          </main>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex lg:w-80 flex-shrink-0">
          <div className="fixed h-full w-80">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-3 text-white hover:bg-gray-900 rounded-lg transition-colors">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.696L6.5 6.696v14.5h3v-9h5v9h3v-14.5L12 1.696z"/>
              </svg>
            </div>
            <span className="text-xs">Home</span>
          </button>
          
          <button className="flex flex-col items-center p-3 text-gray-500 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
              </svg>
            </div>
            <span className="text-xs">Search</span>
          </button>
          
          <button className="flex flex-col items-center p-3 text-gray-500 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004zm4.5-9.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm2.458-8.73l1.414 1.414L14.5 3.975l-1.414-1.414 1.373-1.374zm6.292 21.067c-.681.681-1.796.681-2.477 0l-3.068-3.069-.283-.283c-1.814-1.814-1.814-4.75 0-6.565.906-.906 2.094-1.359 3.283-1.359s2.377.453 3.283 1.359c1.814 1.814 1.814 4.75 0 6.565l-.283.283-3.455 3.069z"/>
              </svg>
            </div>
            <span className="text-xs">Notifications</span>
          </button>
          
          <button className="flex flex-col items-center p-3 text-gray-500 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/>
              </svg>
            </div>
            <span className="text-xs">Messages</span>
          </button>
        </div>
      </div>
    </div>
  )
}