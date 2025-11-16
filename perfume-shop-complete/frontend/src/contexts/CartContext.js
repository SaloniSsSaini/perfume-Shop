import React, { createContext, useState } from 'react';
export const CartContext = createContext();
export const CartProvider = ({children})=>{
  const [cart, setCart] = useState(()=> { const raw = localStorage.getItem('cart'); return raw ? JSON.parse(raw) : { items: [] }; });
  const sync = (c)=>{ setCart(c); localStorage.setItem('cart', JSON.stringify(c)); };
  return <CartContext.Provider value={{cart, setCart:sync}}>{children}</CartContext.Provider>;
};
