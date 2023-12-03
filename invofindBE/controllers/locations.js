const router = require("express").Router();

const Location = require("../models/location");

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
  const locations = await Location.findAll({});
  res.json(locations);
});

module.exports = router;
