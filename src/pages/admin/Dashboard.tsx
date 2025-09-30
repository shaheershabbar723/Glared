import { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Category, ClothingItem, supabase } from '../../lib/supabase';
import { CategoryManager } from '../../components/admin/CategoryManager';
import { ClothingItemManager } from '../../components/admin/ClothingItemManager';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'categories' | 'items'>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoriesError) throw categoriesError;

      // Load clothing items with category info
      const { data: itemsData, error: itemsError } = await supabase
        .from('clothing_items')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (itemsError) throw itemsError;

      setCategories(categoriesData || []);
      setItems(itemsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back to Site */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">GLARED</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'categories'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'items'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Clothing Items ({items.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'categories' ? (
          <CategoryManager categories={categories} onDataChange={handleDataChange} />
        ) : (
          <ClothingItemManager 
            items={items} 
            categories={categories} 
            onDataChange={handleDataChange} 
          />
        )}
      </div>
    </div>
  );
}