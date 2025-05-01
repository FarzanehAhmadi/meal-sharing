import MealsList from "@/components/mealslist/MealsList";

export default function MealsPage() {
  return (
    <div>
      <h1>All Meals</h1>
      <MealsList showAll={true} />
    </div>
  );
}
