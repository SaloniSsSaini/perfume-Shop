import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
export default function Home(){
  const [products, setProducts] = useState([]);
  const loc = useLocation();
  useEffect(()=> {
    const q = new URLSearchParams(loc.search).get('q') || '';
    fetch(api(`products?q=${encodeURIComponent(q)}`)).then(r=>r.json()).then(setProducts).catch(console.error);
  },[loc.search]);
  return (
    <main>
      <section className="banner"><div className="hero-text"><h1>Discover Your Signature Scent</h1><p>Limited time: 20% off on selected collections.</p><button className="cta" onClick={()=>window.scrollTo({top:600,behavior:'smooth'})}>Explore Collections</button></div></section>
      <section className="grid-section"><h2>Featured Perfumes</h2><div className="grid">{products.map(p=> <ProductCard key={p.id} product={p} />)}</div></section>
    </main>
  );
}
