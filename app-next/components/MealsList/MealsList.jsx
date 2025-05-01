"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Meal from "./Meal";
import "./mealStyles.css";

const MealsList = ({ showAll = false }) => {
  const [meals, setMeals] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(8);
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

  const loadMore = () => {
    setVisibleMeals((prev) => prev + 4);
  };

  const displayedMeals = showAll ? meals : meals.slice(0, visibleMeals);

  return (
    <div className="meals-list">
      <h2>Meals List</h2>
      {isLoading ? (
        <p>Loading meals...</p>
      ) : (
        <>
          <div className="meals-grid">
            {meals.slice(0, visibleMeals).map((meal) => (
              <div key={meal.id} className="meal-item">
                <Link href={`/meals/${meal.id}`}>
                  <Meal meal={meal} />
                </Link>
              </div>
            ))}
          </div>
          {!showAll && visibleMeals < meals.length && (
            <button
              onClick={loadMore}
              className="load-more-btn"
              disabled={isLoading}
            >
              Show More Meals
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MealsList;
