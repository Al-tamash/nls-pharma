import {
  FlaskConical,
  Package,
  Pill,
  Award,
  Truck,
  Handshake,
} from 'lucide-react'

export const PRODUCT_CATEGORIES = [
  {
    name: 'Solvents',
    slug: 'solvents',
    description:
      'High-quality chemical solvents for pharmaceutical applications',
    icon: FlaskConical,
    count: '15+ Products',
    href: '/products?category=solvents',
    color: 'bg-category-solvent text-category-solvent-text',
  },
  {
    name: 'Intermediates',
    slug: 'intermediates',
    description: 'API intermediates for pharmaceutical manufacturing',
    icon: Package,
    count: '25+ Products',
    href: '/products?category=intermediates',
    color: 'bg-category-intermediate text-category-intermediate-text',
  },
  {
    name: 'APIs',
    slug: 'apis',
    description: 'Active Pharmaceutical Ingredients',
    icon: Pill,
    count: '10+ Products',
    href: '/products?category=apis',
    color: 'bg-category-api text-category-api-text',
  },
] as const

export const WHY_CHOOSE_US = [
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
] as const
