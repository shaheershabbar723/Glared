import React from 'react';
import { HeroSection } from './feature-carousel';

const FeatureCarouselDemo: React.FC = () => {
  const images = [
    {
      src: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759218314736.png',
      alt: 'Professional fashion portrait',
    },
    {
      src: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1758983386232.png',
      alt: 'Elegant evening wear',
    },
    {
      src: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759217814326.png',
      alt: 'Casual athleisure',
    },
    {
      src: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759217920032.png',
      alt: 'Summer resort collection',
    },
    {
      src: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759218132612.png',
      alt: 'Winter outerwear',
    },
    {
      src: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759218493056.png',
      alt: 'Luxury fashion accessories',
    },
  ];

  const title = (
    <>
      Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Featured</span> Collection
    </>
  );

  return (
    <div className="w-full">
      <HeroSection
        title={title}
        subtitle="Experience the future of fashion photography with our AI-powered platform that delivers exceptional product imagery featuring professional virtual models."
        images={images}
      />
    </div>
  );
};

export default FeatureCarouselDemo;