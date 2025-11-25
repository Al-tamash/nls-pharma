'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Award,
  Users,
  Target,
  Eye,
  FlaskConical,
  Shield,
  Globe,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { getCompanyInfo } from '@/lib/wordpress'
import { useEffect, useState } from 'react'
import { CompanyInfo } from '@/types/product'

export default function AboutPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)

  useEffect(() => {
    async function fetchCompanyInfo() {
      const info = await getCompanyInfo()
      setCompanyInfo(info)
    }
    fetchCompanyInfo()
  }, [])

  const values = [
    {
      title: 'Quality Excellence',
      description:
        'We maintain stringent quality control measures and international standards across all our products and processes.',
      icon: Award,
    },
    {
      title: 'Customer Focus',
      description:
        'Our clients are at the heart of everything we do. We build lasting partnerships through reliability and trust.',
      icon: Users,
    },
    {
      title: 'Innovation',
      description:
        'Continuously improving our processes and expanding our product range to meet evolving industry needs.',
      icon: Target,
    },
    {
      title: 'Integrity',
      description:
        'Conducting business with transparency, honesty, and ethical practices in all our dealings.',
      icon: Shield,
    },
  ]

  const milestones = [
    {
      year: '2015',
      title: 'Company Founded',
      description:
        'Established by Mr. Vinod Kumar Reddy Pavuluri with a vision to serve the pharmaceutical industry.',
    },
    {
      year: '2017',
      title: 'Expansion',
      description:
        'Expanded product portfolio to include specialized API intermediates.',
    },
    {
      year: '2020',
      title: 'Quality Certification',
      description:
        'Achieved ISO certification and implemented advanced quality control systems.',
    },
    {
      year: '2023',
      title: 'Market Leadership',
      description:
        'Recognized as a trusted supplier in the pharmaceutical chemical industry.',
    },
  ]

  const stats = [
    { label: 'Years of Experience', value: '9+' },
    { label: 'Products', value: '50+' },
    { label: 'Clients', value: '100+' },
    { label: 'Countries Served', value: '15+' },
  ]

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <Badge
              variant='secondary'
              className='bg-primary-foreground/20 text-primary-foreground'
            >
              About Us
            </Badge>
            <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
              M/s Noble Life Sciences
            </h1>
            <p className='text-xl text-primary-foreground/90 max-w-2xl mx-auto'>
              Pioneering excellence in pharmaceutical intermediates and chemical
              trading since 2015
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <div className='space-y-4'>
                  <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                    Our Story
                  </h2>
                  <p className='text-lg text-muted-foreground leading-relaxed'>
                    Founded in 2015 by Mr. Vinod Kumar Reddy Pavuluri (M.Tech),
                    Noble Life Sciences leverages his 13 years of experience in
                    supply chain management to deliver high-quality
                    pharmaceutical intermediates and chemicals to the growing
                    pharmaceutical industry in India and beyond.
                  </p>
                  <p className='text-lg text-muted-foreground leading-relaxed'>
                    Headquartered in Hyderabad, the pharmaceutical capital of
                    India, we have strategically positioned ourselves to serve
                    both domestic and international markets with efficiency and
                    reliability.
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4 pt-4'>
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className='text-center p-4 bg-secondary/50 rounded-lg'
                    >
                      <div className='text-2xl font-bold text-primary'>
                        {stat.value}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='relative'>
                <div className='aspect-square rounded-2xl overflow-hidden'>
                  <Image
                    src='/quality-lab.jpg'
                    alt='Quality Control Laboratory'
                    width={800}
                    height={800}
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-20 bg-secondary/10'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-8'>
              <Card className='p-8 text-center'>
                <CardHeader className='space-y-4'>
                  <div className='h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center'>
                    <Target className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='text-2xl'>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base leading-relaxed'>
                    To manufacture and supply high-quality pharmaceutical
                    intermediates and chemicals while maintaining the highest
                    standards of safety, environmental responsibility, and
                    customer satisfaction. We strive to be the preferred partner
                    for pharmaceutical companies worldwide.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className='p-8 text-center'>
                <CardHeader className='space-y-4'>
                  <div className='h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center'>
                    <Eye className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='text-2xl'>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base leading-relaxed'>
                    To become a globally recognized leader in the pharmaceutical
                    chemical industry, known for innovation, quality, and
                    reliability. We aim to contribute significantly to the
                    advancement of healthcare through excellence in chemical
                    manufacturing and supply chain solutions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto space-y-12'>
            <div className='text-center space-y-4'>
              <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                Our Core Values
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                The principles that guide our business decisions and
                relationships
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card
                    key={value.title}
                    className='text-center p-6 border-none shadow-sm'
                  >
                    <CardHeader className='space-y-4 pb-4'>
                      <div className='h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center'>
                        <Icon className='h-8 w-8 text-primary' />
                      </div>
                      <CardTitle className='text-xl'>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='text-base leading-relaxed'>
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className='py-20 bg-secondary/10'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto space-y-12'>
            <div className='text-center space-y-4'>
              <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                Our Journey
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Key milestones in our growth and development
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {milestones.map((milestone, index) => (
                <Card key={milestone.year} className='relative overflow-hidden'>
                  <CardHeader className='space-y-2'>
                    <Badge variant='secondary' className='w-fit'>
                      {milestone.year}
                    </Badge>
                    <CardTitle className='text-lg'>{milestone.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className='text-sm leading-relaxed'>
                      {milestone.description}
                    </CardDescription>
                  </CardContent>
                  {index < milestones.length - 1 && (
                    <div className='hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border transform -translate-y-1/2' />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto space-y-12'>
            <div className='text-center space-y-4'>
              <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                Leadership
              </h2>
              <p className='text-lg text-muted-foreground'>
                Led by industry veterans with decades of experience
              </p>
            </div>

            <Card className='p-8'>
              <div className='flex flex-col md:flex-row items-center gap-6'>
                <div className='h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center'>
                  <Users className='h-12 w-12 text-primary' />
                </div>
                <div className='text-center md:text-left space-y-2'>
                  <h3 className='text-2xl font-bold text-foreground'>
                    Mr. Vinod Kumar Reddy Pavuluri
                  </h3>
                  <p className='text-primary font-medium'>
                    Founder & Managing Director
                  </p>
                  <p className='text-muted-foreground leading-relaxed'>
                    With 13 years of experience in supply chain management in
                    the pharmaceutical sector, Mr. Vinod Kumar Reddy Pavuluri
                    (M.Tech) has been instrumental in establishing M/s Noble
                    Life Sciences as a trusted name in the market. His vision
                    and leadership continue to drive the company's growth and
                    commitment to excellence.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-primary text-primary-foreground'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-8'>
            <h2 className='text-3xl md:text-4xl font-bold'>Partner with Us</h2>
            <p className='text-xl text-primary-foreground/90'>
              Experience the Noble Life Sciences difference - quality,
              reliability, and excellence in every interaction.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' variant='secondary' asChild>
                <Link href='/products'>
                  Explore Products
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                asChild
              >
                <Link href='/contact'>Get in Touch</Link>
              </Button>
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
