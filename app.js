require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user");
const apiRoutes = require("./routes/api");
const { notFound, errorHandler } = require("./middleware/error");

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/services", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
