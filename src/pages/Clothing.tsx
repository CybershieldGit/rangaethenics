import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { ArtisanBanner } from '../components/shared/ArtisanBanner'
import { DecorativeDivider } from '../components/ui/DecorativeDivider'
import { ProductSection } from '../components/home/ProductSection'
import { OccasionSection } from '../components/home/OccasionSection'
import { ValueProposition } from '../components/home/ValueProposition'
import { OurStory } from '../components/home/OurStory'
import { FestiveSpecial } from '../components/jewellery/FestiveSpecial'
import { getProducts, getCategoriesList } from '../utils/api'
import { Link } from 'react-router-dom'
import {
  Product,
  mostSellingClothing as fallbackMostSelling,
  newArrivalClothing as fallbackNewArrival,
} from '../data/products'

const GOLD_TINT =
  'brightness(0) saturate(100%) invert(63%) sepia(42%) saturate(523%) hue-rotate(358deg) brightness(89%) contrast(86%)'

const fallbackCollections = [
  {
    name: 'Sarees',
    image: '/images/sarees.png',
  },
  {
    name: 'Lehengas',
    image: '/images/Lehengas.png',
  },
  {
    name: 'Dupattas',
    image: '/images/Dupattas.png',
  },
  {
    name: 'Kurta Sets',
    image: '/images/Kurta_Sets.png',
  },
]

function ClothingHero() {
  return (
    <section className="relative h-[50vh] md:h-[80vh] min-h-[340px] md:min-h-[560px] max-h-[340px] md:max-h-[780px] overflow-hidden bg-[#F7E9DB]">
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/mobile_clothing_hero_section.jpg" />
        <img
          src="/images/clothing_hero.png"
          alt="Rooted in Heritage"
          className="absolute inset-0 h-full w-full object-cover object-[75%_center] md:object-right"
        />
      </picture>

      <div className="relative z-10 flex h-full items-start md:items-center pt-[40px] md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-serif text-[24px] w-[220px] md:w-auto leading-[1.1] md:leading-[1.15] text-maroon md:text-6xl lg:text-7xl font-normal">
              Rooted in Heritage,
              <br />
              Woven for You
            </h1>

            <img
              src="/hero_seperator.svg"
              alt=""
              className="my-[17px] md:mt-6 md:mb-8 h-2 md:h-4 max-w-[108px] md:max-w-none w-auto"
            />

            <p className="mb-4 md:mb-8 w-[200px] md:w-auto md:max-w-md text-[12px] md:text-base leading-relaxed text-text-dark font-normal">
              Timeless Indian styles in soft cotton and exquisite
              <br />
              oxidised jewellery.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/about">
                <Button className="!px-4 !py-2 text-xs md:!px-8 md:!py-3.5 md:text-sm bg-maroon text-white border-maroon hover:bg-maroon-dark transition-all duration-300 font-semibold tracking-wide cursor-pointer">
                  Our Story
                </Button>
              </Link>
              <Link to="/products?category=clothing">
                <Button
                  variant="outline"
                  className="!px-4 !py-2 text-xs md:!px-8 md:!py-3.5 md:text-sm border-[#BD8A3C] text-maroon hover:bg-[#BD8A3C] hover:text-white transition-all duration-300 font-semibold tracking-wide cursor-pointer"
                >
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom fade gradient for mobile only */}
      <div
        className="absolute inset-x-0 bottom-0 z-[5] h-[230px] md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(245, 238, 225, 0) 0%, rgba(245, 238, 225, 0.6) 50%, #f5eee1 100%)',
        }}
      />
    </section>
  )
}

