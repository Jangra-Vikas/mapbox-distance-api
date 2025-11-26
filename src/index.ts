import express from "express";
import dotenv from "dotenv";
import distanceRoutes from "./routes/distance.routes";
import locationRoutes from "./routes/location.routes";
import sequelize from "./config/database";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    return res.json({status:true, messgae:"APIs is running"})
});

app.use("/api/distance", distanceRoutes);
app.use("/api/location", locationRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));