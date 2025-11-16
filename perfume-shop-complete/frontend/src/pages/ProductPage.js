import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ImageGallery from '../components/ImageGallery';
import RatingChart from '../components/RatingChart';
import { AuthContext } from '../contexts/AuthContext';

export default function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [size, setSize] = useState('');
  const [form, setForm] = useState({rating:5,comment:''});
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    fetch(api(`products/${id}`)).then(r=>r.json()).then(data=>{
      setProduct(data.product); setReviews(data.reviews || []);
      if(data.product && data.product.variants) setSize(data.product.variants[0].size);
    }).catch(console.error);
  },[id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if(!user){ alert('Login to post review'); return; }
    const res = await fetch(api(`products/${id}/reviews`), {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({author:user.name, rating:form.rating, comment:form.comment})
    });
    const data = await res.json();
    setReviews(prev => [data, ...prev]);
    setForm({rating:5,comment:''});
  };

  if(!product) return <div className="loading">Loading...</div>;
  return (
    <div className="product-page">
      <div className="product-top">
        <ImageGallery images={product.images} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="muted">{product.shortDesc}</p>
          <div className="price">₹ {product.price}</div>
          <p>{product.fullDesc}</p>
          <div><label>Size:</label><select value={size} onChange={(e)=>setSize(e.target.value)}>{product.variants.map(v=> <option key={v.size} value={v.size}>{v.size} - ₹{v.price}</option>)}</select></div>
          <div className="actions"><button className="primary">Add to Cart</button><button onClick={()=>{ navigator.clipboard.writeText(window.location.href); alert('Link copied'); }}>Share</button></div>
        </div>
      </div>
      <section className="reviews"><h3>Reviews</h3><form onSubmit={submitReview} className="review-form"><textarea placeholder="Write your review" value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})}/><select value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})}>{[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} stars</option>)}</select><button type="submit">Submit</button></form><RatingChart reviews={reviews} /><ul className="review-list">{reviews.map(r=> <li key={r.id}><div><strong>{r.author}</strong> <span className="muted">{new Date(r.createdAt).toLocaleString()}</span></div><div>Rating: {r.rating}</div><p>{r.comment}</p></li>)}</ul></section>
    </div>
  );
}
