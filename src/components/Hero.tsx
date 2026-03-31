'use client'

import { useEffect, useState } from 'react'

const poemLines = [
  '소나무 숲 사이로',
  '빛을 찾아 걸었습니다.',
  '',
  '숲을 감싸던',
  '짙은 안개,',
  '안개 속에서',
  '소나무들은',
  '더 또렷이 서 있었습니다.',
  '',
  '이 숲의 아침도',
  '천년 신라의 아침도',
  '이렇게',
  '고즈넉히',
  '소나무 숲에서',
  '밝아왔을 것입니다.',
  '',
  '그 오래된 빛을 따라',
  '소나무를 담았습니다.',
  '',
  '경주 수오재에서',
  '그 빛을 함께 만나기를 바랍니다.',
]

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-black">
      {/* Background texture overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/98 to-black/95" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative glow elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-float-delayed" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-56 pb-32">
        <div
          className={`space-y-10 transition-all duration-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Exhibition label */}
          <div className="animate-fade-in-up">
            <p
              className="text-xs tracking-widest text-accent/80 mb-2"
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.25em' }}
            >
              소나무 사진 초대전
            </p>
          </div>

          {/* Main Title */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            >
              서라벌의 빛
            </h1>
          </div>

          {/* Divider */}
          <div
            className="flex items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="w-16 h-px bg-accent/40" />
            <div className="w-2 h-2 rounded-full bg-accent/60" />
            <div className="w-16 h-px bg-accent/40" />
          </div>

          {/* Poem */}
          <div
            className="max-w-sm mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div
              className="text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {poemLines.map((line, index) =>
                line === '' ? (
                  <div key={index} className="h-4" />
                ) : (
                  <p
                    key={index}
                    className="text-base md:text-lg text-cream/85 leading-snug"
                  >
                    {line}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Photographer name */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.9s' }}
          >
            <p
              className="text-sm text-light-gray tracking-widest"
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
            >
              — 김연민
            </p>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '1.1s' }}
          >
            <a
              href="#gallery"
              className="px-8 py-4 bg-accent text-black font-medium transition-all hover:bg-accent-bright hover:scale-105 hover-lift"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              작품 보기
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-accent/50 text-cream font-medium transition-all hover:border-accent hover:bg-accent/10 hover-lift"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              전시 안내
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: '1.5s' }}
      >
        <a href="#gallery" className="flex flex-col items-center space-y-2 group">
          <span
            className="text-xs text-light-gray/60 tracking-widest group-hover:text-light-gray transition-colors"
            style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
          >
            작품
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-accent/40 to-transparent" />
        </a>
      </div>
    </section>
  )
}
