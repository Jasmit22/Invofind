const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const middleware = require("./util/middleware");
const tasksRouter = require("./controllers/tasks");
const employeesRouter = require("./controllers/employees");
const loginRouter = require("./controllers/login");
const storesRouter = require("./controllers/stores");
const companiesRouter = require("./controllers/companies");
const issuesRouter = require("./controllers/issues");
const itemsRouter = require("./controllers/items");
const departmentsRouter = require("./controllers/departments");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/tasks", tasksRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/login", loginRouter);
app.use("/api/stores", storesRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/issues", issuesRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/items", itemsRouter);

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
