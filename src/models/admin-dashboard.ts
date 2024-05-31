import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model } from "mongoose";

const adminDashboardSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.USER, required: true },
  siteAnalytics: {
    totalVisitors: Number,
    totalSales: Number,
    totalArtworks: Number,
    totalArtists: Number,
  },
  manageArtists: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTIST }],
  manageArtworks: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
  manageOrders: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ORDER }],
  manageUsers: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.USER }],
});

const AdminDashboard = model(SCHEMA_NAMES.ADMIN_DASHBOARD, adminDashboardSchema);
export default AdminDashboard;
