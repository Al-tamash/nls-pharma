import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants/company'

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Partner with Us?</h2>
          <p className="text-xl text-primary-foreground/90">
            Get in touch with our team to discuss your requirements and discover how we can
            support your pharmaceutical manufacturing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href={`tel:${COMPANY_INFO.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-5 w-5" />
              <span className="text-sm">{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5" />
              <span className="text-sm">{COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">
                {COMPANY_INFO.location.city}, {COMPANY_INFO.location.country}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
