import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
    try{
        const serializedState = localStorage.getItem('cart')
        if(!serializedState) {
            throw new Error("No cart in Storage")
        }

        const parsed = JSON.parse(serializedState)

        return {
            items: Array.isArray(parsed.items) ? parsed.items : [],
            totalQuantity: Number(parsed.totalQuantity) || 0,
            totalPrice: Number(parsed.totalPrice) || 0,
        }
    } catch {
        return {
            items: [],
            totalQuantity:0,
            totalPrice: 0,
        }
    }
}

const initialState = loadState()

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload
            const existingItem = state.items.find((item) => item.id === newItem.id)

            if(!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.image
                })
            } else {
                existingItem.quantity++
                existingItem.totalPrice += newItem.price
            }

            state.totalQuantity++
            state.totalPrice += newItem.price
            localStorage.setItem('cart', JSON.stringify(state))
        },

        removeFromCart : (action, state) => {
            const id = action.payload
            const existingItem = state.items.find((item) => item.id === id)

            if(existingItem) {
                state.totalQuantity -= existingItem.quantity
                state.totalPrice -= existingItem.totalPrice
                state.items = state.items.filter((item) => item.id !== id)
            }

            localStorage.setItem('cart', JSON.stringify(state))
        },
        updateQuantity: (state, action) => {
            const {id, quantity} = action.payload
            const item = state.items.find((item) => item.id === id)

            if(item && quantity > 0) {
                const diff = quantity - item.quantity
                item.quantity = quantity
                item.totalPrice = item.price * quantity

                state.totalQuantity += diff
                state.totalPrice += diff * item.price
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        
        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalPrice = 0
            localStorage.setItem('cart', JSON.stringify(state))
        },
    }
})

export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer