const Task = require("./task");
const User = require("./user");
const Store = require("./store");
const Membership = require("./membership");

const UserTasks = require("./user_tasks");

Task.belongsTo(User);
User.hasMany(Task);

User.belongsToMany(Store, { through: Membership });
Store.belongsToMany(User, { through: Membership });

User.belongsToMany(Task, { through: UserTasks, as: "marked_tasks" });
Task.belongsToMany(User, { through: UserTasks, as: "users_marked" });

module.exports = {
  Task,
  User,
  Store,
  Membership,
  UserTasks,
};
