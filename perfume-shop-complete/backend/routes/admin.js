const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');
const ADMIN_KEY = process.env.ADMIN_KEY || 'adminsecret';
function checkAdmin(req,res,next){
  const k = req.headers['x-admin-key'];
  if(k !== ADMIN_KEY) return res.status(401).json({error:'Unauthorized'});
  next();
}
router.post('/product', checkAdmin, (req,res)=>{
  const products = readJSON('products.json');
  const newProduct = Object.assign({ id: Date.now(), createdAt: new Date().toISOString() }, req.body);
  products.unshift(newProduct);
  writeJSON('products.json', products);
  res.json(newProduct);
});
router.put('/product/:id', checkAdmin, (req,res)=>{
  const products = readJSON('products.json');
  const id = Number(req.params.id);
  const idx = products.findIndex(p=>p.id===id);
  if(idx===-1) return res.status(404).json({error:'Not found'});
  products[idx] = Object.assign(products[idx], req.body);
  writeJSON('products.json', products);
  res.json(products[idx]);
});
router.delete('/product/:id', checkAdmin, (req,res)=>{
  let products = readJSON('products.json');
  const id = Number(req.params.id);
  products = products.filter(p=>p.id!==id);
  writeJSON('products.json', products);
  res.json({ success:true });
});
module.exports = router;
