const bcrypt = require("bcrypt");
const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");
const { User, Task, Store } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Task,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Store,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const { username, name, password, admin } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, name, passwordHash, admin });
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Task,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Task,
        as: "marked_tasks",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: [],
        },
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).end();
  }

  let stores = undefined;
  if (req.query.stores) {
    stores = await user.getStores({
      attributes: ["name"],
      joinTableAttributes: [],
    });
  }
  res.json({ ...user.toJSON(), stores });
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
