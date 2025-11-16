const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');
router.post('/place', (req,res)=>{
  const orders = readJSON('orders.json');
  const order = Object.assign({ id: Date.now(), createdAt: new Date().toISOString() }, req.body);
  orders.unshift(order);
  writeJSON('orders.json', orders);
  res.json(order);
});
router.get('/:userId', (req,res)=>{
  const orders = readJSON('orders.json');
  const list = orders.filter(o => o.userId === Number(req.params.userId));
  res.json(list);
});
module.exports = router;
