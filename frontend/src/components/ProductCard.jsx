import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product, addToCompare }) {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} className="card-image" />
      </div>

      <h3 className="card-title">{product.name}</h3>
      <p className="card-category">{product.category}</p>
      <p className="card-price">${product.price}</p>

      <div className="card-buttons">
        <button className="btn-primary" onClick={() => addToCompare(product)}>
          Compare
        </button>
      </div>
    </div>
  );
}
