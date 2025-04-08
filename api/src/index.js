import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
//import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationRouter from "./routers/reservation.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);
apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationRouter);
apiRouter.use("/reviews", reviewsRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
