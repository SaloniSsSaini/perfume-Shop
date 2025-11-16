import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
export default function CartPage(){
  const { cart } = useContext(CartContext);
  const total = cart.items.reduce((s,i)=> s + (i.price * i.qty), 0);
  return (
    <div className="grid-section">
      <h2>Your Cart</h2>
      {cart.items.length===0 ? <p>No items</p> : (<><ul>{cart.items.map((it,idx)=> <li key={idx}>{it.name} - {it.size} x {it.qty} = ₹{it.price*it.qty}</li>)}</ul><h3>Total: ₹{total}</h3><button onClick={()=>{ alert('Checkout stub: Place order to /api/orders'); }}>Place Order</button></>)}
    </div>
  );
}
