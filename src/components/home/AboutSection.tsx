import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { COMPANY_INFO } from '@/lib/constants/company'

export function AboutSection() {
  return (
    <section className='py-20 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <Badge variant='outline' className='w-fit'>
                About Us
              </Badge>
              <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                Excellence in Pharmaceutical Chemicals
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                {COMPANY_INFO.fullDescription}
              </p>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                {COMPANY_INFO.facilityDescription}
              </p>
              <div className='grid grid-cols-2 gap-4 pt-4'>
                <div className='text-center p-4 bg-secondary/50 rounded-lg'>
                  <div className='text-2xl font-bold text-primary'>
                    {COMPANY_INFO.stats.established}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Established
                  </div>
                </div>
                <div className='text-center p-4 bg-secondary/50 rounded-lg'>
                  <div className='text-2xl font-bold text-primary'>
                    {COMPANY_INFO.stats.productsCount}
                  </div>
                  <div className='text-sm text-muted-foreground'>Products</div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='aspect-square rounded-2xl overflow-hidden'>
                <Image
                  src='/facility.jpg'
                  alt='Pharmaceutical Manufacturing Facility'
                  width={800}
                  height={600}
                  className='w-full h-full object-cover'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
