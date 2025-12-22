import api from "../config/axios";
import dotenv from "dotenv";

dotenv.config();

class ApiProductService {
  async fetchProducts(limit = 15, offset = 15, brand = "Samsung", categoryId = 3, subCategoryId = 0, q = "Samsung") {
    try {
      const response = await api.get(`/fofo?limit=${limit}&brand=${brand}&offset=${offset}&categoryId=${categoryId}&subCategoryId=${subCategoryId}&q=${q}`);
      return response.data?.response;
    } catch (error: any) {
      console.error("API Fetch Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch products from external API");
    }
  }
  async fetchProductDetails(id: number) {
    try {
      const response = await api.get(`/entity/${id}`);
      return response.data?.response;
    } catch (error: any) {
      console.error("API Fetch Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch product details from external API");
    }
  }
}

export default new ApiProductService();
