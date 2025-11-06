import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import your CartProvider
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap your entire <App /> with <CartProvider> */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)