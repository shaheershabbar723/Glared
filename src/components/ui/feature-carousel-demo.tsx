import React from 'react';
import { HeroSection } from './feature-carousel';

const FeatureCarouselDemo: React.FC = () => {
  const images = [
    {
      src: '/media/feature-carousal/Generated Image September 22, 2025 - 12_14AM.png',
      alt: 'Professional fashion portrait',
    },
    {
      src: '/media/feature-carousal/Generated Image September 22, 2025 - 12_22AM.png',
      alt: 'Elegant evening wear',
    },
    {
      src: '/media/feature-carousal/Generated Image September 22, 2025 - 12_40AM.png',
      alt: 'Casual athleisure',
    },
    {
      src: '/media/feature-carousal/Generated Image September 22, 2025 - 12_56AM.png',
      alt: 'Summer resort collection',
    },
    {
      src: '/media/feature-carousal/Generated Image September 22, 2025 - 1_00AM.png',
      alt: 'Winter outerwear',
    },
    {
      src: '/media/feature-carousal/Generated Image September 25, 2025 - 5_45AM.png',
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