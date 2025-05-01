"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Meal from "./Meal";
import "./mealStyles.css";

const MealsList = ({ showAll = false }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/meals");
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const displayedMeals = showAll ? meals : meals.slice(0, 8); // Adjust visible meals for homepage

  return (
    <div className="meals-list">
      {isLoading ? (
        <p>Loading meals...</p>
      ) : (
        <>
          <div className="meals-grid">
            {displayedMeals.map((meal) => (
              <div key={meal.id} className="meal-item">
                <Link href={`/meals/${meal.id}`}>
                  <Meal meal={meal} />
                </Link>
              </div>
            ))}
          </div>

          {!showAll && (
            <div className="view-all-btn-container">
              <Link href="/meals">
                <button className="view-all-btn">Explore All Meals</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MealsList;
