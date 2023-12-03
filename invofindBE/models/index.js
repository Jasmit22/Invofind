const Task = require("./task");
const Employee = require("./employee");
const Store = require("./store");
const Company = require("./company");
const Issue = require("./issue");
const Department = require("./department");
const Item = require("./item");
const Category = require("./category");
const Location = require("./location");

// Company and Stores
Store.belongsTo(Company);
Company.hasMany(Store);

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
Task.belongsTo(Item);
Item.hasMany(Task);

// Location and Store
Location.belongsTo(Store);
Store.hasMany(Location);

// Item and Location
Item.belongsTo(Location);
Location.hasMany(Item);

module.exports = {
  Task,
  Employee,
  Store,
  Issue,
};
