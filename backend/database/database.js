import mongoose from "mongoose";
import { DATABASE_STRING } from "../config/index.js";

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(DATABASE_STRING);
    console.log(`database is connected to the HOST:${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
