'use client';

import { useState } from 'react';
import Image from 'next/image';

const logos = [
  {
    src: '/ytgify-logos/logo-abstract-time-capture.svg',
    alt: 'Abstract Time Capture'
  },
  {
    src: '/ytgify-logos/logo-neon-accessible-ocean.svg',
    alt: 'Neon Ocean Gradient'
  },
  {
    src: '/ytgify-logos/logo-neon-accessible-mintviolet.svg',
    alt: 'Mint Violet Variation'
  },
  {
    src: '/ytgify-logos/logo-neon-accessible-bluelime.svg',
    alt: 'Blue Lime Energy'
  },
  {
    src: '/ytgify-logos/logo-youtube-gif-hybrid-v7.svg',
    alt: 'YouTube-GIF Hybrid'
  },
  {
    src: '/ytgify-logos/logo-frame-sequence-v1-integrated-play-variation-2-layered-depth-black-1.svg',
    alt: 'Frame Sequence with Depth'
  }
];

export default function LogoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? logos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === logos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="relative bg-gray-900 rounded-lg p-8">
        {/* Main carousel area */}
        <div className="relative h-64 flex items-center justify-center">
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Previous logo"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Logo display */}
          <div className="relative w-48 h-48">
            <Image
              src={logos[currentIndex].src}
              alt={logos[currentIndex].alt}
              width={192}
              height={192}
              className="object-contain"
              priority
            />
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-2 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Next logo"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Logo title */}
        <div className="text-center mt-4">
          <p className="text-gray-300 font-medium">{logos[currentIndex].alt}</p>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {logos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-blue-500 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to logo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}