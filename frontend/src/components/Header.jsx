import React from "react";
import "./Header.css";

export default function Header({ scrollToProducts, goToCompare }) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Branding */}
        <div className="header-left">
          <h1 className="brand-title">Product Deck</h1>
          <p className="brand-subtitle">Discover. Compare. Choose better.</p>
        </div>
      </div>
    </header>
  );
}
