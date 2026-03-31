'use client'

import { useEffect, useState, useCallback } from 'react'

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), [])
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, prev, next])

  return (
    <>
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

          {/* 3-column masonry grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                data-photo-id={photo.id}
                onClick={() => setLightboxIndex(index)}
                className={`break-inside-avoid transition-all duration-700 transform cursor-pointer ${
                  visiblePhotos.includes(photo.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${(index % 4) * 0.08}s`,
                  marginBottom: '1.5rem',
                }}
              >
                <div className="relative group overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={`소나무 사진 ${photo.id}`}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white/0 group-hover:text-white/80 text-sm tracking-widest transition-all duration-300"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      크게 보기
                    </span>
                  </div>
                  <div className="absolute inset-0 border border-transparent group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none z-10"
            aria-label="닫기"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white text-4xl leading-none z-10 select-none"
            aria-label="이전"
          >
            ‹
          </button>

          {/* Photo */}
          <div
            className="max-h-screen max-w-screen-xl px-16 py-12 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[lightboxIndex].src}
              alt={`소나무 사진 ${photos[lightboxIndex].id}`}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white text-4xl leading-none z-10 select-none"
            aria-label="다음"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm"
            style={{ fontFamily: 'var(--font-body)' }}>
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
