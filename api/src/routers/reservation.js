import express from "express";
import knex from "../database_client.js";

const reservationRouter = express.Router();

// Get all reservations
reservationRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex.select("*").from("Reservation");
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
reservationRouter.post("/", async (req, res) => {
  try {
    const { meal, number_of_guests, created_date, contact_phonenumber, contact_name, contact_email } = req.body;

    if (!meal || !number_of_guests || !created_date || !contact_phonenumber || !contact_name || !contact_email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newReservation] = await knex("Reservation")
      .insert({ meal, number_of_guests, created_date, contact_phonenumber, contact_name, contact_email })
      .returning("*");

    res.status(201).json({ message: "New reservation added", reservation: newReservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Get a reservation by id
reservationRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await knex("Reservation").where({ id }).first();
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
reservationRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { meal, number_of_guests, created_date, contact_phonenumber, contact_name, contact_email } = req.body;

  if (!meal || !number_of_guests || !created_date || !contact_phonenumber || !contact_name || !contact_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedReservation = await knex("Reservation")
      .where({ id })
      .update({ meal, number_of_guests, created_date, contact_phonenumber, contact_name, contact_email });

    if (updatedReservation === 0) return res.status(404).json({ error: "Reservation not found" });

    res.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a reservation by id
reservationRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await knex("Reservation").where({ id }).del();
    if (deletedReservation === 0) return res.status(404).json({ error: "Reservation not found" });

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default reservationRouter;
