'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection'
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection'
import { CTASection } from '@/components/home/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProductCategoriesSection />
      <WhyChooseUsSection />
      <CTASection />

      {/* Visual Separator */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Spacing before footer */}
      <div className="h-8 bg-background"></div>
    </div>
  )
}
