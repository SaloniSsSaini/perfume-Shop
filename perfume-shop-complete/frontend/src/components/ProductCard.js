import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function ProductCard({product}){
  const nav = useNavigate();
  return (
    <div className="card" onClick={()=>nav(`/product/${product.id}`)}>
      <div className="card-img" style={{backgroundImage:`url(${product.images[0]})`}}></div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.shortDesc}</p>
        <div className="price">₹ {product.price}</div>
      </div>
    </div>
  );
}
