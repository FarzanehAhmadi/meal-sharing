import express from 'express';
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Get all meals
mealsRouter.get("/", async (req, res) => {
  let query = knex.select("*").from("Meal");
  // maxPrice
  if (req.query.maxPrice){
    query = query.where("price", "<=" , Number(req.query.maxPrice))
  }
  //title
  if (req.query.title){
    query = query.where("title", "like", `%${req.query.title}%`)
  }
  //dateAfter
  if(req.query.dateAfter){
    query = query.where("when", ">", new Date(req.query.dateAfter))
  }
  //dateBefore
  if(req.query.dateBefore){
    query = query.where("when", "<", new Date(req.query.dateBefore));
  }
  //limit
  if(req.query.limit){
    query = query.limit(Number(req.query.limit));
  }
  try {
    const meals = await query;
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
    const { title, description, location, when, max_reservations, price, created_date } = req.body;
    if (!title || !description || !location || !when || max_reservations == null || typeof price !== "number" || price < 0) {
      return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    const [newMeal] = await knex("Meal").insert({ title, description, location, when, max_reservations, price, created_date }).returning("*");
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
  const { title, description, location, when, max_reservations, price, created_date } = req.body;
  if (!title || !description || !location || !when || max_reservations == null || price == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedMeal = await knex("Meal").where({ id }).update({ title, description, location, when, max_reservations, price, created_date });
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