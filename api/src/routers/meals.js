import express from 'express';
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Get all meals
mealsRouter.get("/", async (req, res) => {
  try {
    const meals = await knex.select("*").from("Meal");
    if (meals.length === 0) {
      return res.status(404).json({ error: 'There are no meals!' });
    }
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new meal to the database
mealsRouter.post("/", async (req, res) => {
  try {
    const { title, description, location, meal_time, max_reservations, price, created_date } = req.body;
    if (!title || !description || !location || !meal_time || max_reservations == null || typeof price !== "number" || price < 0) {
      return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    const [newMeal] = await knex("Meal").insert({ title, description, location, meal_time, max_reservations, price, created_date }).returning("*");
    res.status(201).json({ message: "New meal added", meal: newMeal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Get a meal by id
mealsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await knex("Meal").where({ id }).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a meal by id
mealsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, location, meal_time, max_reservations, price, created_date } = req.body;
  if (!title || !description || !location || !meal_time || !max_reservations || price == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedMeal = await knex("Meal").where({ id }).update({ title, description, location, meal_time, max_reservations, price, created_date });
    if (updatedMeal === 0) return res.status(404).json({ error: "Meal not found" });
    res.status(200).json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a meal by id
mealsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMeal = await knex("Meal").where({ id }).del();
    if (deletedMeal === 0) return res.status(404).json({ error: "Meal not found" });
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default mealsRouter;
