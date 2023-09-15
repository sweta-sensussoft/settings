import mongoose from "mongoose";

export const url = process.env.MONGODB_URI ?? "mongodb+srv://statitt:KcorsG9J8tX6fETK@statitt.gd1hcny.mongodb.net/?retryWrites=true&w=majority";
//export const url = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
export default async () => {
  try {
    mongoose.set('strictQuery', false);
    return await mongoose.connect(url, {
      // dbName: process.env.MONGODB_DATABASE || "statitt_ssettings_local"
      dbName: process.env.MONGODB_DATABASE || "statitt_settings"
    });
  } catch (error) {
    console.error(error);
  }
};
