const Task = require("./task");
const Employee = require("./employee");
const Store = require("./store");
const Company = require("./company");
const Issue = require("./issue");
const Department = require("./department");
const Item = require("./item");
const Category = require("./category");

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
Employee.belongsTo(Store);
Store.hasMany(Employee);

// Employee and Task
Task.belongsTo(Employee);
Employee.hasMany(Task);

// Issue and Employee
Issue.belongsTo(Employee);
Employee.hasMany(Issue);

// Store and Department
Department.belongsTo(Store);
Store.hasMany(Department);

// Item and Department
Item.belongsTo(Department);
Department.hasMany(Item);

// Item and Category
Item.belongsTo(Category);
Category.hasMany(Item);

// Store and Category
Category.belongsTo(Store);
Store.hasMany(Category);

// Task and Item
Task.belongsTo(Item, {
  foreignKey: "itemId",
  as: "item",
});
Item.hasMany(Task, {
  foreignKey: "itemId",
  as: "tasks",
});

module.exports = {
  Task,
  Employee,
  Store,
  Issue,
};
