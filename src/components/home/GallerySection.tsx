import { SectionHeader } from '../ui/SectionHeader'
import './GallerySection.css'

const galleryImages = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop',
]

export function GallerySection() {
  const items = galleryImages.slice(0, 5)

  return (
    <section className="house-elegance">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          title="The House of Elegance"
          subtitle="Explore signature looks inspired by heritage and crafted for modern celebrations."
          className="mb-12"
        />
      </div>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="galleryArc" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.14 1,0 L1,0.82 Q0.5,0.68 0,0.82 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="house-elegance__row">
          {items.map((src, i) => (
            <div key={i} className="house-elegance__cell">
              <img src={src} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
