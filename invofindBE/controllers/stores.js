const router = require("express").Router();

const Store = require("../models/store");

router.post("/", async (req, res) => {
  try {
    const store = await Store.create({
      ...req.body,
      date: new Date(),
    });
    res.json(store);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const stores = await Store.findAll({
    // THIS IS SAMPLE CODE, NEEDS TO BE ADJUSTED FOR STORES.
    // attributes: { exclude: ["employeeId"] },
    // include: {
    //   model: Employee,
    //   attributes: ["name", "id"],
    // },
  });
  res.json(stores);
});

module.exports = router;
