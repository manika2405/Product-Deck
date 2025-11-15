import React, { useState } from "react";
import "./ComparePage.css";

export default function ComparePage({ compareList, allProducts }) {
  const storedProduct = JSON.parse(localStorage.getItem("compareProduct"));
  const mainProduct = compareList[0] || storedProduct;

  const [showFilter, setShowFilter] = useState(false);

  if (!mainProduct) {
    return (
      <div className="compare-page">
        <h2>Compare Products</h2>
        <p>No products selected yet.</p>
      </div>
    );
  }

  const [selectedCategory, setSelectedCategory] = useState(
    mainProduct.category
  );

  const categories = [...new Set(allProducts.map((p) => p.category))];

  const categoryProducts = allProducts.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h2 className="compare-title">
          Comparing {selectedCategory.toUpperCase()} Products
        </h2>

        <div className="filter-wrapper">
          <button
            className="filter-btn"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filter Category ▾
          </button>

          {showFilter && (
            <div className="filter-dropdown">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilter(false);
                  }}
                  className="filter-option"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="compare-grid">
        {categoryProducts.map((p) => (
          <div key={p.id} className="compare-card">
            <img src={p.image} className="compare-img" />

            <h3 className="compare-name">{p.name}</h3>
            <p className="compare-price">${p.price}</p>
            <p className="compare-brand">{p.brand || "Generic"}</p>

            <p className="compare-desc">
              {p.description?.substring(0, 80)}...
            </p>

            {mainProduct.id === p.id && (
              <div className="highlight-box">
                <p className="highlight-text">SELECTED</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
