'use client'

const BASE = '/seorabeol-light'

const mainPhotos = [
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
]

const panoramaPhotos = [
  { id: 21, src: `${BASE}/photos/Panorama2 copy.jpg` },
  { id: 22, src: `${BASE}/photos/Panorama6.jpg` },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-black to-dark-gray">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-cream"
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

        {/* 3-column masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {mainPhotos.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid" style={{ marginBottom: '1.5rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`소나무 사진 ${photo.id}`}
                loading={index < 4 ? 'eager' : 'lazy'}
                className="w-full block"
                style={{ maxHeight: '600px', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          ))}
        </div>

        {/* 파노라마 2장 — 2열 전체 너비 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {panoramaPhotos.map((photo) => (
            <div key={photo.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`소나무 파노라마`}
                loading="lazy"
                className="w-full block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
