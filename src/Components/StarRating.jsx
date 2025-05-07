import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleClick = (rate) => {
    setRating(rate);
    if (onRatingChange) onRatingChange(rate); // Callback si besoin
  };

  return (
    <div className="flex text-yellow-400 text-2xl cursor-pointer">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <FaStar
            key={i}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            color={starValue <= (hovered || rating) ? "#facc15" : "#d1d5db"} // jaune ou gris clair
          />
        );
      })}
    </div>
  );
};

export default StarRating;
