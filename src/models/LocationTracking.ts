import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class LocationTracking extends Model {}

LocationTracking.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    checkin_lat_lng: DataTypes.STRING,
    checkout_lat_lng: DataTypes.STRING,
    check_in_time: DataTypes.TIME,
    check_out_time: DataTypes.TIME,
    task_type: DataTypes.STRING,
    total_distance: DataTypes.STRING,
    estimated_time: DataTypes.STRING
  },
  {
    sequelize,
    tableName: "location_tracking",
    timestamps: false
  }
);
