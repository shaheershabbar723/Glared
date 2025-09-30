import { ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap } from './scroll-x-carousel.tsx';
import { CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain } from './reveal-on-hover.tsx';
import { Badge } from './badge.tsx';

const SLIDES = [
  {
    id: 'slide-1',
    title: 'Luxury Menswear Collection',
    description:
      'Premium tailored suits and formal wear crafted with the finest Italian fabrics and meticulous attention to detail.',
    services: ['tailoring', 'luxury', 'formal wear'],
    type: 'Menswear',
    imageUrl: '/Generated Image September 20, 2025 - 1_03AM.png',
  },
  {
    id: 'slide-2',
    title: 'Elegant Womenswear',
    description:
      'Sophisticated dresses and evening wear designed to make a statement at any formal occasion.',
    services: ['design', 'evening wear', 'luxury'],
    type: 'Womenswear',
    imageUrl: '/Generated Image September 20, 2025 - 1_22AM.png',
  },
  {
    id: 'slide-3',
    title: 'Casual Streetwear',
    description:
      'Contemporary urban fashion that blends comfort with style for the modern lifestyle.',
    services: ['streetwear', 'casual', 'urban'],
    type: 'Streetwear',
    imageUrl: '/Generated Image September 22, 2025 - 2_21AM (1).png',
  },
  {
    id: 'slide-4',
    title: 'Summer Resort Collection',
    description:
      'Lightweight fabrics and vibrant patterns perfect for beach vacations and summer events.',
    services: ['resort wear', 'summer', 'vacation'],
    type: 'Resort',
    imageUrl: '/Generated Image September 25, 2025 - 5_24AM.png',
  },
  {
    id: 'slide-5',
    title: 'Winter Outerwear',
    description:
      'Premium coats and jackets designed for both style and protection during cold seasons.',
    services: ['outerwear', 'winter', 'luxury'],
    type: 'Outerwear',
    imageUrl: '/download (3).png',
  },
];

export default function ScrollXCarouselDemo() {
  return (
    <ScrollXCarousel className="h-[150vh]">
      <ScrollXCarouselContainer className="h-dvh place-content-center flex flex-col gap-8 py-12">
        <div className="pointer-events-none w-[12vw] h-[103%] absolute inset-[0_auto_0_0] z-10 bg-[linear-gradient(90deg,_var(--background)_35%,_transparent)]" />
        <div className="pointer-events-none bg-[linear-gradient(270deg,_var(--background)_35%,_transparent)] w-[15vw] h-[103%] absolute inset-[0_0_0_auto] z-10" />

        <ScrollXCarouselWrap className="flex-4/5 flex space-x-8 [&>*:first-child]:ml-8">
          {SLIDES.map((slide) => (
            <CardHoverReveal
              key={slide.id}
              className="min-w-[70vw] md:min-w-[38vw] shadow-xl border xl:min-w-[30vw] rounded-xl"
            >
              <CardHoverRevealMain>
                <img
                  alt={slide.title}
                  src={slide.imageUrl}
                  className="size-full aspect-square object-cover"
                />
              </CardHoverRevealMain>
              <CardHoverRevealContent className="space-y-4 rounded-2xl bg-[rgba(0,0,0,.5)] backdrop-blur-3xl p-4">
                <div className="space-y-2">
                  <h3 className="text-sm text-white/80">Collection</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="capitalize rounded-full bg-yellow-500">
                      {slide.type}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm text-white/80">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {slide.services.map((service) => (
                      <Badge
                        key={service}
                        className="capitalize rounded-full"
                        variant={'secondary'}
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  <h3 className="text-white capitalize font-medium">
                    {slide.title}
                  </h3>
                  <p className="text-white/80 text-sm">{slide.description}</p>
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