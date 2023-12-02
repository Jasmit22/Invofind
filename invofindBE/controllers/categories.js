const router = require("express").Router();

const Item = require("../models/item");
const Category = require("../models/category");

router.post("/", async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      date: new Date(),
    });
    res.json(category);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    include: [
      {
        model: Item,
        // DON'T EXCLUDE ANYTHING
      },
    ],
  });
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Item,
        // DON'T EXCLUDE ANYTHING
      },
    ],
  });

  if (!category) {
    return res.status(404).end();
  }
  res.json({ ...category.toJSON() });
});

module.exports = router;
