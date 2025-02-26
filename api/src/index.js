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
    const meals = await knex.raw("Select * From Meal")
    const futureMeals = meals[0].filter( meal => new Date (meal.when) > new Date ())
    if (futureMeals.length === 0) {
    return res.status(404).send("There are no meals for the future.");
    }
    res.json(futureMeals);
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error!')
  }
})
//past-meals
apiRouter.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw("Select * From Meal") 
    const pastMeals = meals[0].filter( meal => new Date (meal.when) < new Date ())
  if(pastMeals.length === 0) {
    return res.status(404).send("There are no meals in the past.")
  }
  res.json(pastMeals);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error')
  }
})
//all-meals
apiRouter.get("/all-meals" , async (req, res) =>{
  try {
    const meals = await knex.raw("SELECT * FROM Meal");
    const allMeals = meals[0].sort((a , b) => a.id - b.id);
    if(allMeals.length === 0) {
      return res.status(404).send('There are no meals!')
    }
    res.json(allMeals);

  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
 
})
//first-meal
apiRouter.get("/first-meal", async (req, res)=>{
  try {
    const meals = await knex.raw("SELECT * FROM Meal")
    const ids = meals[0].map((meal => meal.id));
    const minId = Math.min(...ids);
    const firstMeal = meals[0].find((meal)=> meal.id === minId)

    if(!firstMeal){
      return res.status(404).send("No meals found!")
    }
    res.json(firstMeal)
  } catch (error) {
    console.error(error);
    res.status(500).send('server error')
  }
  
})
//last-meal
apiRouter.get("/last-meal", async (req, res)=>{
  try {
    const meals = await knex.raw("SELECT * FROM Meal")
    const ids = meals[0].map((meal => meal.id));
    const maxId = Math.max(...ids);
    const lastMeal = meals[0].find((meal)=> meal.id === maxId)

    if(!lastMeal){
      return res.status(404).send("No meals found!")
    }
    res.json(lastMeal)
  } catch (error) {
    console.error(error);
    res.status(500).send('server error')
  }
  
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