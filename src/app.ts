import "#db";
import {
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
} from "#routers";
import express from "express";

const app = express();
const port = 3000;

//Middleware
app.use(express.json());

//Routes
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

//Error Handling

//Start Server
app.listen(port, () =>
  console.log(
    `🐦‍🔥 \x1b[34mServer is running on http://localhost:${port}\x1b[0m 🐦‍🔥`
  )
);
