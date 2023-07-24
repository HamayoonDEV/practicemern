import mongoose from "mongoose";

import { DATABASE_CONNECTION_STRING } from "../config/index.js";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_CONNECTION_STRING);
    console.log(`database is connected to the string:${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
