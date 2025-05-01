import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const reviewsRouter = express.Router();

// ✅ GET all reviews or filter by meal_id
reviewsRouter.get("/", async (req, res) => {
  const { meal_id } = req.query;

  try {
    let query = knex("Review").select("*");

    // Filter if meal_id is provided
    if (meal_id) {
      query = query.where("meal_id", parseInt(meal_id));
    }

    const reviews = await query;
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ POST a new review
reviewsRouter.post("/", async (req, res) => {
  try {
    const { stars, meal_id, created_date, title, description } = req.body;

    if (!stars || !meal_id || title == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [reviewId] = await knex("Review")
      .insert({
        stars,
        meal_id,
        created_date,
        title,
        description,
      })
      .returning("id");

    res.status(201).json({ message: "New review added", reviewId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ GET a review by ID
reviewsRouter.get("/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await knex("Review")
      .select("*")
      .where("id", reviewId)
      .first();

    if (!review) {
      return res
        .status(404)
        .json({ error: `Review not found with id: ${reviewId}` });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ PUT update a review by ID
reviewsRouter.put("/:id", async (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;
  try {
    const updated = await knex("Review")
      .where("id", reviewId)
      .update(updatedReview);

    if (updated === 0) {
      return res
        .status(404)
        .json({ error: `Review not found with id: ${reviewId}` });
    }

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE a review by ID
reviewsRouter.delete("/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const deleted = await knex("Review").where("id", reviewId).del();

    if (deleted === 0) {
      return res
        .status(404)
        .json({ error: `Review not found with id: ${reviewId}` });
    }

    res
      .status(200)
      .json({ message: `Review id ${reviewId} deleted successfully` });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default reviewsRouter;
