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
    return products.map((product: any) => {
      const acf = product.acf || {}
      return {
        id: product.id,
        title: {
          rendered: product.title?.rendered || '',
        },
        meta: {
          product_name: acf.product_name || product.title?.rendered || '',
          end_product: acf.end_product || 'N/A',
          cas_number: acf.cas_number || 'N/A', // Make sure this line is correct
          category: acf.category || 'Uncategorized',
        },
        slug: product.slug,
        status: product.status,
        type: product.type,
      }
    })
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
    // {
    //   name: 'Solvents',
    //   slug: 'solvents',
    //   description:
    //     'High-quality chemical solvents for pharmaceutical applications',
    // },
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
    // {
    //   name: 'Solvents',
    //   slug: 'solvents',
    //   description:
    //     'High-quality chemical solvents for pharmaceutical applications',
    //   count: 15,
    // },
    {
      name: 'Intermediates',
      slug: 'intermediates',
      description: 'API intermediates for pharmaceutical manufacturing',
      count: 8,
    },
    {
      name: 'APIs',
      slug: 'apis',
      description: 'Active Pharmaceutical Ingredients',
      count: 5,
    },
  ]
}

// Mock data for development
function getMockProducts(): Product[] {
  return [
    // Intermediates (8 products)
    {
      id: 1,
      title: { rendered: '3-Acetyl Pyridine' },
      meta: {
        product_name: '3-Acetyl Pyridine',
        cas_number: '350-03-8',
        category: 'Intermediate',
        end_product: 'Imatinib & Nilotinib',
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
        cas_number: '93-60-7',
        category: 'Intermediate',
        end_product: 'Various APIs',
      },
      slug: 'methyl-nicotinate',
      status: 'publish',
      type: 'product',
    },
    {
      id: 3,
      title: { rendered: '1-[2-Methyl-5-Nitrophenyl] Guanidine Nitrate' },
      meta: {
        product_name: '1-[2-Methyl-5-Nitrophenyl] Guanidine Nitrate',
        cas_number: '152460-08-7',
        category: 'Intermediate',
        end_product: 'Imatinib',
      },
      slug: '1-[2-methyl-5-nitrophenyl] guanidine nitrate',
      status: 'publish',
      type: 'product',
    },
    {
      id: 4,
      title: { rendered: '4-Aminopyridine' },
      meta: {
        product_name: '4-Aminopyridine',
        cas_number: '873-74-5',
        category: 'Intermediate',
        end_product: 'Dabigatran',
      },
      slug: '4-aminopyridine',
      status: 'publish',
      type: 'product',
    },
    {
      id: 5,
      title: { rendered: '1-Hydroxybenzotriazole Anhydrous (HOBT)' },
      meta: {
        product_name: '1-Hydroxybenzotriazole Anhydrous (HOBT)',
        cas_number: '504-64-5',
        category: 'Intermediate',
        end_product: 'Drug synthesis',
      },
      slug: '1-Hydroxybenzotriazole Anhydrous (HOBT)',
      status: 'publish',
      type: 'product',
    },
    {
      id: 6,
      title: {
        rendered:
          '2-Chloro-1,3-bis(dimethylamino)trimethinium hexafluorophosphate',
      },
      meta: {
        product_name:
          '2-Chloro-1,3-bis(dimethylamino)trimethinium hexafluorophosphate',
        cas_number: '249561-98-6',
        category: 'Intermediate',
        end_product: 'Etoricoxib',
      },
      slug: '2-chloro-1,3-bis(dimethylamino)trimethinium hexafluorophosphate',
      status: 'publish',
      type: 'product',
    },
    {
      id: 7,
      title: {
        rendered:
          '1-(6-Methylpyridin-3-yl)-2-(4-(methylsulfonyl)phenyl)ethenone',
      },
      meta: {
        product_name:
          '1-(6-Methylpyridin-3-yl)-2-(4-(methylsulfonyl)phenyl)ethenone',
        cas_number: '221615-75-4',
        category: 'Intermediate',
        end_product: 'Etoricoxib',
      },
      slug: '1-(6-Methylpyridin-3-yl)-2-(4-(methylsulfonyl)phenyl)ethenone',
      status: 'publish',
      type: 'product',
    },
    {
      id: 8,
      title: {
        rendered: '4-(methyl sulfonyl) phenyl acetic acid',
      },
      meta: {
        product_name: '4-(methyl sulfonyl) phenyl acetic acid',
        cas_number: '90536-66-6',
        category: 'Intermediate',
        end_product: 'Etoricoxib',
      },
      slug: '4-(methyl sulfonyl) phenyl acetic acid',
      status: 'publish',
      type: 'product',
    },

    // // Solvents (15 products)
    // {
    //   id: 31,
    //   title: { rendered: 'Acetone' },
    //   meta: {
    //     product_name: 'Acetone',
    //     end_product: 'Solvent for various processes',
    //     cas_number: '67-64-1',
    //     category: 'Solvent',
    //   },
    //   slug: 'acetone',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 32,
    //   title: { rendered: 'Methanol' },
    //   meta: {
    //     product_name: 'Methanol',
    //     end_product: 'Industrial solvent',
    //     cas_number: '67-56-1',
    //     category: 'Solvent',
    //   },
    //   slug: 'methanol',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 33,
    //   title: { rendered: 'Ethanol' },
    //   meta: {
    //     product_name: 'Ethanol',
    //     end_product: 'Pharmaceutical grade solvent',
    //     cas_number: '64-17-5',
    //     category: 'Solvent',
    //   },
    //   slug: 'ethanol',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 34,
    //   title: { rendered: 'Isopropanol' },
    //   meta: {
    //     product_name: 'Isopropanol',
    //     end_product: 'Pharmaceutical solvent',
    //     cas_number: '67-63-0',
    //     category: 'Solvent',
    //   },
    //   slug: 'isopropanol',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 35,
    //   title: { rendered: 'Butanol' },
    //   meta: {
    //     product_name: 'Butanol',
    //     end_product: 'Industrial solvent',
    //     cas_number: '71-36-3',
    //     category: 'Solvent',
    //   },
    //   slug: 'butanol',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 36,
    //   title: { rendered: 'Hexane' },
    //   meta: {
    //     product_name: 'Hexane',
    //     end_product: 'Extraction solvent',
    //     cas_number: '110-54-3',
    //     category: 'Solvent',
    //   },
    //   slug: 'hexane',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 37,
    //   title: { rendered: 'Heptane' },
    //   meta: {
    //     product_name: 'Heptane',
    //     end_product: 'Pharmaceutical solvent',
    //     cas_number: '142-82-5',
    //     category: 'Solvent',
    //   },
    //   slug: 'heptane',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 38,
    //   title: { rendered: 'Toluene' },
    //   meta: {
    //     product_name: 'Toluene',
    //     end_product: 'Industrial solvent',
    //     cas_number: '108-88-3',
    //     category: 'Solvent',
    //   },
    //   slug: 'toluene',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 39,
    //   title: { rendered: 'Xylene' },
    //   meta: {
    //     product_name: 'Xylene',
    //     end_product: 'Pharmaceutical solvent',
    //     cas_number: '1330-20-7',
    //     category: 'Solvent',
    //   },
    //   slug: 'xylene',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 40,
    //   title: { rendered: 'Dichloromethane' },
    //   meta: {
    //     product_name: 'Dichloromethane',
    //     end_product: 'Extraction solvent',
    //     cas_number: '75-09-2',
    //     category: 'Solvent',
    //   },
    //   slug: 'dichloromethane',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 41,
    //   title: { rendered: 'Chloroform' },
    //   meta: {
    //     product_name: 'Chloroform',
    //     end_product: 'Laboratory solvent',
    //     cas_number: '67-66-3',
    //     category: 'Solvent',
    //   },
    //   slug: 'chloroform',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 42,
    //   title: { rendered: 'Carbon Tetrachloride' },
    //   meta: {
    //     product_name: 'Carbon Tetrachloride',
    //     end_product: 'Industrial solvent',
    //     cas_number: '56-23-5',
    //     category: 'Solvent',
    //   },
    //   slug: 'carbon-tetrachloride',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 43,
    //   title: { rendered: 'Ethyl Acetate' },
    //   meta: {
    //     product_name: 'Ethyl Acetate',
    //     end_product: 'Pharmaceutical solvent',
    //     cas_number: '141-78-6',
    //     category: 'Solvent',
    //   },
    //   slug: 'ethyl-acetate',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 44,
    //   title: { rendered: 'Methyl Ethyl Ketone' },
    //   meta: {
    //     product_name: 'Methyl Ethyl Ketone',
    //     end_product: 'Industrial solvent',
    //     cas_number: '78-93-3',
    //     category: 'Solvent',
    //   },
    //   slug: 'methyl-ethyl-ketone',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 45,
    //   title: { rendered: 'Acetonitrile' },
    //   meta: {
    //     product_name: 'Acetonitrile',
    //     end_product: 'Pharmaceutical solvent',
    //     cas_number: '75-05-8',
    //     category: 'Solvent',
    //   },
    //   slug: 'acetonitrile',
    //   status: 'publish',
    //   type: 'product',
    // },

    // {
    //   id: 56,
    //   title: { rendered: 'N butyl Acetate' },
    //   meta: {
    //     product_name: 'N butyl Acetate',
    //     end_product: 'Pharmaceutical / industrial solvent',
    //     cas_number: '123-86-4',
    //     category: 'Solvent',
    //   },
    //   slug: 'n-butyl-acetate',
    //   status: 'publish',
    //   type: 'product',
    // },
    // {
    //   id: 57,
    //   title: { rendered: 'N propyl Acetate' },
    //   meta: {
    //     product_name: 'N propyl Acetate',
    //     end_product: 'Pharmaceutical / industrial solvent',
    //     cas_number: '109-60-4',
    //     category: 'Solvent',
    //   },
    //   slug: 'n-propyl-acetate',
    //   status: 'publish',
    //   type: 'product',
    // },

    // APIs (10 products)
    {
      id: 46,
      title: { rendered: 'Racecadotril IP/BP/EP' },
      meta: {
        product_name: 'Racecadotril IP/BP/EP',
        end_product: '',
        cas_number: '81110-73-8',
        category: 'API',
      },
      slug: 'racecadotril-ip-bp-ep',
      status: 'publish',
      type: 'product',
    },
    {
      id: 47,
      title: { rendered: 'Diltiazem IP/EP/USP' },
      meta: {
        product_name: 'Diltiazem IP/EP/USP',
        end_product: '',
        cas_number: '33286-22-5',
        category: 'API',
      },
      slug: 'diltiazem-ip-ep-usp',
      status: 'publish',
      type: 'product',
    },
    {
      id: 48,
      title: { rendered: 'Tamsulosin Hydrochloride IH/USP' },
      meta: {
        product_name: 'Tamsulosin Hydrochloride IH/USP',
        end_product: '',
        cas_number: '106463-17-6',
        category: 'API',
      },
      slug: 'tamsulosin-hydrochloride-ih-usp',
      status: 'publish',
      type: 'product',
    },
    {
      id: 49,
      title: { rendered: 'Dabigatran Etexilate Mesylate IH' },
      meta: {
        product_name: 'Dabigatran Etexilate Mesylate IH',
        end_product: '',
        cas_number: '872728-81-9',
        category: 'API',
      },
      slug: 'dabigatran-etexilate-mesylate-ih',
      status: 'publish',
      type: 'product',
    },
    {
      id: 50,
      title: { rendered: 'Linezolid  IH/IP/USP' },
      meta: {
        product_name: 'Linezolid  IH/IP/USP',
        end_product: '',
        cas_number: '165800-03-3',
        category: 'API',
      },
      slug: 'linezolid-ih-ip-usp',
      status: 'publish',
      type: 'product',
    },
  ]
}

