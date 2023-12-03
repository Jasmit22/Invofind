const router = require("express").Router();

const Department = require("../models/department");
const Store = require("../models/store");
const Category = require("../models/category");
const Location = require("../models/location");

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
    include: [
      {
        model: Department,
        // DON'T EXCLUDE ANYTHING
      },
      {
        model: Category,
        // DON'T EXCLUDE ANYTHING
      },
      {
        model: Location,
        // DON'T EXCLUDE ANYTHING
      },
    ],
  });
  res.json(stores);
});

router.get("/:id", async (req, res) => {
  const store = await Store.findByPk(req.params.id, {
    include: [
      {
        model: Department,
        // DON'T EXCLUDE ANYTHING
      },
      {
        model: Category,
        // DON'T EXCLUDE ANYTHING
      },
      {
        model: Location,
        // DON'T EXCLUDE ANYTHING
      },
    ],
  });

  if (!store) {
    return res.status(404).end();
  }
  res.json({ ...store.toJSON() });
});

module.exports = router;
