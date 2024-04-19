require("dotenv").config({ path: "./configs/config.env" });

const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const User = require("./models/User");
const Cargo = require("./models/Cargo");

const userData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "user.json"))
);

const cargoData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "cargo.json"))
);

const importData = async () => {
  try {
    // for (let user of userData) {
    //   switch (user.role) {
    //     case "sender":
    //       const Sender = mongoose.model("Sender");
    //       newUser = new Sender({ ...user });
    //       break;

    //     case "supplier":
    //       const Supplier = mongoose.model("Supplier");
    //       newUser = new Supplier({ ...user });
    //       break;

    //     case "consignee":
    //       const Consignee = mongoose.model("Consignee");
    //       newUser = new Consignee({ ...user });
    //       break;

    //     case "employee":
    //       newUser = new User({ ...user });
    //       break;
    //     default:
    //       break;
    //   }
    //   await newUser.save();
    // }
    await User.create(userData);
    await Cargo.create(cargoData);
    console.log("Data imported...");
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Cargo.deleteMany();
    console.log("Data deleted");
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
};

if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
