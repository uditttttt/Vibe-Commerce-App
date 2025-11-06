import React from 'react';
import { useCart } from '../context/CartContext';

function CartView() {
  const { cartItems, total, removeFromCart } = useCart();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is currently empty.</p>
      ) : (
        <div>
          <div className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center py-4">
                <div>
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} @ ${item.product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">${total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;
