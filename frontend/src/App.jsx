import React, { useState } from "react"; // 1. Import useState
import { useCart } from "./context/CartContext"; // 2. Import useCart
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";
import CheckoutForm from "./components/CheckoutForm"; // 3. Import CheckoutForm
import ReceiptModal from "./components/ReceiptModal"; // 4. Import ReceiptModal
import { Toaster } from "react-hot-toast"; // <-- ADD THIS

function App() {
  // 5. State for controlling the receipt modal
  const [receipt, setReceipt] = useState(null);

  // 6. Get total and checkout function from our context
  const { total, checkout } = useCart();

  // 7. This function is passed to the CheckoutForm
  const handleCheckout = async (formData) => {
    console.log("Checkout form data:", formData); // {name, email}

    // Call the checkout function from our context
    const receiptData = await checkout();

    // If checkout was successful, set the receipt data
    // This will trigger the modal to open
    if (receiptData) {
      setReceipt(receiptData);
    }
  };

  // 8. This function is passed to the modal
  const handleCloseModal = () => {
    setReceipt(null); // Clear receipt data to close the modal
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

          {/* 9. Render CheckoutForm only if there are items in the cart */}
          {/* We check total > 0 (it's a string, so '0' or '0.00') */}
          {parseFloat(total) > 0 && (
            <CheckoutForm onCheckout={handleCheckout} />
          )}
        </div>
      </div>

      {/* 10. Render the modal. It will only show if 'receipt' is not null */}
      <ReceiptModal receipt={receipt} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
