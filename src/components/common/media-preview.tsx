"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  alt?: string;
}

interface MediaPreviewProps {
  media: MediaItem[];
  className?: string;
}

export function MediaPreview({ media, className = "" }: MediaPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const getGridClass = () => {
    switch (media.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-2";
    }
  };

  const getItemClass = (index: number) => {
    if (media.length === 3 && index === 0) {
      return "row-span-2";
    }
    return "";
  };

  return (
    <div className={`mt-3 ${className}`}>
      <div className={`grid gap-1 rounded-2xl overflow-hidden max-h-96 ${getGridClass()}`}>
        {media.slice(0, 4).map((item, index) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div
                className={`relative cursor-pointer group ${getItemClass(index)}`}
                onClick={() => setSelectedIndex(index)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.alt || `Media ${index + 1}`}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                  />
                ) : (
                  <div className="relative w-full h-full bg-black">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                )}
                {media.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">
                      +{media.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black border-0">
              <div className="relative w-full h-full">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  {media.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                        disabled={selectedIndex === 0}
                        className="bg-black bg-opacity-60 text-white border-0 hover:bg-opacity-80"
                      >
                        ←
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedIndex(Math.min(media.length - 1, selectedIndex + 1))}
                        disabled={selectedIndex === media.length - 1}
                        className="bg-black bg-opacity-60 text-white border-0 hover:bg-opacity-80"
                      >
                        →
                      </Button>
                    </>
                  )}
                </div>
                {media[selectedIndex]?.type === "image" ? (
                  <img
                    src={media[selectedIndex].url}
                    alt={media[selectedIndex].alt || `Media ${selectedIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={media[selectedIndex]?.url}
                    controls
                    className="w-full h-full object-contain"
                    autoPlay
                  />
                )}
                {media.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      {media.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === selectedIndex ? "bg-white" : "bg-white bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}