import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale);
export default function RatingChart({reviews=[]}){
  const counts = [0,0,0,0,0];
  reviews.forEach(r => { const idx = 5 - Math.round(r.rating); if(idx>=0 && idx<5) counts[idx]++; });
  const data = { labels: ['5★','4★','3★','2★','1★'], datasets:[{ label:'Reviews', data: counts }] };
  return <div style={{maxWidth:400}}><Bar data={data} /></div>;
}
