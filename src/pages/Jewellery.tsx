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
  mostSellingJewelry as fallbackMostSelling,
  newArrivalJewelry as fallbackNewArrival,
} from '../data/products'

const GOLD_TINT =
  'brightness(0) saturate(100%) invert(63%) sepia(42%) saturate(523%) hue-rotate(358deg) brightness(89%) contrast(86%)'

const fallbackCategories = [
  { name: 'Necklaces', image: '/images/Necklaces.png' },
  { name: 'Earrings', image: '/images/Earrings.png' },
  { name: 'Rings', image: '/images/Rings.png' },
  { name: 'Bracelets', image: '/images/Bracelets.png' },
  { name: 'Bangles', image: '/images/Bangles.png' },
  { name: 'Anklets', image: '/images/Anklets.png' },
  { name: 'Pendants', image: '/images/Pendants.png' },
]

const getJewellerySubcategoryDetails = (name: string, apiImage?: string) => {
  const lower = name.toLowerCase().trim();
  let image = apiImage || '';
  
  if (!image || image === '/images/placeholder.png') {
    if (lower.includes('necklace') || lower.includes('neck')) image = '/images/Necklaces.png';
    else if (lower.includes('earring') || lower.includes('ear ring') || lower.includes('ear')) image = '/images/Earrings.png';
    else if (lower.includes('ring')) image = '/images/Rings.png';
    else if (lower.includes('bracelet')) image = '/images/Bracelets.png';
    else if (lower.includes('bangle')) image = '/images/Bangles.png';
    else if (lower.includes('anklet')) image = '/images/Anklets.png';
    else if (lower.includes('pendant')) image = '/images/Pendants.png';
    else image = '/images/jewellery.png';
  }
  
  // Normalize names for display consistency
  let displayName = name.trim();
  if (lower === 'ear ring' || lower === 'earrings') displayName = 'Earrings';
  else if (lower === 'necklace' || lower === 'necklaces') displayName = 'Necklaces';
  else if (lower === 'kamar bandh') displayName = 'Kamar Bandh';
  
  return { name: displayName, image };
}


const JEWELLERY_ARC_BORDER =
  'M87.5 0.5C105.44 0.5 121.166 6.00745 130.274 14.2764L130.417 14.4062H135.581C140.889 14.4063 145.671 15.6937 149.108 17.749C152.556 19.8104 154.574 22.5878 154.574 25.5605V27.3555H155.507C160.814 27.3555 165.596 28.643 169.033 30.6982C172.481 32.7595 174.499 35.5373 174.5 38.5098V161.488C174.5 164.461 172.482 167.239 169.034 169.301C165.597 171.356 160.815 172.644 155.507 172.644H154.574V174.438C154.574 177.411 152.556 180.189 149.108 182.25C145.671 184.305 140.889 185.593 135.581 185.593H130.417L130.274 185.723C121.166 193.993 105.44 199.5 87.5 199.5C69.56 199.5 53.8343 193.992 44.7256 185.723L44.583 185.593H39.4189C34.1108 185.593 29.3291 184.305 25.8916 182.25C22.4442 180.189 20.4259 177.411 20.4258 174.438V172.644H19.4932C14.185 172.644 9.40337 171.356 5.96582 169.301C2.51807 167.239 0.500035 164.461 0.5 161.488V38.5107L0.505859 38.2324C0.627601 35.3647 2.62588 32.6952 5.96582 30.6982C9.40337 28.6429 14.185 27.3555 19.4932 27.3555H20.4258V25.5605C20.4259 22.5878 22.4442 19.8104 25.8916 17.749C29.3291 15.6937 34.1108 14.4063 39.4189 14.4062H44.583L44.7256 14.2764C53.8343 6.00745 69.5599 0.5 87.5 0.5Z'

const JEWELLERY_ARC_MASK =
  'M150.844 31.976H150.44V30.7716C150.44 24.7852 142.312 19.9325 132.284 19.9325H127.654C119.061 12.1438 104.29 7 87.5 7C70.7099 7 55.9388 12.1438 47.3459 19.9325H42.7161C32.6885 19.9325 24.5598 24.7852 24.5598 30.7716V31.976H24.1563C14.1287 31.976 6 36.8287 6 42.8151V157.184C6 163.17 14.1287 168.023 24.1563 168.023H24.5598V169.227C24.5598 175.214 32.6885 180.067 42.7161 180.067H47.3459C55.9388 187.855 70.7099 193 87.5 193C104.29 193 119.061 187.856 127.654 180.067H132.284C142.312 180.067 150.44 175.214 150.44 169.227V168.023H150.844C160.871 168.023 169 163.17 169 157.184V42.8141C168.998 36.8287 160.87 31.976 150.844 31.976Z'

