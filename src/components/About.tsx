'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
        <div className="text-center mb-16">
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Text */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Name & Intro */}
            <div>
              <h3
                className="text-4xl font-bold text-cream mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                김연민
              </h3>
              <p
                className="text-lg text-accent mt-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                소나무 숲 사이, 천년의 빛을 담습니다.
              </p>
            </div>

            {/* Bio List */}
            <div>
              <ul className="space-y-3">
                {bioItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-light-gray">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                    <span style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exhibition History */}
            <div>
              <h4
                className="text-xl font-bold text-cream mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                전시 이력
              </h4>
              <div className="space-y-3">
                {exhibitions.map((ex, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 border border-light-gray/10 hover:border-accent/30 transition-colors duration-300"
                  >
                    <div className="w-px h-10 bg-accent/50" />
                    <div>
                      <p
                        className="text-cream font-bold"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
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

            {/* Exhibition Info Card */}
            <div className="border border-accent/30 bg-dark-gray/50 p-6 space-y-3">
              <h4
                className="text-lg font-bold text-accent mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                현재 전시
              </h4>
              <p
                className="text-cream font-bold text-lg"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                소나무 사진 초대전 - 서라벌의 빛
              </p>
              <div className="space-y-1 text-light-gray text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                <p>2026년 4월 12일 오후 2시 오픈</p>
                <p>4월 30일까지 전시</p>
                <p>경주 수오재</p>
              </div>
              <a
                href="#contact"
                className="inline-block mt-2 text-sm text-accent hover:text-accent-bright transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                전시 안내 보기 →
              </a>
            </div>
          </div>

          {/* Right Column - Invitation Image */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative group">
              <div className="overflow-hidden border border-light-gray/10">
                <Image
                  src="/invitation.png"
                  alt="소나무 사진 초대전 - 서라벌의 빛 초대장"
                  width={600}
                  height={800}
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}