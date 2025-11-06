import React, { useState } from "react";
import { useCart } from "./context/CartContext";
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";
import { Toaster } from "react-hot-toast";

function App() {
  const [receipt, setReceipt] = useState(null);
  const { total, checkout } = useCart();

  const handleCheckout = async (formData) => {
    console.log("Checkout form data:", formData);
    const receiptData = await checkout();
    if (receiptData) {
      setReceipt(receiptData);
    }
  };

  const handleCloseModal = () => {
    setReceipt(null);
  };

  return (
    <div className="container mx-auto p-4 pt-8">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Vibe Commerce
      </h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>

        <div className="mt-8 lg:mt-0">
          <CartView />
          {parseFloat(total) > 0 && (
            <CheckoutForm onCheckout={handleCheckout} />
          )}
        </div>
      </div>

      <ReceiptModal receipt={receipt} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
