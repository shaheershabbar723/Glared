import { useState, useEffect } from 'react';
import { ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap } from './scroll-x-carousel.tsx';
import { CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain } from './reveal-on-hover.tsx';
import { Badge } from './badge.tsx';
import { supabase } from '../../lib/supabase';

export default function ScrollXCarouselDemo() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      // Trigger fade-in animation after categories are loaded
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, categories]);

  const loadCategories = async () => {
    try {
      // Load specific categories: Polo, Dress, Trouser
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .in('name', ['Polo', 'Dress', 'Trouser'])
        .order('created_at', { ascending: true });

      if (error) throw error;

      // If we don't find these specific categories, fall back to the first 3 categories
      if (!data || data.length === 0) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('categories')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: true });
        
        if (fallbackError) throw fallbackError;
        setCategories(fallbackData || []);
      } else {
        // Ensure we have exactly 3 categories by padding if needed
        let categoryList = [...data];
        if (categoryList.length < 3) {
          // If we have less than 3, pad with the first categories
          const { data: additionalData, error: additionalError } = await supabase
            .from('categories')
            .select('*')
            .limit(3 - categoryList.length)
            .order('created_at', { ascending: true });
          
          if (!additionalError && additionalData) {
            categoryList = [...categoryList, ...additionalData];
          }
        }
        setCategories(categoryList.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback to static data
      setCategories([
        {
          id: 'slide-1',
          name: 'Polo',
          section: 'men',
          banner_image: '/media/Generated Image September 20, 2025 - 1_03AM.png',
        },
        {
          id: 'slide-2',
          name: 'Dress',
          section: 'women',
          banner_image: '/media/Generated Image September 20, 2025 - 1_22AM.png',
        },
        {
          id: 'slide-3',
          name: 'Trouser',
          section: 'men',
          banner_image: '/media/Generated Image September 22, 2025 - 2_21AM (1).png',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl w-64 h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollXCarousel className="h-[100vh] md:h-[70vh]">
      <ScrollXCarouselContainer className="h-dvh md:h-[70vh] place-content-center flex flex-col gap-8 py-12">
        <div className="pointer-events-none w-[12vw] h-[103%] absolute inset-[0_auto_0_0] z-10 bg-[linear-gradient(90deg,_var(--background)_35%,_transparent)]" />
        <div className="pointer-events-none bg-[linear-gradient(270deg,_var(--background)_35%,_transparent)] w-[15vw] h-[103%] absolute inset-[0_0_0_auto] z-10" />

        <ScrollXCarouselWrap className={`flex-4/5 flex space-x-8 [&>*:first-child]:ml-8 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          {categories.map((category, index) => (
            <CardHoverReveal
              key={category.id}
              className="min-w-[90vw] md:min-w-[38vw] shadow-xl border xl:min-w-[30vw] rounded-xl"
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <CardHoverRevealMain>
                <img
                  alt={category.name}
                  src={category.banner_image || `/media/Generated Image September 20, 2025 - 1_03AM.png`}
                  className="size-full aspect-square object-cover"
                  loading="eager"
                  decoding="async"
                />
              </CardHoverRevealMain>
              <CardHoverRevealContent className="space-y-4 rounded-2xl bg-[rgba(0,0,0,.5)] backdrop-blur-3xl p-4">
                <div className="space-y-2">
                  <h3 className="text-sm text-white/80">Collection</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="capitalize rounded-full bg-yellow-500">
                      {category.name}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm text-white/80">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className="capitalize rounded-full"
                      variant={'secondary'}
                    >
                      {category.section === 'men' ? "Men's" : "Women's"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  <h3 className="text-white capitalize font-medium">
                    {category.name} Collection
                  </h3>
                  <p className="text-white/80 text-sm">
                    Explore our premium {category.name.toLowerCase()} collection with AI-generated fashion photography.
                  </p>
                </div>
              </CardHoverRevealContent>
            </CardHoverReveal>
          ))}
        </ScrollXCarouselWrap>
        <ScrollXCarouselProgress
          className="bg-secondary mx-8 h-1 rounded-full overflow-hidden"
          progressStyle="size-full bg-yellow-500/70 rounded-full"
        />
      </ScrollXCarouselContainer>
    </ScrollXCarousel>
  )
}