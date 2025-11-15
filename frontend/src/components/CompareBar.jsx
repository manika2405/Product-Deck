import React from 'react'
export default function CompareBar({ compare, onToggle }) {
  if (!compare || compare.length === 0) return null
  return (
    <div id="compare" style={{position:'fixed',bottom:10,left:10,right:10,background:'#fff',padding:10}}>
      <div style={{display:'flex',gap:10}}>
        {compare.map(p => (
          <div key={p.id}><img src={p.images && p.images[0]} alt={p.name} style={{width:60}}/><div>{p.name}</div></div>
        ))}
      </div>
      <button onClick={() => alert('Compare demo')}>Compare Now</button>
    </div>
  )
}
