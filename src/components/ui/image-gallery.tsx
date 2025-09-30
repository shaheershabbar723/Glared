'use client';

import React from 'react';

export function ImageGallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="w-full">
      <style>{`
        .masonry-grid {
          column-count: 3;
          column-gap: 1rem;
        }
        
        .masonry-grid-item {
          display: block;
          break-inside: avoid;
          margin-bottom: 1rem;
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
            column-count: 3;
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
      
      <div className="masonry-grid">
        {images.map((image, index) => (
          <div 
            key={`${image.src}-${index}`} 
            className="masonry-grid-item"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}