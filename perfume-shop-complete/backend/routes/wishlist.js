const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');

router.get('/:userId', (req,res)=>{
  const lists = readJSON('wishlists.json');
  const list = lists.find(l=>l.userId===Number(req.params.userId)) || { userId: Number(req.params.userId), items: [] };
  res.json(list);
});

router.post('/:userId/add', (req,res)=>{
  let lists = readJSON('wishlists.json');
  let list = lists.find(l=>l.userId===Number(req.params.userId));
  if(!list){ list = { userId: Number(req.params.userId), items: [] }; lists.push(list); }
  const { productId } = req.body;
  if(!list.items.includes(Number(productId))) list.items.push(Number(productId));
  writeJSON('wishlists.json', lists);
  res.json(list);
});

router.post('/:userId/remove', (req,res)=>{
  let lists = readJSON('wishlists.json');
  let list = lists.find(l=>l.userId===Number(req.params.userId));
  if(!list) return res.status(404).json({error:'Wishlist not found'});
  list.items = list.items.filter(id => id !== Number(req.body.productId));
  writeJSON('wishlists.json', lists);
  res.json(list);
});

module.exports = router;
