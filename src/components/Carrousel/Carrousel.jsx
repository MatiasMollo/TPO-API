import React, { useState } from "react";
import "./carrousel.css";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 3; // cantidad de cards visibles
  const maxIndex = items.length - visibleCards; // último índice desplazable

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="carousel-container">
        <div
          className="carousel-content"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="carousel-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
