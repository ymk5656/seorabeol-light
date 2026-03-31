import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import ScrollEffects from '@/components/ScrollEffects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <CustomCursor />
      <ScrollEffects />
      <Navigation />
      <Hero />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
