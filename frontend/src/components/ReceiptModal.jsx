import React from 'react';

function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Checkout Successful!</h2>
        <p className="text-gray-700 mb-2">Your mock order has been placed.</p>
        
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Receipt Details</h3>
          <p><strong>Total Amount:</strong> ${receipt.totalAmount}</p>
          <p><strong>Order Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 mt-6"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;
