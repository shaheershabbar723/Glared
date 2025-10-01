import { useState, useRef } from 'react';
import { ClothingItem, ClothingImage } from '../../lib/supabase';

interface ClothingItemCardProps {
  item: ClothingItem;
  images: ClothingImage[];
  onClick?: () => void;
}

export function ClothingItemCard({ item, images, onClick }: ClothingItemCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const allImages = [
    { image_url: item.thumbnail_image, display_order: 0 },
    ...images.sort((a, b) => a.display_order - b.display_order)
  ].filter(img => img.image_url) as { image_url: string; display_order: number }[];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (allImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % allImages.length);
      }, 800);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImage(0);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (!item.thumbnail_image && allImages.length === 0) {
    return (
      <div className="bg-gray-100 aspect-[3/4] rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No Image</p>
      </div>
    );
  }

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <img
          src={allImages[currentImage]?.image_url || item.thumbnail_image || ''}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Click indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        
        {/* Image count indicator */}
        {allImages.length > 1 && (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <div className="flex space-x-1">
              {allImages.slice(0, 3).map((_, index) => (
                <div key={index} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              ))}
              {allImages.length > 3 && <span>+{allImages.length - 3}</span>}
            </div>
            <span>images</span>
          </div>
        )}
      </div>
    </div>
  );
}