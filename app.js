import express from "express";
import "dotenv/config";
import UserRouter from "./routes/UserRouter.js";

const app = express();

app.use(express.json());

app.use("/users", UserRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
