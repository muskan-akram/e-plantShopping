import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        // Initialize items as an array to hold cart contents
        items: [], 
    },
    reducers: {
        // 1. Reducer to add an item to the cart or increment its quantity
        addItem: (state, action) => {
            // Destructure product details from the action payload (e.g., { name, image, cost })
            const { name, image, cost } = action.payload; 
            
            // Check if the item already exists in the cart by comparing names
            const existingItem = state.items.find(item => item.name === name);
            
            if (existingItem) {
                // If item already exists, increase its quantity (avoids adding duplicates to the array)
                existingItem.quantity++;
            } else {
                // If item does not exist, add it to the cart with quantity 1
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },

        // 2. Reducer to remove an item completely from the cart
        removeItem: (state, action) => {
            // The action.payload is expected to be the 'name' of the item (a string)
            // Filter out the item whose name matches the payload
            state.items = state.items.filter(item => item.name !== action.payload);
        },

        // 3. Reducer to update the quantity of a specific item in the cart
        updateQuantity: (state, action) => {
            // Destructure the product name and the new quantity from the action payload (e.g., { name: 'Snake Plant', quantity: 3 })
            const { name, quantity } = action.payload; 

            // Find the item in the cart that matches the given name
            const itemToUpdate = state.items.find(item => item.name === name);
            
            if (itemToUpdate) {
                // If the item is found, update its quantity to the new value
                itemToUpdate.quantity = quantity; 
            }
        },
    },
});

// Export action creators for use in components (ProductList.jsx, CartItem.jsx)
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default for use in store.js
export default CartSlice.reducer;