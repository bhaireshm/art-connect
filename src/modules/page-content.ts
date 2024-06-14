import DatabaseCRUD from "@/database/db.crud";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

const teamMemberSchema = new Schema({
  name: String,
  role: String,
  bio: String,
});

const faqSchema = new Schema({
  question: String,
  answer: String,
});

const pageContentSchema = new Schema({
  page: { type: String, required: true }, // e.g., "about", "contact"
  content: String,
  additionalInfo: {
    mission: String, // Only for About Us page
    values: String, // Only for About Us page
    team: [teamMemberSchema], // Only for About Us page
    contactDetails: {
      // Only for Contact Us page
      address: String,
      phone: String,
      email: String,
    },
    faq: [faqSchema], // Only for Contact Us page (optional)
  },
});

const PageContent = new DatabaseCRUD<typeof pageContentSchema>(
  models[SCHEMA_NAMES.PAGE_CONTENT] ||
    model(SCHEMA_NAMES.PAGE_CONTENT, pageContentSchema),
);
export default PageContent;
