import React from 'react'
import axios from 'axios'
export default function QuickView({ product, onClose }) {
  const placeOrder = async () => {
    try {
      const r = await axios.post('/api/orders', { items: [{ productId: product.id, qty: 1 }] })
      alert('Order placed: ' + JSON.stringify(r.data))
      onClose()
    } catch (e) {
      alert('Order failed (demo)')
    }
  }
  return (
    <div className="modal">
      <div>
        <button onClick={onClose}>Close</button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>₹{product.price}</p>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  )
}
