const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const resOwnerRoutes = require("./routes/resOwnerRoutes");
const restaurantRoute = require("./routes/restaurantRouter")
dotenv.config()
connectDB()
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("hello world");
});
//Restuarent owner API
app.use("/api/res-owner", resOwnerRoutes);
//Restuarent API
app.use("/api/res",restaurantRoute)
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode  on port ${PORT}`
  )
);