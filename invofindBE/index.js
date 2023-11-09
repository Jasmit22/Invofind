const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const middleware = require("./util/middleware");
const tasksRouter = require("./controllers/tasks");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(express.static("dist"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
