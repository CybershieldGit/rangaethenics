import { useState, useEffect } from 'react'
import { getGalleryVideos, type GalleryVideo } from '../../utils/api'
import { SectionHeader } from '../ui/SectionHeader'
import './GallerySection.css'

const fallbackImages = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=600&fit=crop',
]

export function GallerySection() {
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)

  useEffect(() => {
    async function loadVideos() {
      const data = await getGalleryVideos()
      setVideos(data)
    }
    loadVideos()
  }, [])

  const hasVideos = videos.length > 0

  let items: (GalleryVideo | string)[] = []
  if (hasVideos) {
    items = [...videos]
    while (items.length < 5) {
      items = [...items, ...videos]
    }
    items = items.slice(0, 5)
  } else {
    items = fallbackImages
  }

  const repeatedItems = [...items, ...items]

  return (
    <section className="house-elegance md:mb-0 mb-[30px]">
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
          <div className="house-elegance__track">
            {repeatedItems.map((item, i) => {
              const isVideo = hasVideos && typeof item === 'object' && 'url' in item
              return (
                <div
                  key={i}
                  className={`house-elegance__cell ${isVideo ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (isVideo) {
                      setSelectedVideo(item as GalleryVideo)
                    }
                  }}
                >
                  {isVideo ? (
                    <video
                      src={(item as GalleryVideo).url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item as string}
                      alt={`Gallery ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-black overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>
            <video
              src={selectedVideo.url}
              autoPlay
              controls
              playsInline
              className="max-w-full max-h-[90vh] block object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
