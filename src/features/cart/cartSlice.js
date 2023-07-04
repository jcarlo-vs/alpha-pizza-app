import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, { payload }) {
      // payload = {newItem}
      const { name, quantity } = payload
      const includes = state.cart.some((item) => item.name === name)
      if (includes) {
        const item = state.cart.find((item) => item.name === name)
        console.log(item)
        item.quantity++
        console.log(current(state.cart))
        return
      }

      state.cart.push(payload)
    },
    deleteItem(state, { payload }) {
      // payload = pizzaId
      console.log(payload)
      state.cart = state.cart.filter((item) => item.pizzaId !== payload)
    },
    increaseItemQuantity(state, { payload }) {
      const item = state.cart.find((item) => item.pizzaId === payload)
      item.quantity++
      item.total = item.quantity * item.unitPrice
    },
    decreaseItemQuantity(state, { payload }) {
      const item = state.cart.find((item) => item.pizzaId === payload)
      item.quantity--
      item.total = item.quantity * item.unitPrice
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getTotalCartQuantity = (state) => {
  const total = state.cart.cart.reduce((sum, item) => {
    sum += item.quantity
    return sum
  }, 0)

  return total
}

export const getTotalCartPrice = (state) => {
  const total = state.cart.cart.reduce((sum, item) => {
    sum += item.totalPrice
    return sum
  }, 0)

  return total
}

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
