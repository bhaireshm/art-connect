import { Schema } from "mongoose";

export const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});
