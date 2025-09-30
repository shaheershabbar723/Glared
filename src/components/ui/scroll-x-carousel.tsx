'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'motion/react';

interface ScrollXCarouselContextValue {
  scrollYProgress: MotionValue<number>;
  carouselX: MotionValue<number>;
}

const ScrollXCarouselContext =
  React.createContext<ScrollXCarouselContextValue | null>(null);

function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext);
  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel');
  }
  return context;
}

export function ScrollXCarousel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
  });
  
  // For mouse wheel scrolling over the carousel
  const carouselX = useMotionValue(0);
  const springX = useSpring(carouselX, { stiffness: 300, damping: 30 });
  
  // Capture wheel events
  React.useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;
    
    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scrolling when cursor is over the carousel
      if (element.matches(':hover')) {
        e.preventDefault();
        const currentX = carouselX.get();
        // Adjust sensitivity and add limits
        const deltaX = e.deltaY * 0.5; // Reduced sensitivity
        const newX = Math.max(-1500, Math.min(0, currentX - deltaX));
        carouselX.set(newX);
      }
    };
    
    // Use passive: false to allow preventDefault
    element.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [carouselX]);

  return (
    <ScrollXCarouselContext.Provider value={{ scrollYProgress, carouselX: springX }}>
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  );
}

export function ScrollXCarouselContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky overflow-hidden w-full top-0 left-0', className)}
      {...props}
    />
  );
}

export function ScrollXCarouselWrap({
  className,
  style,
  ...props
}: HTMLMotionProps<'div'>) {
  const { carouselX } = useScrollXCarousel();

  return (
    <motion.div
      className={cn('w-fit', className)}
      style={{ x: carouselX, ...style }}
      {...props}
    />
  );
}

export function ScrollXCarouselProgress({
  className,
  style,
  progressStyle,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { progressStyle?: string }) {
  const { scrollYProgress } = useScrollXCarousel();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <motion.div
        className={cn('origin-left', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  );
}