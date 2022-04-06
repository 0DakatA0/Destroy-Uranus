const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// plugins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", require("./routes/userRoutes"));

// middleware
app.use(errorHandler);

app.listen(port, () => console.log(`${port}`));
