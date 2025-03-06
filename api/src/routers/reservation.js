import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

// Get all reservations
reservationsRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex.select("*").from("Reservations");
    if (reservations.length === 0) {
      return res.status(404).json({ error: "There are no reservations!" });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new reservation
reservationsRouter.post("/", async (req, res) => {
  try {
    const { meal_id, customer_name, reservation_time, num_guests } = req.body;
    if (!meal_id || !customer_name || !reservation_time || !num_guests) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newReservation] = await knex("Reservations")
      .insert({ meal_id, customer_name, reservation_time, num_guests })
      .returning("*");
    res.status(201).json({ message: "New reservation added", reservation: newReservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Get a reservation by id
reservationsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await knex("Reservations").where({ id }).first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a reservation by id
reservationsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { meal_id, customer_name, reservation_time, num_guests } = req.body;
  if (!meal_id || !customer_name || !reservation_time || !num_guests) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedReservation = await knex("Reservations")
      .where({ id })
      .update({ meal_id, customer_name, reservation_time, num_guests });
    if (updatedReservation === 0) return res.status(404).json({ error: "Reservation not found" });
    res.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a reservation by id
reservationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await knex("Reservations").where({ id }).del();
    if (deletedReservation === 0) return res.status(404).json({ error: "Reservation not found" });
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default reservationsRouter;
