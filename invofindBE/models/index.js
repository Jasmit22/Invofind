const Task = require("./task");
const Employee = require("./employee");
const Store = require("./store");
const Company = require("./company");

const EmployeeTasks = require("./employee_tasks");

// Company and Stores
Company.hasMany(Store, {
  foreignKey: "company_id",
  as: "stores",
});
Store.belongsTo(Company, {
  foreignKey: "company_id",
  as: "company",
});

// Store and Employee
Store.hasMany(Employee, {
  foreignKey: "store_location",
  as: "employees",
});
Employee.belongsTo(Store, {
  foreignKey: "store_location",
  as: "store",
});

// Employee and Task
Task.belongsTo(Employee);
Employee.hasMany(Task);

Employee.belongsToMany(Task, { through: EmployeeTasks, as: "marked_tasks" });
Task.belongsToMany(Employee, {
  through: EmployeeTasks,
  as: "employees_marked",
});

module.exports = {
  Task,
  Employee,
  EmployeeTasks,
  Store,
};
