import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'
import { FlaskConical, Package, Pill } from 'lucide-react'

interface ProductTableProps {
  products: Product[]
  startIndex: number
  totalProducts: number
  itemsPerPage: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onNextPage: () => void
  onPrevPage: () => void
}

export function ProductTable({
  products,
  startIndex,
  totalProducts,
  itemsPerPage,
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
}: ProductTableProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'solvent':
        return <FlaskConical className="h-4 w-4" />
      case 'intermediate':
        return <Package className="h-4 w-4" />
      case 'api':
        return <Pill className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'solvent':
        return 'bg-category-solvent text-category-solvent-text'
      case 'intermediate':
        return 'bg-category-intermediate text-category-intermediate-text'
      case 'api':
        return 'bg-category-api text-category-api-text'
      default:
        return 'bg-category-default text-category-default-text'
    }
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>
                Browse our comprehensive list of pharmaceutical chemicals and intermediates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary text-primary-foreground">
                      <TableHead className="text-primary-foreground">Sr. No</TableHead>
                      <TableHead className="text-primary-foreground">Product Name</TableHead>
                      <TableHead className="text-primary-foreground">End Product</TableHead>
                      <TableHead className="text-primary-foreground">CAS Number</TableHead>
                      <TableHead className="text-primary-foreground">Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No products found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product, index) => (
                        <TableRow key={product.id} className="hover:bg-secondary/50 transition-colors">
                          <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                          <TableCell>
                            <div className="font-medium">{product.meta.product_name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {product.meta.end_product}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {product.meta.cas_number}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`flex items-center gap-1 w-fit ${getCategoryColor(
                                product.meta.category
                              )}`}
                            >
                              {getCategoryIcon(product.meta.category)}
                              {product.meta.category}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {totalProducts > itemsPerPage && (
                <div className="mt-6 border-t pt-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Results Info */}
                    <div className="text-sm text-muted-foreground">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalProducts)}{' '}
                      of {totalProducts} products
                    </div>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onPrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          let pageNumber
                          if (totalPages <= 7) {
                            pageNumber = i + 1
                          } else if (currentPage <= 4) {
                            pageNumber = i + 1
                          } else if (currentPage >= totalPages - 3) {
                            pageNumber = totalPages - 6 + i
                          } else {
                            pageNumber = currentPage - 3 + i
                          }

                          return (
                            <Button
                              key={pageNumber}
                              variant={currentPage === pageNumber ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => onPageChange(pageNumber)}
                              className="min-w-[40px]"
                            >
                              {pageNumber}
                            </Button>
                          )
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
