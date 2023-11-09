const router = require("express").Router();
const { Task, User } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
  const where = {}; // Optimizes the query, or else there is an unneccessary "WHERE"
  if (req.query.resolved) {
    where.resolved = req.query.resolved === "true";
  }
  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    };
  }
  const tasks = await Task.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(tasks);
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const task = await Task.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(task);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const taskFinder = async (req, res, next) => {
  req.task = await Task.findByPk(req.params.id);
  next();
};

router.get("/:id", taskFinder, async (req, res) => {
  if (req.task) {
    res.json(req.task);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", taskFinder, async (req, res) => {
  if (req.task) {
    await req.task.destroy();
  }
  res.status(204).end();
});

router.put("/:id", taskFinder, async (req, res) => {
  if (req.task) {
    req.task.resolved = req.body.resolved;
    await req.task.save();
    res.json(req.task);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
