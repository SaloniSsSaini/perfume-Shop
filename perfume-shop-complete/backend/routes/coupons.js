const express = require('express');
const router = express.Router();
const { readJSON } = require('../utils/fileHandler');

router.get('/:code', (req,res)=>{
  const coupons = readJSON('coupons.json');
  const c = coupons.find(x=>x.code.toLowerCase()===req.params.code.toLowerCase());
  if(!c) return res.status(404).json({error:'Invalid coupon'});
  res.json(c);
});
module.exports = router;
