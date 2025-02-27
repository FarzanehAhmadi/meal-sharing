import knex from "knex";
import "dotenv/config";


const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Ff141516",
    database: process.env.DB_NAME || "MealSharing",
  },
  pool: { min: 2, max: 10 } 
});


db.raw("SELECT 1")
  .then(() => console.log("Connected to MySQL database successfully!"))
  .catch((err) => {
    console.error("Failed to connect to MySQL:", err);
    process.exit(1);
  });

export default db;

// import knex from "knex";

// const connection = knex({
//   client: process.env.DB_CLIENT,
//   connection: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE_NAME,
//     ssl:
//       process.env.DB_USE_SSL === "true" ? { rejectUnauthorized: false } : false,
//   },
// });

// export default connection;
