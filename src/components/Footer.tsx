import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full bg-gradient-to-b from-primary to-primary/90 text-primary-foreground'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              <Image
                src='/nlslogo4.png'
                alt='Noble Life Sciences Logo'
                width={64}
                height={64}
                className='object-contain'
                priority
              />
              <h3 className='text-2xl font-bold text-primary-foreground'>
                Noble Life Sciences
              </h3>
            </div>
            <p className='text-sm text-primary-foreground/80 leading-relaxed'>
              Leading manufacturer of Intermediates for APIs and trader of
              Chemicals & Solvents since 2015.
            </p>
            <div className='flex space-x-3'>
              <Link
                href='#'
                className='text-primary-foreground/80 hover:text-primary-foreground transition-colors'
              >
                <Facebook className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-primary-foreground/80 hover:text-primary-foreground transition-colors'
              >
                <Twitter className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-primary-foreground/80 hover:text-primary-foreground transition-colors'
              >
                <Linkedin className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-primary-foreground/80 hover:text-primary-foreground transition-colors'
              >
                <Instagram className='h-5 w-5' />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/products'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Products</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/products?category=solvents'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  Solvents
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=intermediates'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  Intermediates
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=apis'
                  className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                >
                  APIs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Contact Info</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <MapPin className='h-5 w-5 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-sm text-primary-foreground/80'>
                    Plot No.260, S.V Cooperative Society
                    <br />
                    IDA-Jeedimetla, Hyderabad-500055
                    <br />
                    Telangana-India
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 flex-shrink-0' />
                <p className='text-sm text-primary-foreground/80'>
                  +91 99129 24272
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 flex-shrink-0' />
                <p className='text-sm text-primary-foreground/80'>
                  info@noblels.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-primary-foreground/20 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0'>
            <p className='text-sm text-primary-foreground/60'>
              © {currentYear} M/s Noble Life Sciences. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
