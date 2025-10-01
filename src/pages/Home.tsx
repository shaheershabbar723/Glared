import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Globe, Zap, Camera, Palette, Clock, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import ScrollXCarouselDemo from '../components/ui/scroll-x-carousel-demo';
import FeatureCarouselDemo from '../components/ui/feature-carousel-demo';
import { supabase } from '../lib/supabase';
import { CategoryCard } from '../components/Portfolio/CategoryCard';

const testimonials = [
  {
    quote: "The AI photography transformed our product catalog completely. 300% increase in engagement.",
    author: "Sarah Ahmed",
    company: "Luxury Fashion House",
    rating: 5
  },
  {
    quote: "From concept to delivery in 24 hours. The quality exceeded our traditional photography.",
    author: "Marcus Rodriguez",
    company: "Global Retail Brand",
    rating: 5
  },
  {
    quote: "Consistent brand imagery across 500+ products. Game-changing for our e-commerce.",
    author: "Elena Thompson",
    company: "Fashion Startup",
    rating: 5
  }
];

const processSteps = [
  {
    icon: Users,
    title: "Strategic Consultation",
    description: "Understanding your brand vision and photography requirements"
  },
  {
    icon: Camera,
    title: "AI Production",
    description: "Advanced AI generates professional model photography"
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous review ensuring premium brand standards"
  },
  {
    icon: Zap,
    title: "Delivery & Support",
    description: "24-48 hour delivery with ongoing creative support"
  }
];

export function Home() {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [counters, setCounters] = useState({ images: 0, brands: 0, satisfaction: 0 });
  const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const heroRef = useRef(null);
  const transformationRef = useRef(null);
  const challengeRef = useRef(null);
  const solutionRef = useRef(null);
  const processRef = useRef(null);
  const metricsRef = useRef(null);

  // Load featured categories
  useEffect(() => {
    loadFeaturedCategories();
  }, []);

  const loadFeaturedCategories = async () => {
    try {
      // Load specific categories or the first 3 categories as featured
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(3);

      if (error) throw error;
      
      setFeaturedCategories(data || []);
    } catch (error) {
      console.error('Error loading featured categories:', error);
      // Fallback to static data if Supabase fails
      setFeaturedCategories([
        {
          id: 'featured-1',
          name: 'Summer Collection',
          section: 'women',
          banner_image: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759218314736.png',
        },
        {
          id: 'featured-2',
          name: 'Business Formal',
          section: 'men',
          banner_image: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1758983386232.png',
        },
        {
          id: 'featured-3',
          name: 'Casual Wear',
          section: 'women',
          banner_image: 'https://davlauemodhnuevsaodx.supabase.co/storage/v1/object/public/portfolio-images/banner-1759217814326.png',
        }
      ]);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [transformationRef, challengeRef, solutionRef, processRef, metricsRef];
    elements.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    if (isVisible.metrics) {
      const animateCounter = (target: number, key: string, duration = 2000) => {
        const start = 0;
        const startTime = Date.now();
        
        const updateCounter = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(start + (target - start) * progress);
          
          setCounters(prev => ({ ...prev, [key]: current }));
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };
        
        updateCounter();
      };

      animateCounter(1000, 'images');
      animateCounter(10, 'brands');
      animateCounter(99.2, 'satisfaction');
    }
  }, [isVisible.metrics]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center min-h-[80vh] flex flex-col justify-center">
            {/* Main Heading */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
                  <span className="block text-black font-light">Professional</span>
                  <span className="block bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent font-bold">
                    AI Fashion
                  </span>
                  <span className="block text-black font-light">Photography</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
                  Deliver exceptional product imagery with AI-generated photo shoots. Premium quality visuals featuring professional virtual models, crafted for discerning fashion brands seeking efficiency without compromise.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button
                  size="lg"
                  onClick={() => navigate('/portfolio')}
                  className="group bg-black hover:bg-gray-800 text-white font-medium px-12 py-4 text-lg border-2 border-black"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-12 py-4 text-lg font-medium"
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Carousel Section */}
      <section ref={transformationRef} id="transformation" className="py-0 bg-gray-50">
        <FeatureCarouselDemo />
      </section>

      {/* Featured Collections Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingCategories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Challenge Section */}
      <section ref={challengeRef} id="challenge" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.challenge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-light">
              The Fashion Photography <span className="text-yellow-600">Challenge</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Traditional fashion photography faces significant obstacles that impact efficiency and results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Resource Intensive", desc: "Traditional shoots require substantial budget allocation and extensive planning" },
              { icon: Users, title: "Complex Logistics", desc: "Coordinating talent, locations, equipment, and creative teams" },
              { icon: Calendar, title: "Timeline Constraints", desc: "Extended lead times impact product launch schedules" },
              { icon: Globe, title: "Limited Scalability", desc: "Difficulty producing consistent imagery across product lines" },
              { icon: Camera, title: "Geographic Limitations", desc: "Location and talent availability restrict creative possibilities" }
            ].map((challenge, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-1000 delay-${index * 100} hover:shadow-xl ${
                  isVisible.challenge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <challenge.icon className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">{challenge.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={solutionRef} id="solution" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-light">
              AI-Powered <span className="text-yellow-500">Solutions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Revolutionary technology that transforms fashion photography with unprecedented efficiency and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Operational Efficiency", desc: "Streamlined 24-48 hour delivery timeline" },
              { icon: Palette, title: "Unlimited Creative Control", desc: "Any model, setting, or aesthetic without logistical constraints" },
              { icon: CheckCircle, title: "Consistent Brand Quality", desc: "Maintain visual coherence across all product categories" },
              { icon: Globe, title: "Global Accessibility", desc: "Eliminate geographical barriers to premium photography" },
              { icon: Star, title: "Scalable Production", desc: "Handle any volume efficiently with consistent quality" }
            ].map((solution, index) => (
              <div
                key={index}
                className={`bg-gray-900 p-8 rounded-2xl border border-gray-800 transition-all duration-1000 delay-${index * 100} hover:bg-gray-800 hover:border-yellow-500/30 ${
                  isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-300 font-light leading-relaxed">{solution.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} id="process" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-light">
              Our Professional <span className="text-yellow-600">Methodology</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              A streamlined process designed for maximum efficiency and exceptional results
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-500 transform -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative text-center transition-all duration-1000 delay-${index * 200} ${
                    isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-4">{step.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section ref={metricsRef} id="metrics" className="py-24 bg-gradient-to-r from-yellow-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.metrics ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-light">
              Trusted by Fashion Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {counters.images.toLocaleString()}+
              </div>
              <div className="text-xl text-white/90 font-light">Professional Images Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {counters.brands}+
              </div>
              <div className="text-xl text-white/90 font-light">Brand Partners</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {counters.satisfaction}%
              </div>
              <div className="text-xl text-white/90 font-light">Client Satisfaction</div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-white fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl text-white mb-6 italic font-light">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="text-white">
                <div className="font-semibold text-lg">{testimonials[currentTestimonial].author}</div>
                <div className="text-white/80 font-light">{testimonials[currentTestimonial].company}</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-light">
            Partner With AI Fashion Photography <span className="text-yellow-500">Experts</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
            Schedule a consultation to discuss how AI photography can enhance your brand's visual strategy and operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => navigate('/contact')}
              className="group bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-medium px-12 py-4 text-lg"
            >
              Schedule Strategic Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/portfolio')}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 text-lg font-medium"
            >
              Request Portfolio Review
            </Button>
          </div>
          <p className="text-gray-400 font-light">
            Professional satisfaction guarantee with comprehensive revision policy
          </p>
        </div>
      </section>
    </div>
  );
}