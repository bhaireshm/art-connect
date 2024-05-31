import { PROJECT_NAME } from "@/utils/constants";
import mongoose from "mongoose";

async function db() {
  const { MONGODB_URI } = process.env || `mongodb://localhost:27017/${PROJECT_NAME.toLowerCase()}`;
  if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

  // let cached = global.mongoose;
  // if (!cached) cached = global.mongoose = { conn: null };
  // if (cached.conn) return cached.conn;
  // cached.conn = await mongoose.connect(MONGODB_URI);
  // return cached.conn;
  return mongoose.connect(MONGODB_URI);
}

export default db;
