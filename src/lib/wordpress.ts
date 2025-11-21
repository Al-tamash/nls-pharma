import { Product, ProductCategory, CompanyInfo } from '@/types/product'

const WP_URL = process.env.NEXT_PUBLIC_WP_URL

export async function getProducts(): Promise<Product[]> {
  // Return mock products if WordPress URL is not configured
  if (!WP_URL) {
    console.log('Using mock products (WordPress URL not configured)')
    return getMockProducts()
  }

  try {
    // Use cache option for server-side, omit for client-side
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // Only add cache options in server environment
    if (typeof window === 'undefined') {
      ;(fetchOptions as any).next = { revalidate: 120 }
    }

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/products`, fetchOptions)

    if (!res.ok) {
      console.warn('Failed to fetch products from WordPress, using mock data')
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
    console.warn('WordPress fetch failed, using mock data:', error)
    return getMockProducts()
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  // If WordPress is not configured, filter mock products
  if (!WP_URL) {
    const mockProducts = getMockProducts()
    return mockProducts.filter((product) => {
      const productCategory = product.meta.category.toLowerCase()
      const categorySlug = category.toLowerCase()

      if (categorySlug === 'solvents') {
        return productCategory === 'solvent' || productCategory === 'solvents'
      }
      if (categorySlug === 'intermediates') {
        return (
          productCategory === 'intermediate' ||
          productCategory === 'intermediates'
        )
      }
      if (categorySlug === 'apis') {
        return productCategory === 'api' || productCategory === 'apis'
      }

      return productCategory === categorySlug
    })
  }

  try {
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (typeof window === 'undefined') {
      ;(fetchOptions as any).next = { revalidate: 120 }
    }

    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/products?category=${category}`,
      fetchOptions
    )

    if (!res.ok) {
      console.warn(
        'Failed to fetch products by category, returning empty array'
      )
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
    console.warn('Error fetching products by category:', error)
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

export function getProductCategories(products?: Product[]): ProductCategory[] {
  const categories = [
    {
      name: 'Solvents',
      slug: 'solvents',
      description:
        'High-quality chemical solvents for pharmaceutical applications',
    },
    {
      name: 'Intermediates',
      slug: 'intermediates',
      description: 'API intermediates for pharmaceutical manufacturing',
    },
    {
      name: 'APIs',
      slug: 'apis',
      description: 'Active Pharmaceutical Ingredients',
    },
  ]

  // If products array is provided, calculate actual counts
  if (products && products.length > 0) {
    return categories.map((category) => ({
      ...category,
      count: products.filter((product) => {
        const productCategory = product.meta.category.toLowerCase()
        if (category.slug === 'solvents') {
          return productCategory === 'solvent' || productCategory === 'solvents'
        }
        if (category.slug === 'intermediates') {
          return (
            productCategory === 'intermediate' ||
            productCategory === 'intermediates'
          )
        }
        if (category.slug === 'apis') {
          return productCategory === 'api' || productCategory === 'apis'
        }
        return productCategory === category.slug
      }).length,
    }))
  }

  // Default counts for mock data
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
    // Intermediates (25 products)
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
      id: 7,
      title: { rendered: '4-Aminopyridine' },
      meta: {
        product_name: '4-Aminopyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '504-64-5',
        category: 'Intermediate',
      },
      slug: '4-aminopyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 8,
      title: { rendered: '2-Aminopyridine' },
      meta: {
        product_name: '2-Aminopyridine',
        end_product: 'Drug synthesis',
        cas_number: '504-64-5',
        category: 'Intermediate',
      },
      slug: '2-aminopyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 11,
      title: { rendered: '3-Hydroxy Pyridine' },
      meta: {
        product_name: '3-Hydroxy Pyridine',
        end_product: 'Vitamin B6 synthesis',
        cas_number: '581-31-1',
        category: 'Intermediate',
      },
      slug: '3-hydroxy-pyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 12,
      title: { rendered: '4-Chloropyrimidine' },
      meta: {
        product_name: '4-Chloropyrimidine',
        end_product: 'Antiviral drugs',
        cas_number: '497-23-4',
        category: 'Intermediate',
      },
      slug: '4-chloropyrimidine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 13,
      title: { rendered: '2-Methylpyridine' },
      meta: {
        product_name: '2-Methylpyridine',
        end_product: 'Pharmaceutical synthesis',
        cas_number: '109-06-8',
        category: 'Intermediate',
      },
      slug: '2-methylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 14,
      title: { rendered: '4-Methylpyridine' },
      meta: {
        product_name: '4-Methylpyridine',
        end_product: 'Drug intermediates',
        cas_number: '108-89-4',
        category: 'Intermediate',
      },
      slug: '4-methylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 15,
      title: { rendered: '3-Bromopyridine' },
      meta: {
        product_name: '3-Bromopyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '626-55-1',
        category: 'Intermediate',
      },
      slug: '3-bromopyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 16,
      title: { rendered: '2,6-Dimethylpyridine' },
      meta: {
        product_name: '2,6-Dimethylpyridine',
        end_product: 'Drug synthesis',
        cas_number: '108-97-6',
        category: 'Intermediate',
      },
      slug: '2-6-dimethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 17,
      title: { rendered: '4-Formylpyridine' },
      meta: {
        product_name: '4-Formylpyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '872-85-3',
        category: 'Intermediate',
      },
      slug: '4-formylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 18,
      title: { rendered: '2-Cyanopyridine' },
      meta: {
        product_name: '2-Cyanopyridine',
        end_product: 'Drug synthesis',
        cas_number: '100-70-9',
        category: 'Intermediate',
      },
      slug: '2-cyanopyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 19,
      title: { rendered: '3-Cyanopyridine' },
      meta: {
        product_name: '3-Cyanopyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '100-61-2',
        category: 'Intermediate',
      },
      slug: '3-cyanopyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 20,
      title: { rendered: '4-Pyridylcarboxaldehyde' },
      meta: {
        product_name: '4-Pyridylcarboxaldehyde',
        end_product: 'Drug synthesis',
        cas_number: '872-85-3',
        category: 'Intermediate',
      },
      slug: '4-pyridylcarboxaldehyde',
      status: 'publish',
      type: 'product',
    },
    {
      id: 21,
      title: { rendered: '2-Aminomethylpyridine' },
      meta: {
        product_name: '2-Aminomethylpyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '3731-51-9',
        category: 'Intermediate',
      },
      slug: '2-aminomethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 22,
      title: { rendered: '4-Aminomethylpyridine' },
      meta: {
        product_name: '4-Aminomethylpyridine',
        end_product: 'Drug synthesis',
        cas_number: '3731-52-0',
        category: 'Intermediate',
      },
      slug: '4-aminomethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 23,
      title: { rendered: '2,4-Dimethylpyridine' },
      meta: {
        product_name: '2,4-Dimethylpyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '108-99-6',
        category: 'Intermediate',
      },
      slug: '2-4-dimethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 24,
      title: { rendered: '3,5-Dimethylpyridine' },
      meta: {
        product_name: '3,5-Dimethylpyridine',
        end_product: 'Drug synthesis',
        cas_number: '591-22-0',
        category: 'Intermediate',
      },
      slug: '3-5-dimethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 25,
      title: { rendered: '2-Ethylpyridine' },
      meta: {
        product_name: '2-Ethylpyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '104-90-5',
        category: 'Intermediate',
      },
      slug: '2-ethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 26,
      title: { rendered: '4-Ethylpyridine' },
      meta: {
        product_name: '4-Ethylpyridine',
        end_product: 'Drug synthesis',
        cas_number: '536-75-4',
        category: 'Intermediate',
      },
      slug: '4-ethylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 27,
      title: { rendered: '2-Phenylpyridine' },
      meta: {
        product_name: '2-Phenylpyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '1008-88-5',
        category: 'Intermediate',
      },
      slug: '2-phenylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 28,
      title: { rendered: '4-Phenylpyridine' },
      meta: {
        product_name: '4-Phenylpyridine',
        end_product: 'Drug synthesis',
        cas_number: '947-61-9',
        category: 'Intermediate',
      },
      slug: '4-phenylpyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 29,
      title: { rendered: '2,3-Dichloropyridine' },
      meta: {
        product_name: '2,3-Dichloropyridine',
        end_product: 'Pharmaceutical intermediates',
        cas_number: '2402-79-1',
        category: 'Intermediate',
      },
      slug: '2-3-dichloropyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 30,
      title: { rendered: '3,4-Dichloropyridine' },
      meta: {
        product_name: '3,4-Dichloropyridine',
        end_product: 'Drug synthesis',
        cas_number: '2457-50-5',
        category: 'Intermediate',
      },
      slug: '3-4-dichloropyridine',
      status: 'publish',
      type: 'product',
    },

    // Solvents (15 products)
    {
      id: 31,
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
      id: 32,
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
    {
      id: 33,
      title: { rendered: 'Ethanol' },
      meta: {
        product_name: 'Ethanol',
        end_product: 'Pharmaceutical grade solvent',
        cas_number: '64-17-5',
        category: 'Solvent',
      },
      slug: 'ethanol',
      status: 'publish',
      type: 'product',
    },
    {
      id: 34,
      title: { rendered: 'Isopropanol' },
      meta: {
        product_name: 'Isopropanol',
        end_product: 'Pharmaceutical solvent',
        cas_number: '67-63-0',
        category: 'Solvent',
      },
      slug: 'isopropanol',
      status: 'publish',
      type: 'product',
    },
    {
      id: 35,
      title: { rendered: 'Butanol' },
      meta: {
        product_name: 'Butanol',
        end_product: 'Industrial solvent',
        cas_number: '71-36-3',
        category: 'Solvent',
      },
      slug: 'butanol',
      status: 'publish',
      type: 'product',
    },
    {
      id: 36,
      title: { rendered: 'Hexane' },
      meta: {
        product_name: 'Hexane',
        end_product: 'Extraction solvent',
        cas_number: '110-54-3',
        category: 'Solvent',
      },
      slug: 'hexane',
      status: 'publish',
      type: 'product',
    },
    {
      id: 37,
      title: { rendered: 'Heptane' },
      meta: {
        product_name: 'Heptane',
        end_product: 'Pharmaceutical solvent',
        cas_number: '142-82-5',
        category: 'Solvent',
      },
      slug: 'heptane',
      status: 'publish',
      type: 'product',
    },
    {
      id: 38,
      title: { rendered: 'Toluene' },
      meta: {
        product_name: 'Toluene',
        end_product: 'Industrial solvent',
        cas_number: '108-88-3',
        category: 'Solvent',
      },
      slug: 'toluene',
      status: 'publish',
      type: 'product',
    },
    {
      id: 39,
      title: { rendered: 'Xylene' },
      meta: {
        product_name: 'Xylene',
        end_product: 'Pharmaceutical solvent',
        cas_number: '1330-20-7',
        category: 'Solvent',
      },
      slug: 'xylene',
      status: 'publish',
      type: 'product',
    },
    {
      id: 40,
      title: { rendered: 'Dichloromethane' },
      meta: {
        product_name: 'Dichloromethane',
        end_product: 'Extraction solvent',
        cas_number: '75-09-2',
        category: 'Solvent',
      },
      slug: 'dichloromethane',
      status: 'publish',
      type: 'product',
    },
    {
      id: 41,
      title: { rendered: 'Chloroform' },
      meta: {
        product_name: 'Chloroform',
        end_product: 'Laboratory solvent',
        cas_number: '67-66-3',
        category: 'Solvent',
      },
      slug: 'chloroform',
      status: 'publish',
      type: 'product',
    },
    {
      id: 42,
      title: { rendered: 'Carbon Tetrachloride' },
      meta: {
        product_name: 'Carbon Tetrachloride',
        end_product: 'Industrial solvent',
        cas_number: '56-23-5',
        category: 'Solvent',
      },
      slug: 'carbon-tetrachloride',
      status: 'publish',
      type: 'product',
    },
    {
      id: 43,
      title: { rendered: 'Ethyl Acetate' },
      meta: {
        product_name: 'Ethyl Acetate',
        end_product: 'Pharmaceutical solvent',
        cas_number: '141-78-6',
        category: 'Solvent',
      },
      slug: 'ethyl-acetate',
      status: 'publish',
      type: 'product',
    },
    {
      id: 44,
      title: { rendered: 'Methyl Ethyl Ketone' },
      meta: {
        product_name: 'Methyl Ethyl Ketone',
        end_product: 'Industrial solvent',
        cas_number: '78-93-3',
        category: 'Solvent',
      },
      slug: 'methyl-ethyl-ketone',
      status: 'publish',
      type: 'product',
    },
    {
      id: 45,
      title: { rendered: 'Acetonitrile' },
      meta: {
        product_name: 'Acetonitrile',
        end_product: 'Pharmaceutical solvent',
        cas_number: '75-05-8',
        category: 'Solvent',
      },
      slug: 'acetonitrile',
      status: 'publish',
      type: 'product',
    },

    {
      id: 56,
      title: { rendered: 'N butyl Acetate' },
      meta: {
        product_name: 'N butyl Acetate',
        end_product: 'Pharmaceutical / industrial solvent',
        cas_number: '123-86-4',
        category: 'Solvent',
      },
      slug: 'n-butyl-acetate',
      status: 'publish',
      type: 'product',
    },
    {
      id: 57,
      title: { rendered: 'N propyl Acetate' },
      meta: {
        product_name: 'N propyl Acetate',
        end_product: 'Pharmaceutical / industrial solvent',
        cas_number: '109-60-4',
        category: 'Solvent',
      },
      slug: 'n-propyl-acetate',
      status: 'publish',
      type: 'product',
    },

    // APIs (10 products)
    {
      id: 46,
      title: { rendered: 'Paracetamol' },
      meta: {
        product_name: 'Paracetamol',
        end_product: 'Analgesic and antipyretic',
        cas_number: '103-90-2',
        category: 'API',
      },
      slug: 'paracetamol',
      status: 'publish',
      type: 'product',
    },
    {
      id: 47,
      title: { rendered: 'Ibuprofen' },
      meta: {
        product_name: 'Ibuprofen',
        end_product: 'Nonsteroidal anti-inflammatory drug',
        cas_number: '15687-27-1',
        category: 'API',
      },
      slug: 'ibuprofen',
      status: 'publish',
      type: 'product',
    },
    {
      id: 48,
      title: { rendered: 'Aspirin' },
      meta: {
        product_name: 'Aspirin',
        end_product: 'Analgesic and anti-inflammatory',
        cas_number: '50-78-2',
        category: 'API',
      },
      slug: 'aspirin',
      status: 'publish',
      type: 'product',
    },
    {
      id: 49,
      title: { rendered: 'Amoxicillin' },
      meta: {
        product_name: 'Amoxicillin',
        end_product: 'Antibiotic',
        cas_number: '26787-78-0',
        category: 'API',
      },
      slug: 'amoxicillin',
      status: 'publish',
      type: 'product',
    },
    {
      id: 50,
      title: { rendered: 'Ciprofloxacin' },
      meta: {
        product_name: 'Ciprofloxacin',
        end_product: 'Antibiotic',
        cas_number: '85721-33-1',
        category: 'API',
      },
      slug: 'ciprofloxacin',
      status: 'publish',
      type: 'product',
    },
    {
      id: 51,
      title: { rendered: 'Metformin' },
      meta: {
        product_name: 'Metformin',
        end_product: 'Antidiabetic drug',
        cas_number: '657-24-9',
        category: 'API',
      },
      slug: 'metformin',
      status: 'publish',
      type: 'product',
    },
    {
      id: 52,
      title: { rendered: 'Omeprazole' },
      meta: {
        product_name: 'Omeprazole',
        end_product: 'Proton pump inhibitor',
        cas_number: '73590-58-6',
        category: 'API',
      },
      slug: 'omeprazole',
      status: 'publish',
      type: 'product',
    },
    {
      id: 53,
      title: { rendered: 'Atorvastatin' },
      meta: {
        product_name: 'Atorvastatin',
        end_product: 'Cholesterol-lowering drug',
        cas_number: '134523-00-5',
        category: 'API',
      },
      slug: 'atorvastatin',
      status: 'publish',
      type: 'product',
    },
    {
      id: 54,
      title: { rendered: 'Lisinopril' },
      meta: {
        product_name: 'Lisinopril',
        end_product: 'ACE inhibitor',
        cas_number: '83915-83-7',
        category: 'API',
      },
      slug: 'lisinopril',
      status: 'publish',
      type: 'product',
    },
    {
      id: 55,
      title: { rendered: 'Simvastatin' },
      meta: {
        product_name: 'Simvastatin',
        end_product: 'Cholesterol-lowering drug',
        cas_number: '79902-63-9',
        category: 'API',
      },
      slug: 'simvastatin',
      status: 'publish',
      type: 'product',
    },
  ]
}
