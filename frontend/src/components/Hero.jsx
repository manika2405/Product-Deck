import React, { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero({ scrollToProducts, goToCompare }) {
    const [heroImages, setHeroImages] = useState([]);
    const [index, setIndex] = useState(0);

    // Fetch 5 images from each category
    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=100")
            .then((res) => res.json())
            .then((data) => {
                const products = data.products;

                // Group by category
                const categoryMap = {};
                products.forEach((p) => {
                    if (!categoryMap[p.category]) categoryMap[p.category] = [];
                    if (categoryMap[p.category].length < 5) {
                        categoryMap[p.category].push(p.thumbnail);
                    }
                });

                // Convert to one big image list
                const allImages = Object.values(categoryMap).flat();
                setHeroImages(allImages);
            });
    }, []);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (heroImages.length === 0) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [heroImages]);

    return (
        <section className="hero-wrapper">
            <div className="hero-box">

                {/* LEFT SIDE TEXT */}
                <div className="hero-left">
                    <h2 className="hero-title">Discover your next product</h2>
                    <p className="hero-description">
                        Explore beautifully designed products with a simple and smooth experience.
                    </p>

                    <div className="hero-buttons">
                        <button className="hero-btn primary" onClick={scrollToProducts}>
                            Explore Products
                        </button>
                        <button className="hero-btn secondary" onClick={goToCompare}>
                            Compare
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE HERO SLIDESHOW */}
                <div className="hero-right">
                    <div className="hero-img-wrapper">
                        {heroImages.length > 0 && (
                            <img
                                key={index}
                                src={heroImages[index]}
                                alt="hero"
                                className="hero-img"
                            />
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
