import React, { useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ComparePage from "./components/ComparePage";

import "./styles.css";

export default function App() {
  const productSectionRef = useRef(null);
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCompare = (product) => {
    setCompareList([product]); // always store the selected product
    localStorage.setItem("compareProduct", JSON.stringify(product)); // persistent
    navigate("/compare");
  };

  return (
    <>
      <Header
        scrollToProducts={scrollToProducts}
        goToCompare={() => navigate("/compare")}
      />

      <Routes>
        <Route
          path="/"
          element={
            <div className="page-content">
              <Hero
                scrollToProducts={scrollToProducts}
                goToCompare={() => navigate("/compare")}
              />

              <div ref={productSectionRef}>
                <h1 className="section-title">Products</h1>
                <p className="section-subtitle">
                  Explore beautifully designed products.
                </p>

                <ProductGrid
                  addToCompare={addToCompare}
                  setAllProducts={setAllProducts}
                />
              </div>
            </div>
          }
        />

        <Route
          path="/compare"
          element={
            <ComparePage
              allProducts={allProducts}
              compareList={compareList}
            />
          }
        />
      </Routes>
    </>
  );
}
