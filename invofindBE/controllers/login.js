const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const Employee = require("../models/employee");

router.post("/", async (request, response) => {
  const body = request.body;

  const employee = await Employee.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect =
    employee === null
      ? false
      : await bcrypt.compare(body.password, employee.passwordHash);

  if (!(employee && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (employee.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const userForToken = {
    username: employee.username,
    id: employee.id,
  };

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({
    token,
    username: employee.username,
    name: employee.name,
    admin: employee.admin,
    storeLocation: employee.storeLocation,
  });
});

module.exports = router;
