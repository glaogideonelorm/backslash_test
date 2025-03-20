export interface Product {
    id: string
    name: string
    description: string
    price: number
  }
  
  export interface CartItem {
    id: string
    productId: string
    name: string
    price: number
    quantity: number
  }
  