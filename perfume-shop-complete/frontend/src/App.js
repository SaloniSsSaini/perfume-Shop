import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
function App(){
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/wishlist" element={<WishlistPage/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;
