import type React from 'react'
import ProductList from '../components/ProductList'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import { v4 as uuidv4 } from 'uuid'
import type { Product } from '../types'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleAddToCart = (product: Product) => {
    
    dispatch(
      addToCart({
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    )
  }

  return (
    <div className="home">
      <h1>Products</h1>
      <ProductList onAddToCart={handleAddToCart} />
    </div>
  )
}

export default Home
