import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Category, supabase, adminSupabase } from '../../lib/supabase';
import { CategoryForm } from './CategoryForm';

interface CategoryManagerProps {
  categories: Category[];
  onDataChange: () => void;
}

export function CategoryManager({ categories, onDataChange }: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [localCategories, setLocalCategories] = useState<Category[]>(categories);

  // Load categories using admin client
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await adminSupabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setLocalCategories(data || []);
      onDataChange(); // Notify parent component
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"? This will also delete all clothing items in this category.`)) {
      return;
    }

    try {
      const { error } = await adminSupabase
        .from('categories')
        .delete()
        .eq('id', category.id);

      if (error) throw error;

      loadCategories(); // Reload categories
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category. Please try again.');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleFormSubmit = () => {
    handleFormClose();
    loadCategories(); // Reload categories
  };

  const menCategories = localCategories.filter(cat => cat.section === 'men');
  const womenCategories = localCategories.filter(cat => cat.section === 'women');

  return (
    <div className="space-y-8">
      {/* Add Category Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Categories</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories by Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Men's Categories */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Men's Categories ({menCategories.length})
          </h3>
          <div className="space-y-4">
            {menCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {category.banner_image ? (
                        <img
                          src={category.banner_image}
                          alt={category.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">Men's Section</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {menCategories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No men's categories yet. Create one to get started.
              </div>
            )}
          </div>
        </div>

        {/* Women's Categories */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Women's Categories ({womenCategories.length})
          </h3>
          <div className="space-y-4">
            {womenCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {category.banner_image ? (
                        <img
                          src={category.banner_image}
                          alt={category.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">Women's Section</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {womenCategories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No women's categories yet. Create one to get started.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}