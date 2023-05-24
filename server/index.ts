import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/auth";
import binRouter from "./src/routes/bin";
import cors from "cors";
import "dotenv/config";
import User from "./src/models/User";

const app = express();

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 3131;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routers
app.use("/auth", authRouter);
app.use("/bin", binRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  mongoose.connect(process.env.DB_CONNECTION_STRING as string).then(() => {
    console.log("database connection established");
  });
});
