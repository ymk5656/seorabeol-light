import Image from 'next/image'

const exhibitionDetails = [
  { label: '전시명', value: '소나무 사진 초대전 - 서라벌의 빛' },
  { label: '일시', value: '2026년 4월 12일(일) 오후 2시 오픈' },
  { label: '전시기간', value: '2026년 4월 12일 ~ 4월 30일' },
  { label: '장소', value: '경주 수오재' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-dark-gray to-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-cream animate-fade-in-up"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            전시 안내
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-accent/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <div className="w-12 h-px bg-accent/40" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Exhibition Details */}
          <div className="space-y-8">
            {/* Exhibition Info */}
            <div className="space-y-6">
              {exhibitionDetails.map((detail, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 pb-6 border-b border-light-gray/10 last:border-0"
                >
                  <span
                    className="text-xs tracking-widest text-accent/80 sm:w-24 sm:text-right flex-shrink-0 pt-1"
                    style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.1em' }}
                  >
                    {detail.label}
                  </span>
                  <span
                    className="text-xl text-cream font-bold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Poem excerpt */}
            <div className="border-l-2 border-accent/40 pl-6 py-2">
              <p
                className="text-light-gray leading-relaxed text-base"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                경주 수오재에서<br />
                그 빛을 함께 만나기를 바랍니다.
              </p>
              <p
                className="text-sm text-accent/70 mt-3"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                — 김연민
              </p>
            </div>
          </div>

          {/* Right: Invitation Image */}
          <div className="relative group">
            <div className="overflow-hidden border border-light-gray/10 shadow-2xl">
              <Image
                src="/invitation.png"
                alt="소나무 사진 초대전 - 서라벌의 빛 초대장"
                width={700}
                height={1000}
                unoptimized
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-102"
              />
            </div>
            <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/20 transition-colors duration-300 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}