import React, { useState } from 'react';
import api from '../api';
export default function AdminPanel(){
  const [form, setForm] = useState({name:'', shortDesc:'', fullDesc:'', category:'', price:0, images:''});
  const add = async ()=> {
    const img = form.images.split(',').map(s=>s.trim()).filter(Boolean);
    const res = await fetch(api('admin/product'), { method:'POST', headers:{'Content-Type':'application/json','x-admin-key':'adminsecret'}, body: JSON.stringify({...form, images: img})});
    if(res.ok){ alert('Product added'); setForm({name:'', shortDesc:'', fullDesc:'', category:'', price:0, images:''}); }
    else { alert('Error'); }
  };
  return (
    <div className="grid-section">
      <h2>Admin Panel</h2>
      <div className="admin-form">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Short Desc" value={form.shortDesc} onChange={e=>setForm({...form,shortDesc:e.target.value})}/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})}/>
        <input placeholder="Images (comma separated URLs)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})}/>
        <textarea placeholder="Full Desc" value={form.fullDesc} onChange={e=>setForm({...form,fullDesc:e.target.value})}/>
        <button onClick={add}>Add Product (x-admin-key: adminsecret)</button>
      </div>
    </div>
  );
}
