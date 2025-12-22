import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: process.env.SD_API_URL,
  headers: {
    "auth-token": process.env.SD_AUTH_KEY,
    "Content-Type": "application/json",
  },
});

export default api;
