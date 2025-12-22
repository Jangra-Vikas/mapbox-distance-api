import shopify from "./shopify.client";

class ShopifyInventoryService {
  async setInventoryLevel(inventoryItemId: number, locationId: number, qty: number) {
    return await shopify.inventoryLevel.set({
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      available: qty
    });
  }

  async adjustInventory(inventoryItemId: number, locationId: number, qtyDelta: number) {
    return await shopify.inventoryLevel.adjust({
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      available_adjustment: qtyDelta
    });
  }

  async listInventoryLevels(inventoryItemId: number) {
    return await shopify.inventoryLevel.list({
      inventory_item_ids: inventoryItemId
    });
  }
}

export default new ShopifyInventoryService();
