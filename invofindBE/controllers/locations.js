const router = require("express").Router();

const Location = require("../models/location");
const Item = require("../models/item");

router.post("/", async (req, res) => {
  try {
    const location = await Location.create({
      ...req.body,
      date: new Date(),
    });
    res.json(location);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const locations = await Location.findAll({
    include: [
      {
        model: Item,
      },
    ],
  });
  res.json(locations);
});

const locationFinder = async (req, res, next) => {
  req.location = await Location.findByPk(req.params.id);
  next();
};

router.delete("/:id", locationFinder, async (req, res) => {
  if (req.location) {
    await req.location.destroy();
  }
  res.status(204).end();
});

module.exports = router;
