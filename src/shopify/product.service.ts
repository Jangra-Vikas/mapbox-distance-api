import shopify from './shopify.client';

class ShopifyProductService {
  async createProduct(product: any) {
    return await shopify.product.create(product);
  }

  async updateProduct(shopifyProductId: number, data: any) {
    return await shopify.product.update(shopifyProductId, data);
  }

  async deleteProduct(shopifyProductId: number) {
    return await shopify.product.delete(shopifyProductId);
  }

  async getProduct(shopifyProductId: number) {
    return await shopify.product.get(shopifyProductId);
  }

  async list(limit = 250) {
    return await shopify.product.list(limit);
  }
  
  async findBy(key: string, value: string) {
    const query = `{ products ( first: 250, query: "${key}:${value}") { edges { node { id title tags handle } } } }`;
    const response = await shopify.graphql(query);
    return response.products.edges.map((e: any) => e.node);
  }
}

export default new ShopifyProductService();
