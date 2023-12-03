const bcrypt = require("bcrypt");
const Company = require("./models/company");
const Store = require("./models/store");
const Employee = require("./models/employee");
const Department = require("./models/department");
const db = require("./util/db");
const Category = require("./models/category");
const Location = require("./models/location");

async function seedDatabase() {
  try {
    // Connect to the database
    await db.connectToDatabase();

    const company = await Company.create({
      name: "Amazon",
    });

    const store = await Store.create({
      location: 1,
      companyName: "Amazon",
    });

    const saltRounds = 10;
    const password = "abc123";
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const adminData = {
      username: "admin@admin.com",
      name: "Jasmit",
      passwordHash: passwordHash,
      admin: true,
      storeLocation: 1,
    };

    const admin = await Employee.create(adminData);

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

    const location = await Location.create({
      type: "shelf",
      storeLocation: 1,
      date: new Date(),
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedDatabase();