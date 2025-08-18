"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchResult {
  id: string;
  type: "user" | "hashtag" | "tweet";
  content: string;
  subtitle?: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const mockSearchResults: SearchResult[] = [
  { id: "1", type: "user", content: "@elonmusk", subtitle: "Elon Musk" },
  { id: "2", type: "user", content: "@openai", subtitle: "OpenAI" },
  { id: "3", type: "hashtag", content: "#technology", subtitle: "Trending in Technology" },
  { id: "4", type: "hashtag", content: "#ai", subtitle: "Trending in AI" },
  { id: "5", type: "tweet", content: "Breaking news about...", subtitle: "2 hours ago" },
];

export function SearchBar({ onSearch, placeholder = "Search", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (value.trim()) {
      // Filter mock results based on query
      const filtered = mockSearchResults.filter(
        result => 
          result.content.toLowerCase().includes(value.toLowerCase()) ||
          result.subtitle?.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.content);
    setIsOpen(false);
    onSearch?.(result.content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "user":
        return "👤";
      case "hashtag":
        return "#";
      case "tweet":
        return "💬";
      default:
        return "🔍";
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          className="w-full bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-full pl-12 pr-4 py-3 text-sm focus:bg-white dark:focus:bg-black focus:border-blue-500 transition-colors"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </div>
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-3"
              >
                <span className="text-lg">{getResultIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white truncate">
                    {result.content}
                  </div>
                  {result.subtitle && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {result.subtitle}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}