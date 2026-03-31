'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const BASE = '/seorabeol-light'

const photos = [
  { id: 1,  src: `${BASE}/photos/_DSC0101.JPG` },
  { id: 2,  src: `${BASE}/photos/_DSC1507.JPG` },
  { id: 3,  src: `${BASE}/photos/_DSC1529.JPG` },
  { id: 4,  src: `${BASE}/photos/_DSC3021p.jpg` },
  { id: 5,  src: `${BASE}/photos/_DSC47901.jpg` },
  { id: 6,  src: `${BASE}/photos/_DSC7187.JPG` },
  { id: 7,  src: `${BASE}/photos/_DSC7203.JPG` },
  { id: 8,  src: `${BASE}/photos/_DSC8089-1.jpg` },
  { id: 9,  src: `${BASE}/photos/_DSC8116.JPG` },
  { id: 10, src: `${BASE}/photos/_DSC9262.JPG` },
  { id: 11, src: `${BASE}/photos/_DSC9337.JPG` },
  { id: 12, src: `${BASE}/photos/DSC_0345.JPG` },
  { id: 13, src: `${BASE}/photos/DSC_0410.JPG` },
  { id: 14, src: `${BASE}/photos/DSC_3161.JPG` },
  { id: 15, src: `${BASE}/photos/DSC_3165.JPG` },
  { id: 16, src: `${BASE}/photos/DSC_4243.JPG` },
  { id: 17, src: `${BASE}/photos/DSC_4556.JPG` },
  { id: 18, src: `${BASE}/photos/DSC_4688.JPG` },
  { id: 19, src: `${BASE}/photos/DSC_7492.jpg` },
  { id: 20, src: `${BASE}/photos/img015.jpg` },
  { id: 21, src: `${BASE}/photos/Panorama2 copy.jpg` },
  { id: 22, src: `${BASE}/photos/Panorama6.jpg` },
]

export default function Gallery() {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-photo-id') || '0')
            setVisiblePhotos((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
        })
      },
      { threshold: 0.01, rootMargin: '200px' }
    )

    document.querySelectorAll('[data-photo-id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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

        {/* Masonry Gallery — 모든 사진 세로(2:3) 비율로 통일 */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              data-photo-id={photo.id}
              className={`break-inside-avoid transition-all duration-700 transform hover-lift cursor-pointer ${
                visiblePhotos.includes(photo.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${(index % 6) * 0.06}s`,
                marginBottom: '1rem',
              }}
            >
              {/* 세로(2:3) 고정 비율 컨테이너 */}
              <div className="relative group overflow-hidden" style={{ aspectRatio: '2 / 3' }}>
                <Image
                  src={photo.src}
                  alt={`소나무 사진 ${photo.id}`}
                  fill
                  unoptimized
                  priority={index < 4}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
