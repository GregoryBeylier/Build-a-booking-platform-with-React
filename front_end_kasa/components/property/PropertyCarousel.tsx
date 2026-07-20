"use client";

import { useState } from "react";
import UploadedImage from "@/components/ui/UploadedImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PropertyCarouselProps {
  pictures: string[];
}

export default function PropertyCarousel({ pictures }: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % pictures.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length);
  };

  return (
    <div className="relative aspect-[303/357] flex-1 rounded-[10px] overflow-hidden">
      <UploadedImage
        key={currentIndex}
        src={pictures[currentIndex]}
        alt={`Photo ${currentIndex + 1} sur ${pictures.length} du logement`}
        fill
        className="object-cover animate-fade-in"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {pictures.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 hover:bg-white"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 hover:bg-white"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}
