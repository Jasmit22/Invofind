const router = require("express").Router();

const Department = require("../models/department");

router.post("/", async (req, res) => {
  try {
    const department = await Department.create({
      ...req.body,
      date: new Date(),
    });
    res.json(department);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const departments = await Department.findAll({});
  res.json(departments);
});

module.exports = router;
