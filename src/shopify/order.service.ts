import shopify from "./shopify.client";

class ShopifyOrderService {
  async getOrders(limit = 50) {
    return await shopify.order.list({
      limit,
      status: 'any'
    });
  }

  async getOrderById(orderId: number) {
    return await shopify.order.get(orderId);
  }
}

export default new ShopifyOrderService();
