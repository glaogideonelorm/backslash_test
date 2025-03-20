import type React from 'react'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button type="button" onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
