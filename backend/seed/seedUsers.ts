import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Employee from "../models/user.model.js";

dotenv.config();

const seedUsers = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected");

    const sampleDataPath = fileURLToPath(new URL("./sampleData.json", import.meta.url));
    const data = JSON.parse(await readFile(sampleDataPath, "utf8"));

    await Employee.deleteMany({});
    await Employee.insertMany(data);

    console.log("Users seeded successfully");

    await mongoose.connection.close();
  } 
    catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
