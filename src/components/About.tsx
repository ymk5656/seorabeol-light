'use client'

import { useState, useEffect } from 'react'

const bioItems = [
  '전 울산대 교수',
  '전 울산 경제진흥원장',
  '울산 작가회의 회원',
  '최민식 홍순태 선생님께 사사',
]

const exhibitions = [
  { title: '불의 기억', desc: '초대전' },
  { title: 'Snow of Melody', desc: '초대전' },
  { title: '동상이몽', desc: '이상열 화백과 2인전' },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('about')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section-padding bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-cream animate-fade-in-up"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            작가 소개
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-accent/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <div className="w-12 h-px bg-accent/40" />
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — bio text */}
          <div
            className={`space-y-3 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <h3
                className="text-4xl font-bold text-cream mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                김연민
              </h3>
              <p className="text-lg text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                소나무 숲 사이, 천년의 빛을 담습니다.
              </p>
            </div>

            <ul className="space-y-1">
              {bioItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-light-gray">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                  <span style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <h4
                className="text-xl font-bold text-cream mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                전시 이력
              </h4>
              <div className="space-y-1.5">
                {exhibitions.map((ex, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 border border-light-gray/10 hover:border-accent/30 transition-colors duration-300"
                  >
                    <div className="w-px h-8 bg-accent/50" />
                    <div>
                      <p className="text-cream font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                        {ex.title}
                      </p>
                      <p className="text-sm text-light-gray" style={{ fontFamily: 'var(--font-body)' }}>
                        {ex.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-accent/30 bg-dark-gray/50 p-4 space-y-1.5">
              <h4 className="text-lg font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                현재 전시
              </h4>
              <p className="text-cream font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                소나무 사진 초대전 - 서라벌의 빛
              </p>
              <div className="text-light-gray text-sm" style={{ fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
                <p>2026년 4월 12일 오후 2시 오픈</p>
                <p>4월 30일까지 전시</p>
                <p>경주 수오재</p>
              </div>
              <a
                href="#contact"
                className="inline-block text-sm text-accent hover:text-accent-bright transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                전시 안내 보기 →
              </a>
            </div>
          </div>

          {/* Right — 가로등 소나무2 photo */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="overflow-hidden border border-light-gray/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/seorabeol-light/photos/garoedung-sonaemu2.jpg"
                alt="가로등 소나무"
                className="w-full h-full object-cover"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
