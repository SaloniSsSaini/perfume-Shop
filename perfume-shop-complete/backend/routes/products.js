const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');

router.get('/', (req,res)=>{
  let products = readJSON('products.json');
  const { q, category, min, max, sort } = req.query;
  if(q){ const qq = q.toLowerCase(); products = products.filter(p => p.name.toLowerCase().includes(qq) || (p.shortDesc||'').toLowerCase().includes(qq)); }
  if(category) products = products.filter(p => p.category === category);
  if(min) products = products.filter(p => Number(p.price) >= Number(min));
  if(max) products = products.filter(p => Number(p.price) <= Number(max));
  if(sort === 'price_asc') products.sort((a,b)=>a.price - b.price);
  else if(sort === 'price_desc') products.sort((a,b)=>b.price - a.price);
  else if(sort === 'new') products.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
  res.json(products);
});

router.get('/:id', (req,res)=>{
  const products = readJSON('products.json');
  const reviews = readJSON('reviews.json');
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if(!product) return res.status(404).json({error:'Not found'});
  const productReviews = reviews.filter(r => r.productId === id);
  const recommendations = products.filter(p => p.id !== id && p.category === product.category)
    .sort((a,b)=> Math.abs(a.price-product.price) - Math.abs(b.price-product.price)).slice(0,4);
  res.json({ product, reviews: productReviews, recommendations });
});

router.post('/:id/reviews', (req,res)=>{
  const reviews = readJSON('reviews.json');
  const id = Number(req.params.id);
  const newReview = {
    id: Date.now(),
    productId: id,
    author: req.body.author || 'Anonymous',
    rating: Number(req.body.rating) || 5,
    comment: req.body.comment || '',
    createdAt: new Date().toISOString()
  };
  reviews.unshift(newReview);
  writeJSON('reviews.json', reviews);
  res.status(201).json(newReview);
});

module.exports = router;
