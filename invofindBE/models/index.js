const Task = require("./task");
const Employee = require("./employee");
const Store = require("./store");
const Company = require("./company");
const Issue = require("./issue");
const Department = require("./department");

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

Issue.belongsTo(Employee);
Employee.hasMany(Issue);

// Store and Department
Department.belongsTo(Store);
Store.hasMany(Department);

module.exports = {
  Task,
  Employee,
  Store,
  Issue,
};
