'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, FlaskConical, Package, Pill } from 'lucide-react';
import { getProducts, getProductCategories } from '@/lib/wordpress';
import { Product, ProductCategory } from '@/types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Calculate categories with actual counts
        const categoriesData = getProductCategories(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        const productCategory = product.meta.category.toLowerCase();
        const selectedCategorySlug = selectedCategory.toLowerCase();
        
        // Handle both singular and plural forms
        if (selectedCategorySlug === 'intermediates') {
          return productCategory === 'intermediate' || productCategory === 'intermediates';
        }
        if (selectedCategorySlug === 'solvents') {
          return productCategory === 'solvent' || productCategory === 'solvents';
        }
        if (selectedCategorySlug === 'apis') {
          return productCategory === 'api' || productCategory === 'apis';
        }
        
        return productCategory === selectedCategorySlug;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.meta.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.meta.end_product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.meta.cas_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'solvent':
        return <FlaskConical className="h-4 w-4" />;
      case 'intermediate':
        return <Package className="h-4 w-4" />;
      case 'api':
        return <Pill className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'solvent':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-green-100 text-green-800';
      case 'api':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const headers = ['Sr. No', 'Product Name', 'End Product', 'CAS Number', 'Category'];
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map((product, index) => 
        [
          index + 1,
          `"${product.meta.product_name}"`,
          `"${product.meta.end_product}"`,
          `"${product.meta.cas_number}"`,
          `"${product.meta.category}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'noble-life-sciences-products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Products
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Comprehensive range of pharmaceutical intermediates, solvents, and APIs
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {categories.map((category) => {
                const Icon = category.name === 'Solvents' ? FlaskConical : 
                            category.name === 'Intermediates' ? Package : Pill;
                const isActive = selectedCategory === category.slug;
                return (
                  <Button
                    key={category.slug}
                    variant={isActive ? "default" : "secondary"}
                    className={`text-sm px-4 py-2 ${
                      isActive 
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" 
                        : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
                    }`}
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {category.name} ({category.count})
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-8 bg-secondary/5 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Filter by Category</h2>
              <p className="text-muted-foreground">Click on a category to view related products</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  className={selectedCategory === 'all' ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {categories.map((category) => {
                  const Icon = category.name === 'Solvents' ? FlaskConical : 
                              category.name === 'Intermediates' ? Package : Pill;
                  const isActive = selectedCategory === category.slug;
                  return (
                    <Button
                      key={category.slug}
                      variant={isActive ? "default" : "outline"}
                      className={isActive ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
              <Button 
                variant="outline" 
                onClick={exportToCSV}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedCategory === 'all' 
                  ? `Showing all ${filteredProducts.length} products` 
                  : `Showing ${filteredProducts.length} ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory} products`
                } {selectedCategory !== 'all' && `of ${products.length} total`}
              </p>
              <div className="flex gap-2">
                {selectedCategory !== 'all' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Show All
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Table */}
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
                      {filteredProducts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No products found matching your criteria.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts.map((product, index) => (
                          <TableRow key={product.id} className="hover:bg-secondary/50 transition-colors">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{product.meta.product_name}</div>
                              </div>
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
                                className={`flex items-center gap-1 w-fit ${getCategoryColor(product.meta.category)}`}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground">
              We offer custom synthesis and can source specific chemicals based on your requirements.
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Contact Our Team</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Spacing before footer */}
      <div className="h-8 bg-background"></div>
    </div>
  );
}