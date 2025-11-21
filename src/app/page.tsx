'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FlaskConical,
  Package,
  Pill,
  Award,
  Truck,
  Handshake,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

export default function Home() {
  const productCategories = [
    {
      name: 'Solvents',
      description:
        'High-quality chemical solvents for pharmaceutical applications',
      icon: FlaskConical,
      count: '15+ Products',
      href: '/products?category=solvents',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Intermediates',
      description: 'API intermediates for pharmaceutical manufacturing',
      icon: Package,
      count: '25+ Products',
      href: '/products?category=intermediates',
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'APIs',
      description: 'Active Pharmaceutical Ingredients',
      icon: Pill,
      count: '10+ Products',
      href: '/products?category=apis',
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  const whyChooseUs = [
    {
      title: 'Experience',
      description:
        'Serving the pharmaceutical industry since 2015 with expertise and reliability',
      icon: Award,
    },
    {
      title: 'Quality',
      description:
        'Stringent quality control measures ensuring international standards',
      icon: FlaskConical,
    },
    {
      title: 'Delivery',
      description:
        'Timely and efficient delivery network across India and international markets',
      icon: Truck,
    },
    {
      title: 'Trust',
      description:
        'Building long-term relationships through transparency and integrity',
      icon: Handshake,
    },
  ]

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground'>
        <div className='absolute inset-0'>
          <img
            src='/hero-lab.jpg'
            alt='Modern Pharmaceutical Laboratory'
            className='w-full h-full object-cover opacity-20'
          />
        </div>
        <div className='relative container mx-auto px-4 py-20 lg:py-32'>
          <div className='max-w-4xl mx-auto text-center space-y-8'>
            <Badge
              variant='secondary'
              className='bg-primary-foreground/20 text-primary-foreground'
            >
              Established 2015
            </Badge>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
              M/s Noble Life Sciences
            </h1>
            <p className='text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto'>
              Leading manufacturer of Intermediates for APIs and trader of
              Chemicals & Solvents
            </p>
            <p className='text-lg text-primary-foreground/80 max-w-2xl mx-auto'>
              Based in Hyderabad, India, we serve the pharmaceutical industry
              with premium quality products and reliable supply chain solutions.
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

      {/* About Section */}
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
                  Founded in 2015 by Mr. Vinod Kumar Reddy Pavuluri (M.Tech),
                  Noble Life Sciences has established itself as a trusted name
                  in the pharmaceutical chemical industry. Leveraging his 13
                  years of experience in supply chain management, we specialize
                  in manufacturing high-quality intermediates for APIs and
                  trading premium chemicals and solvents.
                </p>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  Our state-of-the-art facility in Hyderabad, India, is equipped
                  with modern technology and staffed by experienced
                  professionals dedicated to maintaining the highest standards
                  of quality and safety.
                </p>
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div className='text-center p-4 bg-secondary/50 rounded-lg'>
                    <div className='text-2xl font-bold text-primary'>2015</div>
                    <div className='text-sm text-muted-foreground'>
                      Established
                    </div>
                  </div>
                  <div className='text-center p-4 bg-secondary/50 rounded-lg'>
                    <div className='text-2xl font-bold text-primary'>50+</div>
                    <div className='text-sm text-muted-foreground'>
                      Products
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative'>
                <div className='aspect-square rounded-2xl overflow-hidden'>
                  <img
                    src='/facility.jpg'
                    alt='Pharmaceutical Manufacturing Facility'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className='py-20 bg-secondary/10'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto space-y-12'>
            <div className='text-center space-y-4'>
              <Badge variant='outline'>Products</Badge>
              <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                Our Product Categories
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Comprehensive range of pharmaceutical chemicals and
                intermediates to meet your manufacturing needs
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              {productCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.name}
                    className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
                  >
                    <CardHeader className='text-center space-y-4'>
                      <div
                        className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}
                      >
                        <Icon className='h-8 w-8' />
                      </div>
                      <div>
                        <CardTitle className='text-xl'>
                          {category.name}
                        </CardTitle>
                        <Badge variant='secondary' className='mt-2'>
                          {category.count}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className='text-center space-y-4'>
                      <CardDescription className='text-base'>
                        {category.description}
                      </CardDescription>
                      <Button variant='outline' asChild className='w-full'>
                        <Link href={category.href}>
                          View Products
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='py-20 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto space-y-12'>
            <div className='text-center space-y-4'>
              <Badge variant='outline'>Why Choose Us</Badge>
              <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                The Noble Life Sciences Advantage
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                We combine expertise, quality, and reliability to deliver
                exceptional value to our clients
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {whyChooseUs.map((item) => {
                const Icon = item.icon
                return (
                  <Card
                    key={item.title}
                    className='text-center p-6 border-none shadow-sm'
                  >
                    <CardHeader className='space-y-4 pb-4'>
                      <div className='h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center'>
                        <Icon className='h-8 w-8 text-primary' />
                      </div>
                      <CardTitle className='text-xl'>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='text-base leading-relaxed'>
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-primary text-primary-foreground'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-8'>
            <h2 className='text-3xl md:text-4xl font-bold'>
              Ready to Partner with Us?
            </h2>
            <p className='text-xl text-primary-foreground/90'>
              Get in touch with our team to discuss your requirements and
              discover how we can support your pharmaceutical manufacturing
              needs.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' variant='secondary' asChild>
                <Link href='/contact'>
                  Contact Us
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                asChild
              >
                <Link href='tel:+919912924272'>
                  <Phone className='mr-2 h-4 w-4' />
                  Call Now
                </Link>
              </Button>
            </div>

            <div className='grid md:grid-cols-3 gap-8 pt-12'>
              <div className='flex items-center justify-center space-x-3'>
                <Phone className='h-5 w-5' />
                <span className='text-sm'>+91 99129 24272</span>
              </div>
              <div className='flex items-center justify-center space-x-3'>
                <Mail className='h-5 w-5' />
                <span className='text-sm'>info@noblels.com</span>
              </div>
              <div className='flex items-center justify-center space-x-3'>
                <MapPin className='h-5 w-5' />
                <span className='text-sm'>Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className='h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent'></div>

      {/* Spacing before footer */}
      <div className='h-8 bg-background'></div>
    </div>
  )
}
