const router = require("express").Router();

const Company = require("../models/company");

router.post("/", async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      date: new Date(),
    });
    res.json(company);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const companies = await Company.findAll({
    // THIS IS SAMPLE CODE, NEEDS TO BE ADJUSTED FOR COMPANIES.
    // attributes: { exclude: ["userId"] },
    // include: {
    //   model: Employee,
    //   attributes: ["username", "id"],
    // },
  });
  res.json(companies);
});

module.exports = router;