const ARCH_BORDER_PATH =
  'M155.222 1.58203C156.994 3.70146 159.425 5.59289 162.297 7.33105C165.628 9.34719 169.608 11.1909 173.958 12.96C178.31 14.7298 183.063 16.4363 187.942 18.1709C192.829 19.9079 197.844 21.674 202.753 23.5703C212.585 27.3687 221.889 31.655 228.726 37.1807C235.537 42.6857 239.826 49.3544 239.826 57.96V58.9307H242.811C253.542 58.9307 261.938 66.1953 261.938 74.8135V82.1963H285.098V104.688H287.206C299.673 104.688 309.478 113.133 309.478 123.203V394.857H1.93652L0.969727 123.203C0.969727 113.132 10.7716 104.689 23.2383 104.688H25.3477V82.1963H48.5059V74.8135C48.5059 66.1953 56.9033 58.9307 67.6348 58.9307H70.6191V57.96C70.6192 49.3544 74.9082 42.6857 81.7197 37.1807C88.5567 31.6552 97.8596 27.3686 107.691 23.5703C112.6 21.674 117.616 19.9079 122.502 18.1709C127.382 16.4363 132.134 14.7298 136.486 12.96C140.837 11.1909 144.816 9.34719 148.147 7.33105C151.019 5.59305 153.449 3.70121 155.222 1.58203Z'

function ArchCard({ name, image }: { name: string; image: string }) {
  const slug = (name as any || '').replace(/\s+/g, '-').toLowerCase()
  const clipId = `arch-clip-${slug}`
  return (
    <Link to={`/products?category=clothing&subCategory=${encodeURIComponent(name)}`} className="group block w-full animate-fade-in">
      <svg
        viewBox="0 0 311 396"
        className="block w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId}>
            <path
              d={ARCH_BORDER_PATH}
              transform="translate(4.7 6) scale(0.97)"
            />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <image
            href={image}
            x="0"
            y="8"
            width="311"
            height="420"
            preserveAspectRatio="xMidYMid slice"
            className="origin-center transition-transform duration-500 group-hover:scale-105"
          />
          <rect
            x="4.85156"
            y="332.766"
            width="300.746"
            height="58.209"
            className="fill-maroon"
          />
        </g>

        <path
          d={ARCH_BORDER_PATH}
          fill="none"
          stroke="#BD8A3C"
          strokeWidth="1.9403"
        />

        <text
          x="155.5"
          y="362"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize="22"
          letterSpacing="0.5"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {name}
        </text>
      </svg>
    </Link>
  )
}

const getSubcategoryDetails = (name: string, apiImage?: string) => {
  const lower = name.toLowerCase().trim();
  let image = apiImage || '';
  
  if (!image || image === '/images/placeholder.png') {
    if (lower.includes('saree')) image = '/images/sarees.png';
    else if (lower.includes('lehenga') || lower.includes('lehnga')) image = '/images/Lehengas.png';
    else if (lower.includes('kurti') || lower.includes('kurta')) image = '/images/Kurta_Sets.png';
    else if (lower.includes('dupatta')) image = '/images/Dupattas.png';
    else if (lower.includes('gown')) image = '/images/clothing.png';
    else if (lower.includes('suit')) image = '/images/clothing.png';
    else image = '/images/clothing.png';
  }
  
  // Normalize names for display consistency
  let displayName = name.trim();
  if (lower === 'lehnga' || lower === 'lehengas') displayName = 'Lehengas';
  else if (lower === 'saree' || lower === 'sarees') displayName = 'Sarees';
  else if (lower === 'kurti' || lower === 'kurtis') displayName = 'Kurtis';
  
  return { name: displayName, image };
}

