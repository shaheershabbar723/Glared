'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from './aspect-ratio';

export function ImageGallery({ images }: { images: { src: string; alt: string }[] }) {
  // Calculate the number of columns based on screen size
  const getColumnCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 3; // Default to 3 columns
  };

  // Group images into columns without repeating the same image
  const groupImagesIntoColumns = () => {
    const columnCount = getColumnCount();
    const columns: { src: string; alt: string }[][] = Array.from({ length: columnCount }, () => []);
    
    // Distribute images across columns without duplication
    images.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });
    
    return columns;
  };

  const columns = groupImagesIntoColumns();

  // Determine image orientation for aspect ratio
  const getImageRatio = (index: number) => {
    // Alternate between portrait and landscape ratios
    return index % 2 === 0 ? 9 / 16 : 16 / 9;
  };

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center py-10 px-4">
			<div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="grid gap-6">
            {column.map((image, index) => {
              const ratio = getImageRatio(colIndex * column.length + index);
              
              return (
                <AnimatedImage
                  key={`${image.src}-${colIndex}-${index}`} // Use image src in key to ensure uniqueness
                  alt={image.alt}
                  src={image.src}
                  ratio={ratio}
                  placeholder={`/media/1.B (1).png`}
                />
              );
            })}
          </div>
        ))}
      </div>
		</div>
	);
}

interface AnimatedImageProps {
	alt: string;
	src: string;
	className?: string;
	placeholder?: string;
	ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder }: AnimatedImageProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);

	const [imgSrc, setImgSrc] = React.useState(src);

	const handleError = () => {
		if (placeholder) {
			setImgSrc(placeholder);
		}
	};

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className="bg-accent relative size-full rounded-lg border"
		>
			<img
				alt={alt}
				src={imgSrc}
				className={cn(
					'size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out',
					{
						'opacity-100': isInView && !isLoading,
					},
				)}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
				onError={handleError}
			/>
		</AspectRatio>
	);
}