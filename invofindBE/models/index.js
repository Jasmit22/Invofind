const Task = require("./task");
const User = require("./user");
const Team = require("./team");
const Membership = require("./membership");

const UserTasks = require("./user_tasks");

Task.belongsTo(User);
User.hasMany(Task);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Task, { through: UserTasks, as: "marked_tasks" });
Task.belongsToMany(User, { through: UserTasks, as: "users_marked" });

module.exports = {
  Task,
  User,
  Team,
  Membership,
  UserTasks,
};
