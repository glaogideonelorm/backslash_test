import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addToCart(state, action: PayloadAction<CartItem>) {
      
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      )
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateCartItem(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
