'use client';

import React, { useState, useEffect } from 'react';

export function ImageGallery({ images }: { images: { src: string; alt: string }[] }) {
  // Limit the number of images displayed initially for better performance
  const [displayCount, setDisplayCount] = React.useState(30);
  const [loaded, setLoaded] = useState(false);
  const displayedImages = images.slice(0, displayCount);
  
  // Function to load more images
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 30, images.length));
  };

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <style>{`
        .masonry-grid {
          column-count: 4;
          column-gap: 1rem;
        }
        
        .masonry-grid-item {
          display: block;
          break-inside: avoid;
          margin-bottom: 1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .masonry-grid-item.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .masonry-grid-item img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease;
        }
        
        .masonry-grid-item img:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 4;
          }
        }
        
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
            column-gap: 0.5rem;
          }
          
          .masonry-grid-item {
            margin-bottom: 0.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
      
      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="masonry-grid">
          {displayedImages.map((image, index) => (
            <div 
              key={`${image.src}-${index}`} 
              className={`masonry-grid-item ${loaded ? 'loaded' : ''}`}
              style={{ transitionDelay: `${index * 0.02}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 12 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
        
        {displayCount < images.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Load More Images ({images.length - displayCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}