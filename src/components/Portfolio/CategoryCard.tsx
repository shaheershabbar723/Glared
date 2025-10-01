import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '../../lib/supabase';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
    >
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
        {/* Category Image */}
        <div className="relative h-64 overflow-hidden">
          {category.banner_image ? (
            <img
              src={category.banner_image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Content */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="text-center text-white">
              <ArrowRight className="w-8 h-8 mx-auto mb-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              <p className="text-sm font-medium">Explore Collection</p>
            </div>
          </div>
        </div>

        {/* Category Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
              {category.name}
            </h3>
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            {category.section === 'men' ? "Men's" : "Women's"} Collection
          </p>
          
          {/* Decorative Element */}
          <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>

        {/* Corner Accent */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}