"use client";
import { useEffect, useState } from "react";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("http://localhost:3001/api/meals");
      const data = await response.json();
      setMeals(data);
    };

    fetchMeals();
  }, []);

  const mealsListStyle = {
    margin: "20px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const mealItemStyle = {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const mealTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  };

  const mealDescriptionStyle = {
    fontSize: "1rem",
    color: "#666",
  };

  const mealPriceStyle = {
    fontSize: "1.2rem",
    color: "#2a9d8f",
    fontWeight: "bold",
    marginTop: "5px",
  };

  return (
    <div style={mealsListStyle}>
      <h2>Meals List</h2>
      {meals.map((meal) => (
        <div style={mealItemStyle} key={meal.id}>
          <h3 style={mealTitleStyle}>{meal.title}</h3>
          <p style={mealDescriptionStyle}>{meal.description}</p>
          <p style={mealPriceStyle}>Price: ${meal.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MealsList;
