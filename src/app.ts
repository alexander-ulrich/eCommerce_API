import "#db";
import express from "express";

const app = express();
const port = 3000;

//Middleware
app.use(express.json());

//Routes

//Error Handling

//Start Server
app.listen(port, () =>
  console.log(
    `🐦‍🔥 \x1b[34mServer is running on http://localhost:${port}\x1b[0m 🐦‍🔥`
  )
);
