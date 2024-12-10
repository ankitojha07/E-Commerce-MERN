import React, { useState, useEffect, useRef } from "react";

const Slideshow: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      imgSrc: "./images/banner4.png",
      caption: "Caption Text",
    },
    {
      id: 2,
      imgSrc: "./images/banner2.jpg",
      caption: "Caption Two",
    },
    {
      id: 3,
      imgSrc: "./images/banner3.jpg",
      caption: "Caption Three",
    },
  ];

  const handleNext = (n: number) => {
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex > slides.length) newIndex = 1;
      if (newIndex < 1) newIndex = slides.length;
      return newIndex;
    });
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(1); // Move to the next slide every 5 seconds
    }, 5000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  });

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;

    const dragDistance = e.clientX - dragStartX;

    if (dragDistance > 50) {
      handleNext(-1); // Slide to the previous slide
      setIsDragging(false);
    } else if (dragDistance < -50) {
      handleNext(1); // Slide to the next slide
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStartX(null);
  };

  return (
    <div
      className="slideshow-container relative overflow-hidden rounded-xl max-h-96"
      ref={slideRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensures drag ends if the cursor leaves the container
    >
      <div
        className="slides flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(slideIndex - 1) * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="slide w-full flex-shrink-0"
            style={{ width: "100%" }}
          >
            <img
              src={slide.imgSrc}
              alt={slide.caption}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
