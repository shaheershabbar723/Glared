import { useState, useEffect } from 'react';
import { ClothingItem, ClothingImage, Category, supabase } from '../../lib/supabase';
import { ClothingItemCard } from './ClothingItemCard';

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [itemImages, setItemImages] = useState<Record<string, ClothingImage[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryData();
  }, [category.id]);

  const loadCategoryData = async () => {
    try {
      // Load clothing items
      const { data: itemsData, error: itemsError } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('category_id', category.id)
        .order('created_at', { ascending: false });

      if (itemsError) throw itemsError;

      setItems(itemsData || []);

      // Load images for all items
      if (itemsData && itemsData.length > 0) {
        const { data: imagesData, error: imagesError } = await supabase
          .from('clothing_images')
          .select('*')
          .in('clothing_item_id', itemsData.map(item => item.id))
          .order('display_order', { ascending: true });

        if (imagesError) throw imagesError;

        // Group images by clothing item ID
        const imagesByItem: Record<string, ClothingImage[]> = {};
        imagesData?.forEach(image => {
          if (!imagesByItem[image.clothing_item_id]) {
            imagesByItem[image.clothing_item_id] = [];
          }
          imagesByItem[image.clothing_item_id].push(image);
        });

        setItemImages(imagesByItem);
      }
    } catch (error) {
      console.error('Error loading category data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Banner */}
      {category.banner_image && (
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src={category.banner_image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
              {category.name}
            </h2>
          </div>
        </div>
      )}

      {/* Category Title (if no banner) */}
      {!category.banner_image && (
        <div className="text-center py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {category.name}
          </h2>
        </div>
      )}

      {/* Clothing Items Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ClothingItemCard
              key={item.id}
              item={item}
              images={itemImages[item.id] || []}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No items in this category yet.</p>
        </div>
      )}
    </div>
  );
}