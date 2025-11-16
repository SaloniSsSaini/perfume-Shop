import React, { useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
export default function Login(){
  const [form, setForm] = useState({email:'', password:'', name:''});
  const nav = useNavigate();
  const { login } = useContext(AuthContext);
  const doLogin = async (signup=false) => {
    const path = signup ? 'auth/signup' : 'auth/login';
    const res = await fetch(api(path), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    const data = await res.json();
    if(res.ok){ login(data.user, data.token); nav('/'); } else { alert(data.error || 'Error'); }
  };
  return (
    <div className="grid-section">
      <h2>Login / Signup</h2>
      <input placeholder="Name (for signup)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={()=>doLogin(false)}>Login</button>
      <button onClick={()=>doLogin(true)}>Signup</button>
    </div>
  );
}
