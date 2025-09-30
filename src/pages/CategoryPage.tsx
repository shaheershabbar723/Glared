import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Category, ClothingItem, ClothingImage, supabase } from '../lib/supabase';
import { ClothingItemCard } from '../components/Portfolio/ClothingItemCard';
import { ImageCarousel } from '../components/Portfolio/ImageCarousel';
import { Button } from '../components/ui/Button';

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [itemImages, setItemImages] = useState<Record<string, ClothingImage[]>>({});
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      loadCategoryData();
    }
  }, [categoryId]);

  const loadCategoryData = async () => {
    if (!categoryId) return;

    try {
      // Load category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Load clothing items
      const { data: itemsData, error: itemsError } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('category_id', categoryId)
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

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
  };

  const handleCloseCarousel = () => {
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-8" />
            <div className="h-80 bg-gray-200 rounded-2xl mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <Button onClick={() => navigate('/portfolio')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const allImages = selectedItem ? [
    { image_url: selectedItem.thumbnail_image, display_order: 0 },
    ...(itemImages[selectedItem.id] || []).sort((a, b) => a.display_order - b.display_order)
  ].filter(img => img.image_url) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/portfolio')}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Collections
          </Button>
        </div>

        {/* Category Header */}
        <div className="mb-12">
          {category.banner_image ? (
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={category.banner_image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {category.name}
                </h1>
                <p className="text-xl text-gray-200">
                  {category.section === 'men' ? "Men's" : "Women's"} Collection
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600">
                {category.section === 'men' ? "Men's" : "Women's"} Collection
              </p>
            </div>
          )}
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <ClothingItemCard
                key={item.id}
                item={item}
                images={itemImages[item.id] || []}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                No items yet
              </h3>
              <p className="text-gray-600">
                This category is being prepared with amazing pieces. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Carousel Modal */}
      {selectedItem && (
        <ImageCarousel
          item={selectedItem}
          images={allImages}
          onClose={handleCloseCarousel}
        />
      )}
    </div>
  );
}