import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3002;

// middleware

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hi");
});

// router file
import routes from "./routes/index.js";
app.use(routes);

app.listen(PORT, () => console.log(`our server is running on PORT ${PORT}`));
