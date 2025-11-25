import { SectionHeader } from '@/components/shared/SectionHeader'
import { FeatureCard } from '@/components/shared/FeatureCard'
import { WHY_CHOOSE_US } from '@/lib/constants/categories'

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <SectionHeader
            badge="Why Choose Us"
            title="The Noble Life Sciences Advantage"
            description="We combine expertise, quality, and reliability to deliver exceptional value to our clients"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
