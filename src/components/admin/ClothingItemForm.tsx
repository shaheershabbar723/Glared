import { useState, useRef, useEffect } from 'react';
import { X, Upload, Trash2, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ClothingItem, Category, ClothingImage, supabase } from '../../lib/supabase';

interface ClothingItemFormProps {
  item?: ClothingItem | null;
  categories: Category[];
  onSubmit: () => void;
  onCancel: () => void;
}

export function ClothingItemForm({ item, categories, onSubmit, onCancel }: ClothingItemFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    category_id: item?.category_id || (categories[0]?.id || ''),
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(item?.thumbnail_image || '');
  const [additionalImages, setAdditionalImages] = useState<Array<{ file: File | null; preview: string; id?: string }>>([]);
  const [existingImages, setExistingImages] = useState<ClothingImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      loadExistingImages();
    }
  }, [item]);

  const loadExistingImages = async () => {
    if (!item) return;

    try {
      const { data, error } = await supabase
        .from('clothing_images')
        .select('*')
        .eq('clothing_item_id', item.id)
        .order('display_order', { ascending: true });

      if (error) throw error;

      setExistingImages(data || []);
    } catch (error) {
      console.error('Error loading existing images:', error);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: Array<{ file: File | null; preview: string }> = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push({
          file,
          preview: e.target?.result as string
        });

        if (newImages.length === files.length) {
          setAdditionalImages([...additionalImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index: number) => {
    const updated = [...additionalImages];
    updated.splice(index, 1);
    setAdditionalImages(updated);
  };

  const removeExistingImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('clothing_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      setExistingImages(existingImages.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `clothing-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let thumbnailUrl = item?.thumbnail_image || '';

      // Upload thumbnail if new file selected
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile);
      }

      const itemData = {
        name: formData.name,
        description: formData.description || null,
        category_id: formData.category_id,
        thumbnail_image: thumbnailUrl || null,
      };

      let itemId = item?.id;

      if (item) {
        // Update existing item
        const { error } = await supabase
          .from('clothing_items')
          .update(itemData)
          .eq('id', item.id);

        if (error) throw error;
      } else {
        // Create new item
        const { data, error } = await supabase
          .from('clothing_items')
          .insert([itemData])
          .select()
          .single();

        if (error) throw error;
        itemId = data.id;
      }

      // Upload additional images
      if (additionalImages.length > 0 && itemId) {
        const imagePromises = additionalImages.map(async (imageData, index) => {
          if (imageData.file) {
            const imageUrl = await uploadImage(imageData.file);
            return {
              clothing_item_id: itemId,
              image_url: imageUrl,
              display_order: index + 1,
            };
          }
          return null;
        });

        const imageRecords = (await Promise.all(imagePromises)).filter(Boolean);

        if (imageRecords.length > 0) {
          const { error } = await supabase
            .from('clothing_images')
            .insert(imageRecords);

          if (error) throw error;
        }
      }

      onSubmit();
    } catch (error) {
      console.error('Error saving clothing item:', error);
      alert('Error saving clothing item. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: `${cat.name} (${cat.section === 'men' ? "Men's" : "Women's"})`
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {item ? 'Edit Clothing Item' : 'Add Clothing Item'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Item Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., Classic White Polo"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="Describe the item, materials, features..."
            />
          </div>

          <Select
            label="Category"
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            options={categoryOptions}
            required
          />

          {/* Thumbnail Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Star className="w-4 h-4 inline mr-1 text-yellow-500" />
              Thumbnail Image (Main Display)
            </label>
            
            {thumbnailPreview && (
              <div className="relative w-32 h-40">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailFile(null);
                    setThumbnailPreview('');
                    if (thumbnailInputRef.current) {
                      thumbnailInputRef.current.value = '';
                    }
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Click to upload thumbnail</p>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </label>
            </div>
          </div>

          {/* Additional Images */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Additional Images (Hover Variations)
            </label>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Existing Images:</p>
                <div className="grid grid-cols-4 gap-2">
                  {existingImages.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.image_url}
                        alt="Existing"
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image.id)}
                        className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            {additionalImages.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">New Images:</p>
                <div className="grid grid-cols-4 gap-2">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <Upload className="w-6 h-6 mb-1 text-gray-400" />
                <p className="text-xs text-gray-500">Add more images</p>
                <input
                  ref={additionalInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              These images will cycle on hover. Upload 3-5 variations for best effect.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={uploading} className="flex-1">
              {uploading ? 'Saving...' : (item ? 'Update Item' : 'Create Item')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={uploading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}