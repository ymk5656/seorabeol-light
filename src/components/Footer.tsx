import Link from 'next/link'

const navLinks = [
  { name: '작품', href: '#gallery' },
  { name: '작가소개', href: '#about' },
  { name: '전시안내', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-light-gray/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <h2
                className="text-2xl font-bold text-cream hover:text-accent-bright transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                서라벌의 빛
              </h2>
            </Link>
            <p
              className="text-sm text-light-gray/70"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              천년 신라의 빛을 담다
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-sm font-bold text-cream/60 mb-4 tracking-widest"
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }}
            >
              메뉴
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-light-gray hover:text-cream transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exhibition Info */}
          <div>
            <h3
              className="text-sm font-bold text-cream/60 mb-4 tracking-widest"
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }}
            >
              전시 정보
            </h3>
            <div className="space-y-1 text-sm text-light-gray" style={{ fontFamily: 'var(--font-body)' }}>
              <p>소나무 사진 초대전</p>
              <p>2026.04.12 ~ 04.30</p>
              <p>경주 수오재</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-light-gray/10 text-center">
          <p
            className="text-xs text-light-gray/50"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © 2026 김연민 사진전. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}