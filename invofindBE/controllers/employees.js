const bcrypt = require("bcrypt");
const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");
const { Employee, Task, Store } = require("../models");

router.get("/", async (req, res) => {
  const employees = await Employee.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: [
      {
        model: Task,
        attributes: { exclude: ["employeeId"] },
      },
    ],
  });
  res.json(employees);
});

router.post("/", async (req, res) => {
  try {
    const { username, name, password, admin, store_location } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const employee = await Employee.create({
      username,
      name,
      passwordHash,
      admin,
      store_location,
    });
    res.json(employee);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Task,
        attributes: { exclude: ["employeeId"] },
      },
      {
        model: Task,
        as: "marked_tasks",
        attributes: { exclude: ["employeeId"] },
        through: {
          attributes: [],
        },
        include: {
          model: Employee,
          attributes: ["name"],
        },
      },
    ],
  });

  if (!employee) {
    return res.status(404).end();
  }

  let stores = undefined;
  if (req.query.stores) {
    stores = await employee.getStores({
      attributes: ["location"],
      joinTableAttributes: [],
    });
  }
  res.json({ ...employee.toJSON(), stores });
});

const isAdmin = async (req, res, next) => {
  const employee = await Employee.findByPk(req.decodedToken.id);
  if (!employee.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const employee = await Employee.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (employee) {
    employee.disabled = req.body.disabled;
    await employee.save();
    res.json(employee);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
