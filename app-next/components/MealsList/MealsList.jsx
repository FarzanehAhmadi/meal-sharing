"use client";
import { useEffect, useState } from "react";
import Meal from "./Meal";
import "./mealStyles.css";

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

  return (
    <div className="meals-list">
      <h2>Meals List</h2>
      {meals.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </div>
  );
};

export default MealsList;
