'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Phone, Mail } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 md:h-20 lg:h-24 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image
              src='/nlslogo4.png'
              alt='Noble Life Sciences Logo'
              width={100}
              height={100}
              className='h-12 w-auto sm:h-16 md:h-20 object-contain hover:opacity-90 transition-opacity'
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Info */}
          <div className='hidden lg:flex items-center space-x-4'>
            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <Phone className='h-4 w-4' />
              <span>+91 99129 24272</span>
            </div>
            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <Mail className='h-4 w-4' />
              <span>info@noblels.com</span>
            </div>
            <Button asChild>
              <Link href='/contact'>Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='icon'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <div className='flex flex-col space-y-6 mt-6'>
                <Link href='/' className='flex items-center space-x-3'>
                  <Image
                    src='/nlslogo4.png'
                    alt='Noble Life Sciences Logo'
                    width={48}
                    height={48}
                    className='h-12 w-12 object-contain'
                    priority
                  />
                  <div>
                    <h1 className='text-xl font-semibold text-foreground'>
                      Noble Life Sciences
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                      Pharmaceutical Excellence
                    </p>
                  </div>
                </Link>

                <nav className='flex flex-col space-y-3'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2'
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className='flex flex-col space-y-3 pt-4 border-t'>
                  <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                    <Phone className='h-4 w-4' />
                    <span>+91 99129 24272</span>
                  </div>
                  <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                    <Mail className='h-4 w-4' />
                    <span>info@noblels.com</span>
                  </div>
                  <Button asChild className='w-full'>
                    <Link href='/contact' onClick={() => setIsOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
