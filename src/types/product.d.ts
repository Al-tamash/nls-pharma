export interface Product {
  id: number
  title: {
    rendered: string
  }
  meta: {
    product_name: string
    end_product: string
    cas_number: string
    category: 'Solvent' | 'Intermediate' | 'API'
  }
  slug: string
  status: string
  type: string
}

export interface ProductCategory {
  name: string
  slug: string
  description?: string
  count?: number
}

export interface CompanyInfo {
  name: string
  established: string
  owner: string
  description: string
  address: string
  phone: string
  email: string
  location: {
    lat: number
    lng: number
  }
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
