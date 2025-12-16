import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import the action creators from CartSlice
import { removeItem, updateQuantity } from './CartSlice'; 
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    // Select the cart items array from the Redux store
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Helper function to safely extract the numeric cost from a string like "$15"
    const getNumericCost = (costString) => {
        // Assuming the cost is always formatted as "$XX"
        const numericPart = costString.toString().replace('$', '');
        return parseFloat(numericPart) || 0; // Use parseFloat and default to 0 if parsing fails
    };

    // Task: Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        let total = 0;
        
        // Iterate over the cart items and calculate the cumulative sum
        cart.forEach(item => {
            const itemCost = getNumericCost(item.cost);
            total += itemCost * item.quantity;
        });
        
        // Return the total rounded to two decimal places for currency format
        return total.toFixed(2);
    };

    // Task: Handle Continue Shopping button click
    const handleContinueShopping = (e) => {
        e.preventDefault();
        // Call the function passed from the parent component (ProductList.jsx)
        onContinueShopping(e); 
    };

    // Task: Handle Checkout button click (placeholder functionality)
    const handleCheckoutShopping = (e) => {
        e.preventDefault();
        alert('Functionality to be added for future reference');
    };

    // Task: Handle quantity increment
    const handleIncrement = (item) => {
        // Dispatch updateQuantity action to increase item quantity by 1
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1,
        }));
    };

    // Task: Handle quantity decrement
    const handleDecrement = (item) => {
        // If the quantity is greater than 1, decrement it
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1,
            }));
        } else {
            // If quantity is 1, decrementing would make it 0, so remove the item instead
            dispatch(removeItem(item.name));
        }
    };

    // Task: Handle removing a plant type from the cart
    const handleRemove = (item) => {
        // Dispatch removeItem action, passing the item name as the payload
        dispatch(removeItem(item.name));
    };

    // Task: Calculate total cost based on quantity for an individual item (subtotal)
    const calculateTotalCost = (item) => {
        const itemCost = getNumericCost(item.cost);
        const subtotal = itemCost * item.quantity;
        return subtotal.toFixed(2);
    };

    // Conditional rendering if the cart is empty
    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <h2 style={{ color: 'black' }}>Your cart is empty!</h2>
                <button className="get-started-button" onClick={handleContinueShopping}>
                    Go Shopping
                </button>
            </div>
        );
    }
    
    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">Price: ${getNumericCost(item.cost).toFixed(2)}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            {/* Display the item's subtotal */}
                            <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div> 
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {/* The provided template includes this empty div. Keeping it for structural integrity. */}
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div> 
            
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>
                    Continue Shopping
                </button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;