import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Filter, Download } from 'lucide-react'
import { ProductCategory } from '@/types/product'

interface ProductFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  categories: ProductCategory[]
  onExport: () => void
  filteredCount: number
  totalCount: number
  startIndex: number
  endIndex: number
  onClearFilters: () => void
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onExport,
  filteredCount,
  totalCount,
  startIndex,
  endIndex,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <section className="py-8 bg-secondary/10 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, CAS numbers..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={onExport} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {filteredCount > 0 ? (
                <>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredCount)} of {filteredCount}{' '}
                  products
                  {selectedCategory !== 'all' &&
                    ` in ${categories.find((c) => c.slug === selectedCategory)?.name}`}
                </>
              ) : (
                'No products found'
              )}
            </p>
            <div className="flex gap-2">
              {selectedCategory !== 'all' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCategoryChange('all')}
                >
                  Show All
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
