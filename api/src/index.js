import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

//future-meals
apiRouter.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex.raw("Select * From Meal WHERE Meal.when > NOW()")
    if (futureMeals[0].length === 0) {
    return res.status(404).json("There are no meals for the future.");
    }
    res.json(futureMeals[0]);
  } catch (error) {
    console.error(error)
    res.status(500).json('Server error!')
  }
})
//past-meals
apiRouter.get("/past-meals", async (req, res) => {
  try {
    const pastMeals = await knex.raw("Select * From Meal WHERE Meal.when < NOW()") 
  if(pastMeals[0].length === 0) {
    return res.status(404).json("There are no meals in the past.")
  }
  res.json(pastMeals[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error')
  }
})
//all-meals
apiRouter.get("/all-meals" , async (req, res) =>{
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id DESC");
    if(meals[0].length === 0) {
      return res.status(404).json('There are no meals!')
    }
    res.json(meals[0]);

  } catch (error) {
    console.log(error)
    res.status(500).json('Server error')
  }
 
})
//first-meal
apiRouter.get("/first-meal", async (req, res)=>{
  try {
    const firstMeal = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if(firstMeal[0].length===0){
      return res.status(404).json("No meals found!")
    }
    res.json(firstMeal[0][0])
  } catch (error) {
    console.error(error);
    res.status(500).json('server error')
  }
  
})
//last-meal
apiRouter.get("/last-meal", async (req, res)=>{
  try {
    const lastMeal = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1")
  
    if(lastMeal[0].length === 0){
      return res.status(404).json("No meals found!")
    }
    res.json(lastMeal[0][0])
  } catch (error) {
    console.error(error);
    res.status(500).json('server error')
  }
  
})

//Server
app.listen(3000, ()=>
  console.log("I am running..."))

// // You can delete this route once you add your own routes
// apiRouter.get("/", async (req, res) => {
//   const SHOW_TABLES_QUERY =
//     process.env.DB_CLIENT === "pg"
//       ? "SELECT * FROM pg_catalog.pg_tables;"
//       : "SHOW TABLES;";
//   const tables = await knex.raw(SHOW_TABLES_QUERY);
//   res.json({ tables });
// });

// This nested router example can also be replaced with your own sub-router
// apiRouter.use("/nested", nestedRouter);

 app.use("/api", apiRouter);

// app.listen(process.env.PORT, () => {
//   console.log(`API listening on port ${process.env.PORT}`);
// });

