"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  senderAvatar?: string;
}

interface Conversation {
  id: string;
  participantName: string;
  participantUsername: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participantName: "Sarah Chen",
    participantUsername: "sarahc",
    lastMessage: "Thanks for sharing that article!",
    lastMessageTime: "2m",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    participantName: "Alex Rodriguez",
    participantUsername: "alexr",
    lastMessage: "Let's catch up soon",
    lastMessageTime: "1h",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    participantName: "Emma Wilson",
    participantUsername: "emmaw",
    lastMessage: "Great presentation today!",
    lastMessageTime: "3h",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "4",
    participantName: "David Kim",
    participantUsername: "davidk",
    lastMessage: "See you at the conference",
    lastMessageTime: "1d",
    unreadCount: 0,
    isOnline: false,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey! How's your day going?",
    timestamp: "10:30 AM",
    senderId: "other",
    senderName: "Sarah Chen",
    senderUsername: "sarahc",
  },
  {
    id: "2",
    content: "Pretty good! Just finished a big project. How about you?",
    timestamp: "10:32 AM",
    senderId: "me",
    senderName: "You",
    senderUsername: "you",
  },
  {
    id: "3",
    content: "That's awesome! I saw your post about the new feature launch. Congratulations!",
    timestamp: "10:35 AM",
    senderId: "other",
    senderName: "Sarah Chen",
    senderUsername: "sarahc",
  },
  {
    id: "4",
    content: "Thank you! It was a team effort. Really excited about the user feedback so far.",
    timestamp: "10:37 AM",
    senderId: "me",
    senderName: "You",
    senderUsername: "you",
  },
  {
    id: "5",
    content: "I shared that article you mentioned yesterday. Thanks for the recommendation!",
    timestamp: "10:40 AM",
    senderId: "other",
    senderName: "Sarah Chen",
    senderUsername: "sarahc",
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participantUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = mockConversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Input
              placeholder="Search Direct Messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`mb-2 cursor-pointer transition-colors ${
                  selectedConversation === conversation.id
                    ? "bg-gray-800 border-gray-600"
                    : "bg-transparent border-transparent hover:bg-gray-900"
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.participantAvatar} />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {conversation.participantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-white truncate">
                            {conversation.participantName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            {conversation.lastMessageTime}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 truncate">
                        @{conversation.participantUsername}
                      </p>
                      <p className="text-sm text-gray-300 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConv.participantAvatar} />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {selectedConv.participantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedConv.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-white">
                  {selectedConv.participantName}
                </h2>
                <p className="text-sm text-gray-400">
                  @{selectedConv.participantUsername}
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === "me"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === "me"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <Input
                  placeholder={`Message @${selectedConv.participantUsername}`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-400 mb-2">
                Select a message
              </h2>
              <p className="text-gray-500">
                Choose from your existing conversations, start a new one, or just keep swimming.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}