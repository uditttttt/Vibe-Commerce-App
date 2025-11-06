import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext"; // 1. Import the useCart hook

const API_URL = "http://localhost:5000/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // 2. Get the addToCart function from context

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  // 3. This function will be called when the button is clicked
  const handleAddToCart = (productId) => {
    // We add 1 of the item
    addToCart(productId, 1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow-lg overflow-hidden bg-white flex flex-col"
        >
          {" "}
          {/* ADDED: flex flex-col */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain p-2"
          />
          {/* The content area will now grow to fill available space */}
          <div className="p-4 flex-grow flex flex-col">
            {" "}
            {/* ADDED: flex-grow flex flex-col */}
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-lg text-gray-700 mb-4">
              ${product.price.toFixed(2)}
            </p>
            {/* The button will be pushed to the bottom of the content area */}
            <button
              onClick={() => handleAddToCart(product._id)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 mt-auto" // ADDED: mt-auto
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
