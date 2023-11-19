const router = require("express").Router();
const { Issue, Employee } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
  const where = {}; // Optimizes the query, or else there is an unneccessary "WHERE"
  if (req.query.resolved) {
    where.resolved = req.query.resolved === "true";
  }
  if (req.query.search) {
    where.description = {
      [Op.substring]: req.query.search,
    };
  }
  const issues = await Issue.findAll({
    attributes: { exclude: ["employeeId"] },
    include: {
      model: Employee,
      attributes: ["name", "id", "store_location"],
    },
    where,
  });
  res.json(issues);
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.decodedToken.id);
    const issue = await Issue.create({
      ...req.body,
      employeeId: employee.id,
      date: new Date(),
    });
    res.json(issue);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const issueFinder = async (req, res, next) => {
  req.issue = await Issue.findByPk(req.params.id);
  next();
};

router.get("/:id", issueFinder, async (req, res) => {
  if (req.issue) {
    res.json(req.issue);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", issueFinder, async (req, res) => {
  if (req.issue) {
    await req.issue.destroy();
  }
  res.status(204).end();
});

router.put("/:id", issueFinder, async (req, res) => {
  if (req.issue) {
    req.issue.resolved = req.body.resolved;
    await req.issue.save();
    res.json(req.issue);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
