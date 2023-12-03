const router = require("express").Router();

const Department = require("../models/department");
const Category = require("../models/category");
const Item = require("../models/item");
const Location = require("../models/location");

router.post("/", async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
    });
    res.json(item);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const items = await Item.findAll({
    attributes: { exclude: ["departmentId", "categoryId"] },
    include: [
      {
        model: Department,
      },
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: Location,
        // attributes: ["name"],
      },
    ],
  });
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findByPk(req.params.id, {
    attributes: { exclude: ["departmentId", "categoryId"] },
    include: [
      {
        model: Department,
      },
      {
        model: Category,
      },
    ],
  });

  if (!item) {
    return res.status(404).end();
  }
  res.json({ ...item.toJSON() });
});

const itemFinder = async (req, res, next) => {
  req.item = await Item.findByPk(req.params.id);
  next();
};

router.put("/:id", itemFinder, async (req, res) => {
  if (req.item) {
    req.item.name = req.body.name || req.item.name;
    req.item.price = req.body.price || req.item.price;
    req.item.quantity = req.body.quantity || req.item.quantity;

    try {
      await req.item.save();
      res.json(req.item);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", itemFinder, async (req, res) => {
  if (req.item) {
    await req.item.destroy();
  }
  res.status(204).end();
});

module.exports = router;
