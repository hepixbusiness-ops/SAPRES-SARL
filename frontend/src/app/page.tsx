import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import BlueCarbonBanner from '@/components/home/BlueCarbonBanner'
import ServicesPreview from '@/components/home/ServicesPreview'
import StatsSection from '@/components/home/StatsSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhySection from '@/components/home/WhySection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreview from '@/components/home/BlogPreview'
import CTABand from '@/components/home/CTABand'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BlueCarbonBanner />
        <ServicesPreview />
        <StatsSection />
        <FeaturedProducts />
        <WhySection />
        <FeaturedProjects />
        <TestimonialsSection />
        <BlogPreview />
        <CTABand />
      </main>
      <Footer />
    </>
  )
}
