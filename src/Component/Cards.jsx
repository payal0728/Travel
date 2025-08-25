import React, { useState } from "react";
import tourData from "../data.js";

const Cards = () => {
  const [tours, setTours] = useState(tourData);

  // Delete function
  const handleDelete = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  };

  // Refresh (Restore all tours)
  const handleRefresh = () => {
    setTours(tourData);
  };

  return (
    <div className="tour-container text-center">
      {tours.length === 0 ? (
        <div>
          <h2 className="text-danger mb-3">No Tours Left</h2>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      ) : (
        tours.map((item) => (
          <TourCard key={item.id} item={item} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

// Single Tour Card
const TourCard = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const shortInfo =
    item.info.length > 120 ? item.info.substring(0, 120) + "..." : item.info;

  return (
    <div className="tour-card">
      <img src={item.image} alt={item.name} className="tour-image" />
      <div className="tour-content">
        <h2 className="tour-title">{item.name}</h2>

        <p className="tour-info">
          {expanded ? item.info : shortInfo}{" "}
          {item.info.length > 120 && (
            <span
              className="read-more"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </span>
          )}
        </p>

        <div className="tour-footer">
          <h3 className="tour-price">₹ {item.price}</h3>
          <button
            className="tour-btn"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
