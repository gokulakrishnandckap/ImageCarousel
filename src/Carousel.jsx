import React, { useState, useRef } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragShift, setDragShift] = useState(0); // Track the distance dragged
  const dragStartX = useRef(0);

  const handleDragStart = (e) => {
    dragStartX.current = e.type.includes("mouse")
      ? e.screenX
      : e.touches[0].clientX;
    setDragging(true);
  };

  const handleDragMove = (e) => {
    if (!dragging) return;
    const currentX = e.type.includes("mouse")
      ? e.screenX
      : e.touches[0].clientX;
    const shiftX = currentX - dragStartX.current;
    setDragShift(shiftX);
  };

  const handleDragEnd = () => {
    setDragging(false);
    const threshold = window.innerWidth / 4; // Adjust as needed
    if (Math.abs(dragShift) > threshold) {
      if (dragShift < 0) {
        // Next image
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        // Previous image
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
      }
    }
    setDragShift(0);
  };

  return (
    <div
      className="carousel"
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
      onMouseLeave={handleDragEnd} // Handle case when mouse leaves the component area
    >
      <div
        className="carousel-images"
        style={{ transform: `translateX(${dragShift}px)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`carousel-image  ${
              index === currentIndex ? "active" : ""
            }`}
            draggable="false"
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            // Remove individual image style for transform and transition
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
