import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서라벌의 빛 | 김연민 사진전',
  description: '소나무 사진 초대전 - 서라벌의 빛. 김연민 사진작가의 소나무 사진전. 경주 수오재에서 2026년 4월 12일 오픈.',
  keywords: '김연민, 사진전, 소나무, 서라벌의 빛, 경주, 수오재, 초대전',
  openGraph: {
    title: '서라벌의 빛 | 김연민 사진전',
    description: '소나무 사진 초대전 - 서라벌의 빛. 경주 수오재에서 만나는 천년 신라의 빛.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Nanum+Gothic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
