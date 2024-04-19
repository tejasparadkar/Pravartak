require("dotenv").config({ path: "./configs/config.env" });
const path = require("path");
const express = require("express");
const cors = require("cors")

const connectDB = require("./configs/db");
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 7000;
const app = express();

app.use(express.json());
app.use(cors());

// routes
const auth = require("./routes/auth.router");
const cargo = require("./routes/cargo.router");

// mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/cargo", cargo);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT} port...`);
  connectDB();
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Err: ${err.message}`);
  server.close(() => process.exit(1));
});
