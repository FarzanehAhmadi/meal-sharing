import React from "react";

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <h3 className="meal-title">{meal.title}</h3>
      <p className="meal-description">{meal.description}</p>
      <p className="meal-price">Price: ${meal.price}</p>
    </div>
  );
};

export default Meal;
