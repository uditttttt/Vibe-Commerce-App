import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // <-- ADD THIS

// The URL of your backend API
const API_URL = "http://localhost:5000/api";

// 1. Create the context
const CartContext = createContext();

// 2. Create a custom hook to use the context easily
export function useCart() {
  return useContext(CartContext);
}

// 3. Create the Provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // This function fetches the current cart from the backend
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      setCartItems(response.data.cartItems);
      setTotal(parseFloat(response.data.total));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Fetch the cart when the component first loads
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to add an item to the cart
  const addToCart = async (productId, quantity) => {
    try {
      // Send the item to the backend API
      await axios.post(`${API_URL}/cart`, { productId, quantity });
      // Refresh the cart from the backend to show the new state
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart."); // <-- REPLACE setError
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (cartItemId) => {
    try {
      // Tell the backend to delete the item
      await axios.delete(`${API_URL}/cart/${cartItemId}`);
      // Refresh the cart
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item. Please try again."); // <-- REPLACE setError
    }
  };

  // --- 4. ADD THIS NEW CHECKOUT FUNCTION ---
  const checkout = async () => {
    try {
      // Call the checkout endpoint on the backend
      const response = await axios.post(`${API_URL}/cart/checkout`);

      // After checkout, the backend clears the cart.
      // We must re-fetch our cart to show that it's now empty.
      fetchCart();

      // Return the receipt data from the backend
      return response.data;
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again."); // <-- REPLACE setError
    }
  };

  // This is what the context will "provide" to all components
  const value = {
    cartItems,
    total,
    addToCart,
    removeFromCart,
    fetchCart, // We export this in case we need it for checkout
    checkout, // <-- Add this
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