function JewelleryArcCard({
  name,
  image,
}: {
  name: string
  image: string
}) {
  const slug = (name as any || '').replace(/\s+/g, '-').toLowerCase()
  const clipId = `jewellery-arc-${slug}`

  return (
    <Link to={`/products?category=jewellery&subCategory=${encodeURIComponent(name)}`} className="group flex flex-col items-center animate-fade-in w-full">
      <svg
        viewBox="0 0 175 200"
        className="block w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={JEWELLERY_ARC_MASK} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect x="-10" y="4" width="195" height="198" fill="#1d1712" />
          <image
            href={image}
            x="-10"
            y="4"
            width="195"
            height="198"
            preserveAspectRatio="xMidYMid slice"
            className="origin-center transition-transform duration-500 group-hover:scale-110"
          />
        </g>
        <path d={JEWELLERY_ARC_BORDER} fill="none" stroke="#BD8A3C" />
      </svg>
      <span className="mt-3 font-serif text-sm font-semibold text-maroon text-center">
        {name}
      </span>
    </Link>
  )
}

function JewelleryHero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] max-h-[820px] overflow-hidden">
      <img
        src="/images/jewellery_hero.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-lg">
            <h1 className="font-serif text-5xl leading-[1.1] text-white md:text-6xl lg:text-7xl">
              Oxidised Jewellery
            </h1>
            <p className="mt-4 font-serif text-lg font-semibold text-white md:text-xl">
              Timeless. Versatile. Unapologetically You.
            </p>

            <img
              src="/hero_seperator.svg"
              alt=""
              className="mt-6 mb-8 h-4 w-auto"
            />

            <p className="mb-8 max-w-md text-base leading-relaxed text-white/75">
              Explore our exclusive collection of oxidised jewellery crafted to add a
              touch of tradition to your everyday look.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button className="!px-8 !py-3 cursor-pointer">Our Story</Button>
              </Link>
              <Link to="/products?category=jewellery">
                <Button variant="ghost" className="!px-8 !py-3 cursor-pointer">
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CollectionGrid({ collections }: { collections: { name: string; image: string }[] }) {
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
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <h2
            className="font-serif whitespace-nowrap text-maroon text-[28px] font-bold leading-none tracking-normal sm:text-4xl md:text-[48px]"
          >
            Oxidised Jewellery Collection
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
      <p className="mt-3 max-w-xl text-sm text-text md:text-base mb-10">
        Handcrafted pieces that blend heritage craftsmanship with contemporary style.
      </p>

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
          {collections.map((category) => (
            <div
              key={category.name}
              className="w-[70%] sm:w-1/2 md:w-1/4 shrink-0 px-[10px] md:px-[12px]"
            >
              <JewelleryArcCard
                name={category.name}
                image={category.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Jewellery() {
  const [mostSelling, setMostSelling] = useState<Product[]>(fallbackMostSelling)
  const [newArrivals, setNewArrivals] = useState<Product[]>(fallbackNewArrival)
  const [collections, setCollections] = useState<{ name: string; image: string }[]>([])

  useEffect(() => {
    async function loadCollections() {
      const categories = await getCategoriesList()
      const jewelleryCategory = categories.find(c => c.name.toLowerCase() === 'jewellery')
      if (jewelleryCategory && jewelleryCategory.subcategories && jewelleryCategory.subcategories.length > 0) {
        const unique = new Map();
        jewelleryCategory.subcategories.forEach(sub => {
          const details = getJewellerySubcategoryDetails(sub.name, sub.image);
          const key = details.name.toLowerCase();
          if (!unique.has(key) || (!unique.get(key).image && details.image)) {
            unique.set(key, details);
          }
        });
        setCollections(Array.from(unique.values()));
      } else {
        setCollections(fallbackCategories)
      }
    }
    loadCollections()
  }, [])

  useEffect(() => {
    async function loadJewellery() {
      const { products } = await getProducts({ category: 'jewellery', pageSize: 100 })
      if (products && products.length > 0) {
        const liveMostSelling = products.filter(p => p.isBestSelling)
        const liveNewArrivals = products.filter(p => p.isNewArrival)
        if (liveMostSelling.length > 0) setMostSelling(liveMostSelling.slice(0, 4))
        if (liveNewArrivals.length > 0) setNewArrivals(liveNewArrivals.slice(0, 4))
      }
    }
    loadJewellery()
  }, [])

  return (
    <div style={{ backgroundColor: '#f5eee1' }}>
      <JewelleryHero />
      <CollectionGrid collections={collections} />
      <ArtisanBanner image="/images/ourstory.png" />
      <div style={{ backgroundColor: '#f0e7d6', position: 'relative' }}>
        <DecorativeDivider className="py-6 absolute top-[-38px] left-0 w-full" />
        <ProductSection
          title="Most Selling"
          subtitle="Loved by our customers for their elegance, quality and timeless charm."
          products={mostSelling}
          viewAllLabel="View All Most Selling"
          viewAllTo="/products?category=jewellery&bestSelling=true"
        />
        <OccasionSection />
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh designs, inspired by the tradition and crafted for the modern muse."
          products={newArrivals}
          viewAllLabel="View All New Arrivals"
          viewAllTo="/products?category=jewellery&newArrival=true"
        />
        <DecorativeDivider className="py-6 absolute bottom-[-38px] left-0 w-full" />
      </div>
      <FestiveSpecial category="jewellery" />
      <ValueProposition />
      <OurStory background="transparent" />
    </div>
  )
}