// lib/wordpress.ts

// import { Product, ProductCategory, CompanyInfo } from '@/types/product'

// const WP_URL =
//   process.env.NEXT_PUBLIC_WP_URL || 'https://products.swaroopahospitals.com'
// export async function getProducts(): Promise<Product[]> {
//   try {
//     const res = await fetch(
//       `${WP_URL}/wp-json/wp/v2/products?per_page=100&_embed`,
//       {
//         next: { revalidate: 120 },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     if (!res.ok) {
//       console.error('Failed to fetch products:', res.status, res.statusText)
//       return []
//     }

//     const products = await res.json()

//     return products.map((product: any) => {
//       const acf = product.acf || {}
//       console.log('Product ACF Data:', {
//         id: product.id,
//         title: product.title?.rendered,
//         acf: acf,
//         cas_number: acf.cas_number,
//       })

//       return {
//         id: product.id,
//         title: {
//           rendered: product.title?.rendered || '',
//         },
//         meta: {
//           product_name: acf.product_name || product.title?.rendered || '',
//           end_product: acf.end_product || 'N/A',
//           cas_number: acf.cas_number || 'N/A', // Make sure this line is correct
//           category: acf.category || 'Uncategorized',
//         },
//         slug: product.slug,
//         status: product.status,
//         type: product.type,
//       }
//     })
//   } catch (error) {
//     console.error('Error fetching products:', error)
//     return []
//   }
// }
