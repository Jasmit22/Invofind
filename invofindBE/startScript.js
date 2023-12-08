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
      name: "Jasmit",
      passwordHash: passwordHash,
      admin: true,
      storeLocation: 1,
    };

    const adminData2 = {
      username: "admin2@admin.com",
      name: "Admin",
      passwordHash: passwordHash,
      admin: true,
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
      deptName: "Stuff",
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
      name: "Wow",
      storeLocation: 2,
    });

    const category5 = await Category.create({
      name: "Cool",
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
      type: "Big Location",
      storeLocation: 2,
      date: new Date(),
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedDatabase();
