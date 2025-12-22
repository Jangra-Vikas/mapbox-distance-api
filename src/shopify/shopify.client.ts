import Shopify from 'shopify-api-node';
import dotenv from 'dotenv';

dotenv.config();

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME!,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
  apiVersion: process.env.SHOPIFY_API_VERSION,
});

export default shopify;
