// app/products/page.tsx
import { getProducts } from '@/lib/wordpress'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Our Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div key={product.id} className='border p-4 rounded-lg shadow'>
            <h2 className='text-xl font-semibold'>
              {product.meta.product_name}
            </h2>
            <div className='mt-2 text-sm text-gray-600'>
              <p>
                <strong>CAS:</strong> {product.meta.cas_number}
              </p>
              <p>
                <strong>Category:</strong> {product.meta.category}
              </p>
              <p>
                <strong>Use:</strong> {product.meta.end_product}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
