import { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ClothingItem, Category, supabase } from '../../lib/supabase';
import { ClothingItemForm } from './ClothingItemForm';

interface ClothingItemManagerProps {
  items: ClothingItem[];
  categories: Category[];
  onDataChange: () => void;
}

export function ClothingItemManager({ items, categories, onDataChange }: ClothingItemManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);

  const handleDelete = async (item: ClothingItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('clothing_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      onDataChange();
    } catch (error) {
      console.error('Error deleting clothing item:', error);
      alert('Error deleting clothing item. Please try again.');
    }
  };

  const handleEdit = (item: ClothingItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormSubmit = () => {
    handleFormClose();
    onDataChange();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Clothing Items</h2>
        <Button onClick={() => setShowForm(true)} disabled={categories.length === 0}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">
            You need to create at least one category before adding clothing items.
          </p>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Item Image */}
            <div className="h-48 bg-gray-100 relative">
              {item.thumbnail_image ? (
                <img
                  src={item.thumbnail_image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                  className="p-1.5"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(item)}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Item Details */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {categories.find(cat => cat.id === item.category_id)?.name || 'Unknown Category'}
              </p>
              {item.description && (
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && categories.length > 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clothing items yet</h3>
          <p className="text-gray-600 mb-4">Add your first clothing item to get started</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      )}

      {/* Clothing Item Form Modal */}
      {showForm && (
        <ClothingItemForm
          item={editingItem}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}