function CollectionsGrid({ collections }: { collections: { name: string; image: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 768 ? 4 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, collections.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20 overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <h2
            className="font-serif whitespace-nowrap text-maroon text-[28px] font-bold leading-none tracking-normal sm:text-4xl md:text-[48px]"
          >
            Our Signature Collections
          </h2>
          <div className="hidden md:flex items-center flex-1">
            <img
              src="/square_straight.svg"
              alt=""
              className="h-px min-w-0 flex-1 object-fill"
              style={{ filter: GOLD_TINT }}
            />

            <span className="flex shrink-0 items-center gap-2">
              <img src="/flower.svg" alt="" className="h-5 w-auto" />
              <span
                className="block h-px w-12"
                style={{
                  background:
                    'linear-gradient(to right, transparent, #BD8A3C 50%, transparent)',
                }}
              />
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        {collections.length > itemsToShow && (
          <div className="hidden md:flex items-center gap-2 ml-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border border-maroon text-maroon transition-all duration-300 hover:bg-maroon hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-maroon cursor-pointer flex items-center justify-center w-10 h-10"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="p-2 rounded-full border border-maroon text-maroon transition-all duration-300 hover:bg-maroon hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-maroon cursor-pointer flex items-center justify-center w-10 h-10"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="overflow-x-auto md:overflow-hidden mx-[-10px] md:mx-[-12px] scrollbar-none">
        <div
          className="flex transition-transform duration-500 ease-out md:transform-none"
          style={{
            transform: window.innerWidth >= 768 ? `translateX(-${currentIndex * (100 / itemsToShow)}%)` : 'none',
          }}
        >
          {collections.map((item, index) => (
            <div
              key={index}
              className="w-1/3 sm:w-1/3 md:w-1/4 shrink-0 px-[4px] md:px-[12px]"
            >
              <ArchCard name={item.name} image={item.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Clothing() {
  const [mostSelling, setMostSelling] = useState<Product[]>(fallbackMostSelling)
  const [newArrivals, setNewArrivals] = useState<Product[]>(fallbackNewArrival)
  const [collections, setCollections] = useState<{ name: string; image: string }[]>([])

  useEffect(() => {
    async function loadCollections() {
      const categories = await getCategoriesList()
      const clothingCategory = categories.find(c => c.name.toLowerCase() === 'clothing')
      if (clothingCategory && clothingCategory.subcategories && clothingCategory.subcategories.length > 0) {
        const unique = new Map();
        clothingCategory.subcategories.forEach(sub => {
          const details = getSubcategoryDetails(sub.name, sub.image);
          const key = details.name.toLowerCase();
          // Keep the one with a non-placeholder image or update if image is available
          if (!unique.has(key) || (!unique.get(key).image && details.image)) {
            unique.set(key, details);
          }
        });
        setCollections(Array.from(unique.values()));
      } else {
        setCollections(fallbackCollections)
      }
    }
    loadCollections()
  }, [])

  useEffect(() => {
    async function loadClothing() {
      const { products } = await getProducts({ category: 'clothing', pageSize: 100 })
      if (products && products.length > 0) {
        const liveMostSelling = products.filter(p => p.isBestSelling)
        const liveNewArrivals = products.filter(p => p.isNewArrival)
        if (liveMostSelling.length > 0) setMostSelling(liveMostSelling.slice(0, 4))
        if (liveNewArrivals.length > 0) setNewArrivals(liveNewArrivals.slice(0, 4))
      }
    }
    loadClothing()
  }, [])

  return (
    <div style={{ backgroundColor: '#f5eee1' }}>
      <ClothingHero />
      <CollectionsGrid collections={collections} />
      <ArtisanBanner image="/images/ourstory.png" />
      <div style={{ backgroundColor: '#f0e7d6', position: 'relative' }}>
        <DecorativeDivider className="py-6 absolute top-[-38px] left-0 w-full" />
        <ProductSection
          title="Most Selling"
          subtitle="Loved by our customers for their elegance, quality and timeless charm."
          products={mostSelling}
          viewAllLabel="View All Most Selling"
          viewAllTo="/products?category=clothing&bestSelling=true"
        />
        <OccasionSection />
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh designs, inspired by the tradition and crafted for the modern muse."
          products={newArrivals}
          viewAllLabel="View All New Arrivals"
          viewAllTo="/products?category=clothing&newArrival=true"
        />
        <DecorativeDivider className="py-6 absolute bottom-[-38px] left-0 w-full" />
      </div>
      <FestiveSpecial eyebrow="Flat 70% Off" note="On all clothing" category="clothing" />
      <ValueProposition />
      <OurStory background="transparent" buttonText="Know More About Us" to="/about" />
    </div>
  )
}
