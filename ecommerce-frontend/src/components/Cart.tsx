import type React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { removeFromCart } from '../store/cartSlice'

const Cart: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item: { id: string; name: string; quantity: number; price: number }) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - $
              {item.price.toFixed(2)}
              <button type="button" onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart
