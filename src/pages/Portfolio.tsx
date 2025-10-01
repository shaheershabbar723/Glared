import { useState, useEffect } from 'react';
import { Category, supabase } from '../lib/supabase';
import { CategoryCard } from '../components/Portfolio/CategoryCard';
import { ImageGallery } from '../components/ui/image-gallery';
import { useNavigate } from 'react-router-dom';

export function Portfolio() {
  const navigate = useNavigate();
  const [menCategories, setMenCategories] = useState<Category[]>([]);
  const [womenCategories, setWomenCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<Array<{ src: string; alt: string }>>([]);
  const [activeSection, setActiveSection] = useState<'men' | 'women' | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadAllItems();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const men = data?.filter(cat => cat.section === 'men') || [];
      const women = data?.filter(cat => cat.section === 'women') || [];

      setMenCategories(men);
      setWomenCategories(women);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      // Don't set loading to false here, we also need to load all items
    }
  };

  const loadAllItems = async () => {
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

        setAllItems(allImages);
      }
    } catch (error) {
      console.error('Error loading all items:', error);
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

  const activeCategories = activeSection === 'men' ? menCategories : womenCategories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
            Our Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collections of luxury clothing, designed to elevate your style and express your unique personality.
          </p>
        </div>

        {/* Section Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeSection === 'all'
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All Photos
            </button>
            <button
              onClick={() => setActiveSection('men')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeSection === 'men'
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Men's Collection
            </button>
            <button
              onClick={() => setActiveSection('women')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeSection === 'women'
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Women's Collection
            </button>
          </div>
        </div>

        {/* Content Display */}
        {activeSection === 'all' ? (
          <div className="w-full">
            <ImageGallery images={allItems} />
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeCategories.length > 0 ? (
              activeCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Coming Soon
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're working on adding amazing {activeSection === 'men' ? "men's" : "women's"} collections. 
                    Stay tuned for something extraordinary!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}