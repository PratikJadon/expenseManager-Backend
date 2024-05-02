require("express-async-errors");
require("dotenv").config({ path: "config.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./database/connect");
const { errorHandler } = require("./middleware/errorHandler");

// variable Initialize
const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes import
const costRoute = require("./routes/costRoutes");

// Routes
app.use("/api/v1/", costRoute);

// Error Handler
app.use(errorHandler);

// func to connect to database and start server
const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

// Server start
start();

// Unhandled Error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting Down Server due to error.");
  server.close(() => {
    process.exit(1);
  });
});
