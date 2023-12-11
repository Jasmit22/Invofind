const bcrypt = require("bcrypt");
const Company = require("./models/company");
const Store = require("./models/store");
const Employee = require("./models/employee");
const Department = require("./models/department");
const db = require("./util/db");
const Category = require("./models/category");
const Location = require("./models/location");
const Item = require("./models/item");
const Task = require("./models/task");
const Issue = require("./models/issue");

async function seedDatabase() {
  try {
    // Connect to the database
    await db.connectToDatabase();

    const company1 = await Company.create({
      name: "Amazon",
    });

    const store1 = await Store.create({
      location: 1,
      companyName: "Amazon",
    });

    const company2 = await Company.create({
      name: "Ebay",
    });

    const store2 = await Store.create({
      location: 2,
      companyName: "Ebay",
    });

    const saltRounds = 10;
    const password = "abc123";
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const adminData1 = {
      username: "admin@admin.com",
      firstName: "Jasmit",
      lastName: "S",
      passwordHash: passwordHash,
      admin: true,
      storeLocation: 1,
    };

    const adminData2 = {
      username: "admin2@admin.com",
      firstName: "Admin",
      lastName: "Admin",
      passwordHash: passwordHash,
      admin: true,
      storeLocation: 2,
    };

    const userFor2 = {
      username: "user2@user.com",
      firstName: "User",
      lastName: "User",
      passwordHash: passwordHash,
      admin: false,
      storeLocation: 2,
    };

    const admin1 = await Employee.create(adminData1);

    const admin2 = await Employee.create(adminData2);

    const department = await Department.create({
      deptName: "Produce",
      storeLocation: 1,
    });
    const department2 = await Department.create({
      deptName: "Dairy",
      storeLocation: 1,
    });
    const department3 = await Department.create({
      deptName: "Other",
      storeLocation: 1,
    });

    const department4 = await Department.create({
      deptName: "Clothing",
      storeLocation: 2,
    });
    const department5 = await Department.create({
      deptName: "Furtniture",
      storeLocation: 2,
    });
    const department6 = await Department.create({
      deptName: "Toys",
      storeLocation: 2,
    });

    const category = await Category.create({
      name: "Basic",
      storeLocation: 1,
    });
    const category2 = await Category.create({
      name: "Premium",
      storeLocation: 1,
    });
    const category3 = await Category.create({
      name: "Lite",
      storeLocation: 1,
    });

    const category4 = await Category.create({
      name: "Standard",
      storeLocation: 2,
    });
    const category5 = await Category.create({
      name: "High Quality",
      storeLocation: 2,
    });
    const category6 = await Category.create({
      name: "Low Quality",
      storeLocation: 2,
    });

    const location = await Location.create({
      type: "Shelf",
      storeLocation: 1,
      date: new Date(),
    });
    const location2 = await Location.create({
      type: "Other",
      storeLocation: 1,
      date: new Date(),
    });

    const location3 = await Location.create({
      type: "Table",
      storeLocation: 2,
      date: new Date(),
    });
    const location4 = await Location.create({
      type: "Other",
      storeLocation: 2,
      date: new Date(),
    });

    const item1 = await Item.create({
      name: "Apple",
      price: "1.00",
      quantity: 100,
      departmentId: 1,
      categoryId: 1,
      locationId: 1,
    });

    const task1 = await Task.create({
      content: "Please clean the store before closing.",
      storeLocation: 1,
      resolved: false,
      employeeId: 1,
    });
    const task2 = await Task.create({
      content: "Please restock the apples.",
      storeLocation: 2,
      resolved: false,
      employeeId: 2,
    });

    const issue1 = await Issue.create({
      description: "Need to order more oranges.",
      resolved: false,
      employeeId: 1,
    });
    const issue2 = await Issue.create({
      description: "Need to order more pears.",
      resolved: true,
      employeeId: 2,
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedDatabase();
