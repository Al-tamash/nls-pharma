'use client'

import { useEffect, useState } from 'react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { CategoryCard } from '@/components/shared/CategoryCard'
import { PRODUCT_CATEGORIES } from '@/lib/constants/categories'
import { getProducts, getProductCategories } from '@/lib/wordpress'

export function ProductCategoriesSection() {
  const [categories, setCategories] = useState(PRODUCT_CATEGORIES)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const products = await getProducts()
        const categoriesWithCounts = getProductCategories(products)
        
        // Update PRODUCT_CATEGORIES with actual counts
        const updatedCategories = PRODUCT_CATEGORIES.map((cat) => {
          const matchingCategory = categoriesWithCounts.find(
            (c) => c.slug === cat.slug
          )
          return {
            ...cat,
            count: matchingCategory ? `${matchingCategory.count}` : cat.count,
          }
        })
        
        setCategories(updatedCategories)
      } catch (error) {
        console.error('Error fetching category counts:', error)
      }
    }
    
    fetchCounts()
  }, [])

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <SectionHeader
            badge="Products"
            title="Our Product Categories"
            description="Comprehensive range of pharmaceutical chemicals and intermediates to meet your manufacturing needs"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                description={category.description}
                icon={category.icon}
                count={category.count}
                href={category.href}
                color={category.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
