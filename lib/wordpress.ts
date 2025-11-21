import { Product, ProductCategory, CompanyInfo } from '@/types/product'

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://cms.noblels.com'

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/products`, {
      next: { revalidate: 120 },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText)
      return getMockProducts()
    }

    const products = await res.json()
    return products.map((product: any) => ({
      id: product.id,
      title: {
        rendered: product.title.rendered,
      },
      meta: {
        product_name: product.meta?.product_name || product.title.rendered,
        end_product: product.meta?.end_product || 'N/A',
        cas_number: product.meta?.cas_number || 'N/A',
        category: product.meta?.category || 'Intermediate',
      },
      slug: product.slug,
      status: product.status,
      type: product.type,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return getMockProducts()
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/products?category=${category}`,
      {
        next: { revalidate: 120 },
      }
    )

    if (!res.ok) {
      return []
    }

    const products = await res.json()
    return products.map((product: any) => ({
      id: product.id,
      title: {
        rendered: product.title.rendered,
      },
      meta: {
        product_name: product.meta?.product_name || product.title.rendered,
        end_product: product.meta?.end_product || 'N/A',
        cas_number: product.meta?.cas_number || 'N/A',
        category: product.meta?.category || 'Intermediate',
      },
      slug: product.slug,
      status: product.status,
      type: product.type,
    }))
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return {
    name: 'M/s Noble Life Sciences',
    established: '2015',
    owner: 'Mr. P. Vinod Kumar',
    description:
      'Leading manufacturer of Intermediates for APIs and trader of Chemicals & Solvents',
    address:
      'Plot No.260, S.V Cooperative Society, IDA-Jeedimetla, Hyderabad-500055, Telangana-India',
    phone: '+91 99129 24272',
    email: 'info@noblels.com',
    location: {
      lat: 17.5449,
      lng: 78.4889,
    },
  }
}

export function getProductCategories(): ProductCategory[] {
  return [
    {
      name: 'Solvents',
      slug: 'solvents',
      description:
        'High-quality chemical solvents for pharmaceutical applications',
      count: 15,
    },
    {
      name: 'Intermediates',
      slug: 'intermediates',
      description: 'API intermediates for pharmaceutical manufacturing',
      count: 25,
    },
    {
      name: 'APIs',
      slug: 'apis',
      description: 'Active Pharmaceutical Ingredients',
      count: 10,
    },
  ]
}

// Mock data for development
function getMockProducts(): Product[] {
  return [
    {
      id: 1,
      title: { rendered: '3-Acetyl Pyridine' },
      meta: {
        product_name: '3-Acetyl Pyridine',
        end_product: 'Imatinib & Nilotinib',
        cas_number: '350-03-8',
        category: 'Intermediate',
      },
      slug: '3-acetyl-pyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 2,
      title: { rendered: 'Methyl Nicotinate' },
      meta: {
        product_name: 'Methyl Nicotinate',
        end_product: 'Imatinib',
        cas_number: '93-60-7',
        category: 'Intermediate',
      },
      slug: 'methyl-nicotinate',
      status: 'publish',
      type: 'product',
    },
    {
      id: 3,
      title: { rendered: '2-Chloro-6-methoxy-pyridine' },
      meta: {
        product_name: '2-Chloro-6-methoxy-pyridine',
        end_product: 'Various APIs',
        cas_number: '55305-95-8',
        category: 'Intermediate',
      },
      slug: '2-chloro-6-methoxy-pyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 4,
      title: { rendered: 'Acetone' },
      meta: {
        product_name: 'Acetone',
        end_product: 'Solvent for various processes',
        cas_number: '67-64-1',
        category: 'Solvent',
      },
      slug: 'acetone',
      status: 'publish',
      type: 'product',
    },
    {
      id: 5,
      title: { rendered: 'Methanol' },
      meta: {
        product_name: 'Methanol',
        end_product: 'Industrial solvent',
        cas_number: '67-56-1',
        category: 'Solvent',
      },
      slug: 'methanol',
      status: 'publish',
      type: 'product',
    },
  ]
}
