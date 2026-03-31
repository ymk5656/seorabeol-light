'use client'

import { useEffect, useState } from 'react'

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

const mainPhotos = photos.slice(0, 20)
const panoramaPhotos = photos.slice(20)

const STORAGE_KEY = 'seorabeol-likes'

export default function Gallery() {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])
  const [likes, setLikes] = useState<Record<number, number>>({})
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  // 좋아요 수 localStorage에서 불러오기
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored) as { likes: Record<number, number>; liked: Record<number, boolean> }
        setLikes(data.likes ?? {})
        setLiked(data.liked ?? {})
      }
    } catch {
      // ignore
    }
  }, [])

  // IntersectionObserver
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

  const toggleLike = (id: number) => {
    setLikes((prev) => {
      const isLiked = liked[id]
      const newLikes = { ...prev, [id]: (prev[id] ?? 0) + (isLiked ? -1 : 1) }
      const newLiked = { ...liked, [id]: !isLiked }
      setLiked(newLiked)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ likes: newLikes, liked: newLiked }))
      } catch { /* ignore */ }
      return newLikes
    })
  }

  const PhotoCard = ({ photo, index }: { photo: typeof photos[0]; index: number }) => (
    <div
      key={photo.id}
      data-photo-id={photo.id}
      className={`break-inside-avoid transition-all duration-700 transform ${
        visiblePhotos.includes(photo.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 4) * 0.08}s`, marginBottom: '1.5rem' }}
    >
      <div className="relative group overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={`소나무 사진 ${photo.id}`}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="w-full block"
          style={{ maxHeight: '600px', objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* 좋아요 버튼 */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => toggleLike(photo.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 select-none"
            style={{
              background: liked[photo.id] ? 'rgba(200,100,100,0.85)' : 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
            }}
            aria-label="좋아요"
          >
            <span className="text-base leading-none" style={{ filter: liked[photo.id] ? 'none' : 'grayscale(1) opacity(0.7)' }}>
              ♥
            </span>
            {(likes[photo.id] ?? 0) > 0 && (
              <span className="text-xs text-white font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                {likes[photo.id]}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )

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

        {/* 3-column masonry — 일반 사진 20장 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {mainPhotos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        {/* 파노라마 2장 — 2열 전체 너비 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {panoramaPhotos.map((photo, index) => (
            <div
              key={photo.id}
              data-photo-id={photo.id}
              className={`transition-all duration-700 transform ${
                visiblePhotos.includes(photo.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={`소나무 파노라마 ${index + 1}`}
                  loading="lazy"
                  className="w-full block"
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    onClick={() => toggleLike(photo.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 select-none"
                    style={{
                      background: liked[photo.id] ? 'rgba(200,100,100,0.85)' : 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(4px)',
                    }}
                    aria-label="좋아요"
                  >
                    <span className="text-base leading-none" style={{ filter: liked[photo.id] ? 'none' : 'grayscale(1) opacity(0.7)' }}>
                      ♥
                    </span>
                    {(likes[photo.id] ?? 0) > 0 && (
                      <span className="text-xs text-white font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                        {likes[photo.id]}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
