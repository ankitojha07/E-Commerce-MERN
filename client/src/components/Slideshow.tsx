import React, { useState, useEffect, useRef } from "react";

const Slideshow: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      imgSrc: "./images/banner1.png",
      caption: "Caption Text",
    },
    {
      id: 2,
      imgSrc: "./images/banner2.png",
      caption: "Caption Two",
    },
    {
      id: 3,
      imgSrc: "./images/banner3.png",
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

  const handleDotClick = (index: number) => {
    setSlideIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(1); // Move to the next slide every 5 seconds
    }, 5000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [slideIndex]);

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
      className="slideshow-container mx-auto relative overflow-hidden"
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

      <button
        className="prev absolute top-1/2 left-2 transform -translate-y-1/2 text-white font-bold text-lg px-4 py-2 rounded-r hover:bg-opacity-75"
        onClick={() => handleNext(-1)}
      >
        ❮
      </button>
      <button
        className="next absolute top-1/2 right-2 transform -translate-y-1/2 text-white font-bold text-lg px-4 py-2 rounded-l hover:bg-opacity-75"
        onClick={() => handleNext(1)}
      >
        ❯
      </button>

      <div className="dots-container text-center mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index + 1)}
            className={`dot inline-block h-4 w-4 mx-1 rounded-full cursor-pointer ${
              slideIndex === index + 1 ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
