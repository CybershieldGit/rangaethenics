import { SectionHeader } from '../ui/SectionHeader'

const galleryImages = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop',
]

export function GallerySection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          title="The House of Elegance"
          subtitle="Explore signature looks inspired by heritage and crafted for modern celebrations."
          className="mb-10"
        />

        <div className="flex gap-1 overflow-x-auto pb-2">
          {galleryImages.map((src, i) => (
            <div key={i} className="h-64 w-44 shrink-0 overflow-hidden md:h-80 md:w-52">
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
