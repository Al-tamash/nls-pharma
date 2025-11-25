import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants/company'

export function HeroSection() {
  return (
    <section className='relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground'>
      <div className='absolute inset-0'>
        <Image
          src='/hero-lab.jpg'
          alt='Modern Pharmaceutical Laboratory'
          fill
          className='object-cover opacity-20'
          priority
        />
      </div>
      <div className='relative container mx-auto px-4 py-20 lg:py-32'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <Badge
            variant='secondary'
            className='bg-primary-foreground/20 text-primary-foreground'
          >
            Established {COMPANY_INFO.established}
          </Badge>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
            {COMPANY_INFO.name}
          </h1>
          <p className='text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto'>
            {COMPANY_INFO.description}
          </p>
          <p className='text-lg text-primary-foreground/80 max-w-2xl mx-auto'>
            Based in {COMPANY_INFO.location.city},{' '}
            {COMPANY_INFO.location.country}, we serve the pharmaceutical
            industry with premium quality products and reliable supply chain
            solutions.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' variant='secondary' asChild>
              <Link href='/products'>
                Explore Our Products
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
              asChild
            >
              <Link href='/contact'>Get Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
