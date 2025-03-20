import type React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductListProps {
  onAddToCart: (product: Product) => void
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error))
  }, [])

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

export default ProductList
