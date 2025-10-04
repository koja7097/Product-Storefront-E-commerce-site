
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { Routes, Route } from 'react-router-dom'

function App() {


  return ( 
    <>
  <Navbar/>
 <Routes>
  <Route path='/' element={<Home/>}/>
   <Route path='/products' element={<Products/>}/>
   <Route path='/products/:id' element={<ProductDetail/>}/>
    <Route path='/cart' element={<Cart/>}/>
     <Route path='/checkout' element={<Checkout/>}/>
 </Routes>
    </>
  )
}

export default App
