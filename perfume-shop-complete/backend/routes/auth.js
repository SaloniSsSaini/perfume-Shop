const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utils/fileHandler');
const SECRET = process.env.JWT_SECRET || 'replace_with_strong_secret';

router.post('/signup', (req,res)=>{
  const users = readJSON('users.json');
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'Email & password required'});
  if(users.find(u=>u.email===email)) return res.status(400).json({error:'Email exists'});
  const user = { id: Date.now(), name, email, password };
  users.push(user);
  writeJSON('users.json', users);
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: '7d' });
  res.json({ user:{id:user.id,name:user.name,email:user.email}, token });
});

router.post('/login', (req,res)=>{
  const users = readJSON('users.json');
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if(!user) return res.status(401).json({error:'Invalid credentials'});
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: '7d' });
  res.json({ user:{id:user.id,name:user.name,email:user.email}, token });
});

module.exports = router;
