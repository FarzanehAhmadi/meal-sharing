import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
// I coneverted the meal table to array for now
// because we haven't covered how to connect to a database with Node.js yet.
const meals = [
  {id:1 , title:'Sushi', when :'2025-05-10 19:00:00' },
  {id:2 , title:'Burger', when :'2025-02-15 18:30:00' },
  {id:3 , title:'Steak', when :'2025-06-05 20:00:00' }
]
//future-meals
apiRouter.get("/future-meals", async (req, res) => {
  const futureMeals = meals.filter( meal => new Date (meal.when) > new Date ())
  res.send(futureMeals);
})
//past-meals
apiRouter.get("/past-meals", async (req, res) => {
  const pastMeals = meals.filter( meal => new Date (meal.when) < new Date ())
  res.send(pastMeals);
})
//all-meals
apiRouter.get("/all-meals" , async (req, res) =>{
  const allMeals = meals.sort((a , b) => a.id - b.id);
  res.send(allMeals);
})
//first-meal
apiRouter.get("/first-meal", async (req, res)=>{
  const ids = meals.map((meal => meal.id));
  const minId = Math.min(...ids);
  const firstMeal = meals.find((meal)=> meal.id === minId)
  res.send(firstMeal)
})
//last-meal
apiRouter.get("/last-meal", async (req, res)=>{
  const ids = meals.map((meal => meal.id));
  const maxId = Math.max(...ids);
  const lastMeal = meals.find((meal)=> meal.id === maxId)
  res.send(lastMeal)
})

//Setup server
app.listen(3000, ()=>
  console.log("I am running..."))
/*
// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);



app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
*/
app.use("/api", apiRouter);