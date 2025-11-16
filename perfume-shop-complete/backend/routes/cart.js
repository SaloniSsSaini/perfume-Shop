const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');

router.get('/:userId', (req,res)=>{
  const carts = readJSON('carts.json');
  const cart = carts.find(c => c.userId === Number(req.params.userId)) || { userId: Number(req.params.userId), items: [] };
  res.json(cart);
});

router.post('/:userId/add', (req,res)=>{
  let carts = readJSON('carts.json');
  let cart = carts.find(c => c.userId === Number(req.params.userId));
  if(!cart){ cart = { userId: Number(req.params.userId), items: [] }; carts.push(cart); }
  const { productId, size, qty, price, name, image } = req.body;
  const existing = cart.items.find(i => i.productId === Number(productId) && i.size === size);
  if(existing) existing.qty += Number(qty);
  else cart.items.push({ productId: Number(productId), size, qty: Number(qty), price: Number(price), name, image });
  writeJSON('carts.json', carts);
  res.json(cart);
});

router.post('/:userId/remove', (req,res)=>{
  let carts = readJSON('carts.json');
  const cart = carts.find(c => c.userId === Number(req.params.userId));
  if(!cart) return res.status(404).json({error:'Cart not found'});
  cart.items = cart.items.filter(i => !(i.productId === Number(req.body.productId) && i.size === req.body.size));
  writeJSON('carts.json', carts);
  res.json(cart);
});

module.exports = router;
