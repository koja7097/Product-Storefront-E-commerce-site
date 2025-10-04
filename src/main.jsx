import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CartProvider} from  './context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>
  </StrictMode>,
)
