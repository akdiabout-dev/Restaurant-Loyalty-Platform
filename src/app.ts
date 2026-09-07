import express from "express";
import authRouter from "./models/core/users/auth/auth.routes.js";
import userRoute from "./models/core/users/user.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRoute);

app.use("media/users", express.static("uploads/users"));
app.use("media/products", express.static("uploads/products"));
app.use("media/restaurants", express.static("uploads/restaurants"));

app.use(errorMiddleware);

app.listen(5000, () => {
  console.log("app is running !");
});
