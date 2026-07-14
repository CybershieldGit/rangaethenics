import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Dropdown } from '../components/ui/Dropdown'
import { ProductCard } from '../components/home/ProductCard'
import { getAttributes, getProducts } from '../utils/api'
import {
  allProducts,
  formatPrice,
  PRICE_MAX,
  PRICE_MIN,
  type ProductType,
  Product,
} from '../data/products'

type CategoryFilter = 'all' | ProductType
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'

const categoryTabs: { label: string; value: CategoryFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Jewellery', value: 'jewellery' },
]

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
]

const PRODUCTS_PER_PAGE = 9
const FABRICS_VISIBLE_COUNT = 5

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[16px] text-text-dark">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[1px] border-1 ${checked
          ? 'border-[#420001] bg-[#420001] text-white'
          : 'border-[#BD8A3C]/60 bg-[#F8F0E5] text-transparent'
          }`}
      >
        {checked && <Check size={13} strokeWidth={3} />}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
      </span>
      {label}
    </label>
  )
}

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = (searchParams.get('category') as CategoryFilter) || 'all'
  const initialNewArrivalsOnly = searchParams.get('newArrival') === 'true'
  const initialBestSellingOnly = searchParams.get('bestSelling') === 'true'
  const occasionFilter = searchParams.get('occasion') || ''
  const subCategoryFilter = searchParams.get('subCategory') || ''
  const [category, setCategory] = useState<CategoryFilter>(
    ['all', 'clothing', 'jewellery'].includes(initialCategory) ? initialCategory : 'all',
  )
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(initialNewArrivalsOnly)
  const [bestSellingOnly, setBestSellingOnly] = useState(initialBestSellingOnly)
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [selectedWorks, setSelectedWorks] = useState<string[]>([])
  const [showMoreFabrics, setShowMoreFabrics] = useState(false)
  const [showMoreWorks, setShowMoreWorks] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [colorOptions, setColorOptions] = useState<string[]>([])
  const [sizeOptions, setSizeOptions] = useState<string[]>([])
  const [fabricOptions, setFabricOptions] = useState<string[]>([])
  const [workOptions, setWorkOptions] = useState<string[]>([])

  useEffect(() => {
    async function loadAllProducts() {
      const { products: liveProducts } = await getProducts({ pageSize: 100 })
      if (liveProducts && liveProducts.length > 0) {
        setProducts(liveProducts)
      }
    }
    loadAllProducts()
  }, [])

  useEffect(() => {
    async function loadAttributes() {
      const attributes = await getAttributes()
      setColorOptions(attributes.color)
      setSizeOptions(attributes.size)
      setFabricOptions(attributes.fabric)
      setWorkOptions(attributes.work)
    }
    loadAttributes()
  }, [])

  const filteredProducts = useMemo(() => {
    let results = products.filter((product) => {
      if (category !== 'all' && product.type !== category) return false
      if (newArrivalsOnly && bestSellingOnly) {
        if (!product.isNewArrival && !product.isBestSelling) return false
      } else if (newArrivalsOnly && !product.isNewArrival) {
        return false
      } else if (bestSellingOnly && !product.isBestSelling) {
        return false
      }
      if (product.price > maxPrice) return false
      if (occasionFilter && product.occasion !== occasionFilter) return false
      if (subCategoryFilter && product.subCategory?.toLowerCase() !== subCategoryFilter.toLowerCase()) return false
      return true
    })

    switch (sortBy) {
      case 'price-asc':
        results = [...results].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        results = [...results].sort((a, b) => b.price - a.price)
        break
      case 'newest':
        results = [...results].sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival))
        break
      default:
        results = [...results].sort(
          (a, b) => Number(b.isBestSelling) - Number(a.isBestSelling),
        )
    }

    return results
  }, [products, category, newArrivalsOnly, bestSellingOnly, maxPrice, sortBy, occasionFilter, subCategoryFilter])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [
    category,
    newArrivalsOnly,
    bestSellingOnly,
    maxPrice,
    sortBy,
    selectedColors,
    selectedSizes,
    selectedFabrics,
    selectedWorks,
    occasionFilter,
  ])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  function handleCategoryChange(value: CategoryFilter) {
    setCategory(value)
    if (value === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', value)
    }
    setSearchParams(searchParams)
  }

  function toggleItem<T>(value: T, selected: T[], setSelected: (items: T[]) => void) {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    )
  }

  const visibleFabrics = showMoreFabrics
    ? fabricOptions
    : fabricOptions.slice(0, FABRICS_VISIBLE_COUNT)

  const visibleWorks = showMoreWorks
    ? workOptions
    : workOptions.slice(0, FABRICS_VISIBLE_COUNT)

  const showClothingFilters = category === 'clothing'

  const pricePercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

  const breadcrumbItems =
    category === 'clothing'
      ? [{ label: 'Clothing', to: '/clothing' }, { label: 'Product' }]
      : category === 'jewellery'
        ? [{ label: 'Jewellery', to: '/jewellery' }, { label: 'Product' }]
        : [{ label: 'Product' }]

  return (
    <div className="bg-[#F8F0E5] pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mx-auto max-w-7xl px-4 pb-8 md:px-8 md:pb-10">
        {/* Tabs + count + sort */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex w-full overflow-hidden border border-[#BD8A3C]/50 lg:w-[311px]">
              {categoryTabs.map((tab, i) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleCategoryChange(tab.value)}
                  className={`flex flex-1 items-center justify-center px-2 py-2.5 text-center text-[16px] transition-colors ${i > 0 ? 'border-l border-[#BD8A3C]/50' : ''
                    } ${category === tab.value
                      ? 'bg-maroon text-white'
                      : 'bg-transparent text-text-dark hover:bg-maroon/5'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="hidden text-[16px] text-text md:inline">
              Showing {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 md:justify-start">
            <span className="text-[16px] text-text md:hidden">
              Showing {filteredProducts.length} products
            </span>
            <div className="flex items-center gap-2">
              <span className="hidden whitespace-nowrap text-[16px] text-text md:inline">Short by:</span>
              <Dropdown<SortOption>
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
                className="min-w-[180px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 lg:w-[311px]">
            <div className="border border-[#BD8A3C]/40 bg-[#F8F0E5]">
              <div className="space-y-5 px-5 py-5">
                <label className="flex cursor-pointer items-center justify-between text-[16px] text-text-dark">
                  New Arrivals
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-[1px] border-2 ${newArrivalsOnly
                      ? 'border-[#420001] bg-[#420001] text-white'
                      : 'border-[#420001] bg-transparent text-transparent'
                      }`}
                  >
                    {newArrivalsOnly && <Check size={15} strokeWidth={3} />}
                    <input
                      type="checkbox"
                      checked={newArrivalsOnly}
                      onChange={(e) => setNewArrivalsOnly(e.target.checked)}
                      className="sr-only"
                    />
                  </span>
                </label>
                <label className="flex cursor-pointer items-center justify-between text-[16px] text-text-dark">
                  Best Selling
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-[1px] border-2 ${bestSellingOnly
                      ? 'border-[#420001] bg-[#420001] text-white'
                      : 'border-[#420001] bg-transparent text-transparent'
                      }`}
                  >
                    {bestSellingOnly && <Check size={15} strokeWidth={3} />}
                    <input
                      type="checkbox"
                      checked={bestSellingOnly}
                      onChange={(e) => setBestSellingOnly(e.target.checked)}
                      className="sr-only"
                    />
                  </span>
                </label>
              </div>

              <div className="h-px w-full bg-[#BD8A3C]/30" />

              <div className="px-5 py-5">
                <p
                  className="mb-4 font-sans text-text"
                  style={{
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '20px',
                    letterSpacing: '1.5%',
                  }}
                >
                  Filter By
                </p>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[16px] text-text-dark">Price</p>
                  <span className="text-sm font-semibold text-maroon">
                    Up to {formatPrice(maxPrice)}
                    {maxPrice >= PRICE_MAX ? '+' : ''}
                  </span>
                </div>

                <div className="relative h-4">
                  <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#d9d2c6]" />
                  <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-maroon"
                    style={{ left: 0, width: `${pricePercent}%` }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="range-thumb"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="mt-3 flex justify-between text-xs text-text">
                  <span>{formatPrice(PRICE_MIN)}</span>
                  <span>{formatPrice(PRICE_MAX)}+</span>
                </div>
              </div>

              {showClothingFilters && (
                <>
                  <div className="h-px w-full bg-[#BD8A3C]/30" />

                  <div className="px-5 py-5">
                    <p className="mb-4 text-[16px] text-text-dark">Color</p>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((color) => {
                        // Colors are stored as "Name|#hex" by the admin panel.
                        const [name, hex] = color.includes('|')
                          ? color.split('|')
                          : [color, color]
                        const isSelected = selectedColors.includes(color)
                        return (
                          <button
                            key={color}
                            type="button"
                            title={name}
                            aria-label={`Filter by color ${name}`}
                            aria-pressed={isSelected}
                            onClick={() => toggleItem(color, selectedColors, setSelectedColors)}
                            className={`h-7 w-7 rounded-full border-2 transition-transform ${isSelected
                              ? 'scale-110 border-maroon'
                              : 'border-transparent hover:scale-105'
                              }`}
                            style={{ backgroundColor: hex }}
                          />
                        )
                      })}
                    </div>
                  </div>

                  <div className="h-px w-full bg-[#BD8A3C]/30" />

                  <div className="space-y-4 px-5 py-5">
                    <p className="text-[16px] text-text-dark">Size</p>
                    {sizeOptions.map((size) => (
                      <FilterCheckbox
                        key={size}
                        label={size}
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleItem(size, selectedSizes, setSelectedSizes)}
                      />
                    ))}
                  </div>

                  <div className="h-px w-full bg-[#BD8A3C]/30" />

                  <div className="space-y-4 px-5 py-5">
                    <p className="text-[16px] text-text-dark">Fabric</p>
                    {visibleFabrics.map((fabric) => (
                      <FilterCheckbox
                        key={fabric}
                        label={fabric}
                        checked={selectedFabrics.includes(fabric)}
                        onChange={() => toggleItem(fabric, selectedFabrics, setSelectedFabrics)}
                      />
                    ))}
                    {!showMoreFabrics && fabricOptions.length > FABRICS_VISIBLE_COUNT && (
                      <button
                        type="button"
                        onClick={() => setShowMoreFabrics(true)}
                        className="pt-1 text-[16px] font-medium text-maroon hover:underline"
                      >
                        + View More
                      </button>
                    )}
                  </div>

                  {workOptions.length > 0 && (
                    <>
                      <div className="h-px w-full bg-[#BD8A3C]/30" />

                      <div className="space-y-4 px-5 py-5">
                        <p className="text-[16px] text-text-dark">Work</p>
                        {visibleWorks.map((work) => (
                          <FilterCheckbox
                            key={work}
                            label={work}
                            checked={selectedWorks.includes(work)}
                            onChange={() => toggleItem(work, selectedWorks, setSelectedWorks)}
                          />
                        ))}
                        {!showMoreWorks && workOptions.length > FABRICS_VISIBLE_COUNT && (
                          <button
                            type="button"
                            onClick={() => setShowMoreWorks(true)}
                            className="pt-1 text-[16px] font-medium text-maroon hover:underline"
                          >
                            + View More
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="min-w-0 flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    aria-label="Product pagination"
                    className="mt-12 flex items-center justify-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="border border-[#BD8A3C]/50 px-4 py-2 text-[16px] text-text-dark transition-colors enabled:hover:border-maroon enabled:hover:text-maroon disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className={`flex h-10 w-10 items-center justify-center text-[16px] transition-colors ${currentPage === page
                          ? 'bg-maroon text-white'
                          : 'border border-[#BD8A3C]/50 text-text-dark hover:border-maroon hover:text-maroon'
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      disabled={currentPage === totalPages}
                      className="border border-[#BD8A3C]/50 px-4 py-2 text-[16px] text-text-dark transition-colors enabled:hover:border-maroon enabled:hover:text-maroon disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-maroon">No products found</p>
                <p className="mt-2 text-sm text-text">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
