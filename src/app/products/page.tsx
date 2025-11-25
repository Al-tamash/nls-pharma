'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FlaskConical, Package, Pill, Loader2 } from 'lucide-react'
import { getProducts, getProductCategories } from '@/lib/wordpress'
import { Product, ProductCategory } from '@/types/product'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ProductTable } from '@/components/products/ProductTable'

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Read category from URL on initial load
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
        setFilteredProducts(productsData)

        const categoriesData = getProductCategories(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => {
        const productCategory = product.meta.category.toLowerCase()
        const selectedCategorySlug = selectedCategory.toLowerCase()

        if (selectedCategorySlug === 'intermediates') {
          return (
            productCategory === 'intermediate' ||
            productCategory === 'intermediates'
          )
        }
        if (selectedCategorySlug === 'solvents') {
          return productCategory === 'solvent' || productCategory === 'solvents'
        }
        if (selectedCategorySlug === 'apis') {
          return productCategory === 'api' || productCategory === 'apis'
        }

        return productCategory === selectedCategorySlug
      })
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.meta.product_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.meta.end_product
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.meta.cas_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, searchTerm, selectedCategory])

  const exportToCSV = () => {
    const headers = [
      'Sr. No',
      'Product Name',
      'End Product',
      'CAS Number',
      'Category',
    ]
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map((product, index) =>
        [
          index + 1,
          `"${product.meta.product_name}"`,
          `"${product.meta.end_product}"`,
          `"${product.meta.cas_number}"`,
          `"${product.meta.category}"`,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'noble-life-sciences-products.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
          <p className='text-muted-foreground'>Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
              Our Products
            </h1>
            <p className='text-xl text-primary-foreground/90'>
              Comprehensive range of pharmaceutical intermediates, solvents, and
              APIs
            </p>
            <div className='flex flex-wrap justify-center gap-4 pt-4'>
              {categories.map((category) => {
                const Icon =
                  category.name === 'Solvents'
                    ? FlaskConical
                    : category.name === 'Intermediates'
                    ? Package
                    : Pill
                const isActive = selectedCategory === category.slug
                return (
                  <Button
                    key={category.slug}
                    variant='outline'
                    className={`text-sm px-4 py-2 ${
                      isActive
                        ? 'bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90'
                        : 'bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10'
                    }`}
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    <Icon className='h-3 w-3 mr-1' />
                    {category.name} ({category.count})
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className='py-8 bg-secondary/5 border-b'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center space-y-4'>
              <h2 className='text-2xl font-bold text-foreground'>
                Filter by Category
              </h2>
              <p className='text-muted-foreground'>
                Click on a category to view related products
              </p>
              <div className='flex flex-wrap justify-center gap-3 pt-2'>
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  className={
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'hover:bg-primary/10 hover:text-primary hover:border-primary'
                  }
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {categories.map((category) => {
                  const Icon =
                    category.name === 'Solvents'
                      ? FlaskConical
                      : category.name === 'Intermediates'
                      ? Package
                      : Pill
                  const isActive = selectedCategory === category.slug
                  return (
                    <Button
                      key={category.slug}
                      variant={isActive ? 'default' : 'outline'}
                      className={
                        isActive
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'hover:bg-primary/10 hover:text-primary hover:border-primary'
                      }
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      <Icon className='h-4 w-4 mr-2' />
                      {category.name}
                      <Badge variant='secondary' className='ml-2 text-xs'>
                        {category.count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        onExport={exportToCSV}
        filteredCount={filteredProducts.length}
        totalCount={products.length}
        startIndex={startIndex}
        endIndex={endIndex}
        onClearFilters={handleClearFilters}
      />

      {/* Products Table */}
      <ProductTable
        products={currentProducts}
        startIndex={startIndex}
        totalProducts={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />

      {/* CTA Section */}
      <section className='py-16 bg-secondary/10'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <h2 className='text-3xl font-bold text-foreground'>
              Can't Find What You're Looking For?
            </h2>
            <p className='text-lg text-muted-foreground'>
              We offer custom synthesis and can source specific chemicals based
              on your requirements.
            </p>
            <Button size='lg' asChild>
              <Link href='/contact'>Contact Our Team</Link>
            </Button>
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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-[60vh]'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
