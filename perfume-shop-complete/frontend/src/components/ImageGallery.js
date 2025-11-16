import React, { useState } from 'react';
export default function ImageGallery({images=[]}){
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <div className="main" style={{backgroundImage:`url(${images[active]})`}}/>
      <div className="thumbs">{images.map((src,i)=> <div key={i} className={`thumb ${i===active?'active':''}`} style={{backgroundImage:`url(${src})`}} onClick={()=>setActive(i)}/>)}</div>
    </div>
  );
}
