import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';
export default function WishlistPage(){
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(()=> {
    if(!user) return;
    fetch(api(`wishlist/${user.id}`)).then(r=>r.json()).then(data=>{
      const promises = data.items.map(id=> fetch(api(`products/${id}`)).then(r=>r.json()).then(res=>res.product));
      Promise.all(promises).then(setItems);
    });
  },[user]);
  if(!user) return <div className="grid-section"><h2>Wishlist</h2><p>Please login</p></div>;
  return <div className="grid-section"><h2>Your Wishlist</h2><div className="grid">{items.map(p=> p && <ProductCard key={p.id} product={p} />)}</div></div>;
}
