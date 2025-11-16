import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
export default function Navbar(){
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <nav className="nav">
      <div className="nav-left"><Link to="/" className="brand">Perfume Shop</Link></div>
      <div className="nav-right">
        <input placeholder="Search..." onKeyDown={(e)=>{ if(e.key==='Enter') nav(`/?q=${e.target.value}`) }} />
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart</Link>
        {user ? (<><span className="muted">Hi, {user.name}</span><button onClick={()=>logout()}>Logout</button></>) : <Link to="/login">Login</Link>}
        <button onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?'Dark':'Light'}</button>
      </div>
    </nav>
  );
}
