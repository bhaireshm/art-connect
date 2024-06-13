import DatabaseCRUD from "@/database/db.crud";
import { SCHEMA_NAMES } from "@/utils/constants";
import { model, models, Schema } from "mongoose";

export const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});

const AddressSchema = new DatabaseCRUD<typeof addressSchema>(
  models[SCHEMA_NAMES.ADDRESS] || model(SCHEMA_NAMES.ADDRESS, addressSchema),
);
export default AddressSchema;
