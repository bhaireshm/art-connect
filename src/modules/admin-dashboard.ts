import { DB, DBCrud } from "@/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

const adminDashboardSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAMES.USER,
      required: true,
    },
    siteAnalytics: {
      totalVisitors: Number,
      totalSales: Number,
      totalArtworks: Number,
      totalArtists: Number,
    },
    manageArtists: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTIST }],
    manageArtworks: [
      { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK },
    ],
    manageOrders: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ORDER }],
    manageUsers: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.USER }],
  },
  DB.getDefaultSchemaOptions(),
);

const AdminDashboard = new DBCrud<typeof adminDashboardSchema>(
  models[SCHEMA_NAMES.ADMIN_DASHBOARD] ||
    model(SCHEMA_NAMES.ADMIN_DASHBOARD, adminDashboardSchema),
);

export default AdminDashboard;
