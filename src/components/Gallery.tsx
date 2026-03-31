'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Photo {
  id: number
  src: string
  height: number
}

const photos: Photo[] = [
  { id: 1,  src: '/photos/_DSC0101.JPG',        height: 400 },
  { id: 2,  src: '/photos/_DSC1507.JPG',        height: 500 },
  { id: 3,  src: '/photos/_DSC1529.JPG',        height: 450 },
  { id: 4,  src: '/photos/_DSC3021p.jpg',       height: 380 },
  { id: 5,  src: '/photos/_DSC47901.jpg',       height: 520 },
  { id: 6,  src: '/photos/_DSC7187.JPG',        height: 400 },
  { id: 7,  src: '/photos/_DSC7203.JPG',        height: 460 },
  { id: 8,  src: '/photos/_DSC8089-1.jpg',      height: 500 },
  { id: 9,  src: '/photos/_DSC8116.JPG',        height: 420 },
  { id: 10, src: '/photos/_DSC9262.JPG',        height: 380 },
  { id: 11, src: '/photos/_DSC9337.JPG',        height: 480 },
  { id: 12, src: '/photos/DSC_0345.JPG',        height: 440 },
  { id: 13, src: '/photos/DSC_0410.JPG',        height: 520 },
  { id: 14, src: '/photos/DSC_3161.JPG',        height: 400 },
  { id: 15, src: '/photos/DSC_3165.JPG',        height: 450 },
  { id: 16, src: '/photos/DSC_4243.JPG',        height: 380 },
  { id: 17, src: '/photos/DSC_4556.JPG',        height: 500 },
  { id: 18, src: '/photos/DSC_4688.JPG',        height: 420 },
  { id: 19, src: '/photos/DSC_7492.jpg',        height: 460 },
  { id: 20, src: '/photos/img015.jpg',          height: 400 },
  { id: 21, src: '/photos/Panorama2 copy.jpg',  height: 300 },
  { id: 22, src: '/photos/Panorama6.jpg',       height: 300 },
]

export default function Gallery() {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-photo-id') || '0')
            setVisiblePhotos((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
        })
      },
      { threshold: 0.05 }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const observeElement = (element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-black to-dark-gray">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up text-cream"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            작품
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-accent/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <div className="w-12 h-px bg-accent/40" />
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              data-photo-id={photo.id}
              ref={observeElement}
              className={`break-inside-avoid transition-all duration-700 transform hover-lift cursor-pointer ${
                visiblePhotos.includes(photo.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${(index % 8) * 0.07}s`,
                marginBottom: '1rem',
              }}
            >
              <div className="relative group overflow-hidden">
                <Image
                  src={photo.src}
                  alt={`김연민 소나무 사진 ${photo.id}`}
                  width={600}
                  height={photo.height}
                  unoptimized
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ height: `${photo.height}px` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border border-transparent group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}