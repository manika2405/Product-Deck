import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({ addToCompare, setAllProducts }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.products.map((p) => ({
          id: p.id,
          name: p.title,
          category: p.category,
          price: p.price,
          image: p.thumbnail,
          description: p.description,
          brand: p.brand,
        }));

        setProducts(mapped);
        setFiltered(mapped);
        setAllProducts(mapped);

        setCategories([...new Set(mapped.map((p) => p.category))]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterByCategory = (cat) => {
    if (cat === "All") setFiltered(products);
    else setFiltered(products.filter((p) => p.category === cat));

    setShowFilter(false);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div>
      {/* FILTER BUTTON */}
      <div style={{ marginBottom: "20px" }}>
        <button
          className="btn-primary"
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "15px",
          }}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </button>

        {showFilter && (
          <div
            style={{
              marginTop: "10px",
              background: "white",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
              width: "260px",
            }}
          >
            <button
              onClick={() => filterByCategory("All")}
              style={{
                display: "block",
                padding: "10px",
                width: "100%",
                background: "#eee",
                borderRadius: "8px",
                marginBottom: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => filterByCategory(cat)}
                style={{
                  display: "block",
                  padding: "10px",
                  width: "100%",
                  background: "#f8f8f8",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} addToCompare={addToCompare} />
        ))}
      </div>
    </div>
  );
}
