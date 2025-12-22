import shopify from "./shopify.client";

class ShopifyWebhookService {
  async registerWebhooks() {
    await shopify.webhook.create({
      topic: 'orders/create',
      address: process.env.SHOPIFY_WEBHOOK_BASE_URL + '/orders-create',
      format: 'json',
    });

    await shopify.webhook.create({
      topic: 'inventory_levels/update',
      address: process.env.SHOPIFY_WEBHOOK_BASE_URL + '/inventory-update',
      format: 'json',
    });
  }

  async listWebhooks() {
    return await shopify.webhook.list();
  }

  async deleteWebhook(id: number) {
    return await shopify.webhook.delete(id);
  }
}

export default new ShopifyWebhookService();
