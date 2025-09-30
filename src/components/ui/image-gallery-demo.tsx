import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ImageGallery } from './image-gallery';

export default function DemoOne() {
  const [images, setImages] = useState<Array<{ src: string; alt: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      // Load all clothing items
      const { data: itemsData, error: itemsError } = await supabase
        .from('clothing_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (itemsError) throw itemsError;

      // Load images for all items
      if (itemsData && itemsData.length > 0) {
        const { data: imagesData, error: imagesError } = await supabase
          .from('clothing_images')
          .select('*')
          .in('clothing_item_id', itemsData.map(item => item.id))
          .order('display_order', { ascending: true });

        if (imagesError) throw imagesError;

        // Create an array with all images (multiple images per item)
        const allImages: Array<{ src: string; alt: string }> = [];
        
        itemsData.forEach(item => {
          // Add thumbnail image if available
          if (item.thumbnail_image) {
            allImages.push({
              src: item.thumbnail_image,
              alt: `${item.name} - Thumbnail`
            });
          }
          
          // Add all additional images for this item
          const itemImages = imagesData?.filter(img => img.clothing_item_id === item.id) || [];
          itemImages.forEach(image => {
            allImages.push({
              src: image.image_url,
              alt: `${item.name} - Image ${image.display_order}`
            });
          });
        });

        setImages(allImages);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg w-1/2 mx-auto mb-8" />
            <div className="flex justify-center space-x-4 mb-16">
              <div className="h-12 bg-gray-200 rounded-full w-32" />
              <div className="h-12 bg-gray-200 rounded-full w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ImageGallery images={images} />;
}