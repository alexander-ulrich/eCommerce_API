import "#db";
import { errorHandler } from "#middlewares";
import {
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
} from "#routers";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { openapiSpec } from "#docs";

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
//Middleware
app.use(express.json());
app.use(cors(corsOptions));
//Routes
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

// Documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpec));

//Error Handling
app.use(errorHandler);
//Start Server
app.listen(port, () =>
  console.log(
    `🐦‍🔥 \x1b[34mServer is running on http://localhost:${port}\x1b[0m 🐦‍🔥`
  )
);
