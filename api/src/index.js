import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservation.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.use("/nested", nestedRouter);

apiRouter.use("/meals", mealsRouter);

apiRouter.use("/reservations", reservationsRouter);

apiRouter.use("/reviews", reviewsRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
