export function mapApiProductToShopify(product: any, details: any) {
  const storageMatch = product.title.match(/\((\d+GB\s+\d+GB)\)/);
  const storageValue = storageMatch
    ? { variantName: storageMatch[1], sellingPrice: product.sellingPrice, mrp: product.mrp, catalogId: product.catalogId }
    : { variantName: "Default", sellingPrice: product.items[0].sellingPrice, mrp: product.items[0].mrp, catalogId: product.catalogId };
  const description = (prod: any) => {
    let html = "";
    if (prod.keySpecs?.length) {
      html += `<h2>Key Features</h2><ul>`;
      for (const spec of prod.keySpecs) html += `<li>${spec}</li>`;
      html += `</ul>`;
    }
    if (prod.detailedSpecs?.length) {
      for (const section of prod.detailedSpecs) {
        html += `<h3>${section.title}</h3><table width="100%" border="1" cellpadding="5" cellspacing="0">`;
        for (const s of section.specs) {
          html += `<tr><td><strong>${s.name}</strong></td><td>${s.string}</td></tr>`;
        }
        html += `</table><br>`;
      }
    }
    if (prod.packageContents?.length) {
      html += `<h3>Package Contents</h3><ul>`;
      for (const item of prod.packageContents) html += `<li>${item.trim()}</li>`;
      html += `</ul>`;
    }
    return html;
  };

  const colors = [...new Set(product.items.map((i: any) => i.color))];

  let storages: any[] = [];

  try {
    storages = JSON.parse(product.superCatalogVariants);
  } catch {
    storages = [storageValue];
  }

  if (storages.length === 0) {
    storages = [storageValue];
  }

  const variants: any[] = [];

  for (const item of product.items) {
    for (const storage of storages) {
      const sku = `${product.brand}-${product.superCatalogTitle}-${storage.variantName}-${item.color}-${product.catalogId}-${item.item_id}`
        .replace(/\s+/g, "-")
        .toUpperCase();

      variants.push({
        sku,
        option1: item.color,
        option2: storage.variantName,
        price: storage?.mop?.toString() || item.mop.toString(),
        compare_at_price: storage?.mrp?.toString() || item.mrp.toString(),
        inventory_management: "shopify",
        inventory_quantity: item.availability > 0 ? 5 : 0,
        image: { src: product.imageUrl },
      });
    }
  }

  return {
    title: product.superCatalogTitle,
    vendor: product.brand,
    product_type: "Smartphone",
    body_html: description(details) || "",
    images: details.images?.map((img: any) => ({ src: img.url })) ?? [
      { src: product.imageUrl },
    ],

    options: [
      {
        name: "Color",
        values: colors,
      },
      {
        name: "Storage",
        values: storages,
      },
    ],

    variants,
    tags: ["SmartDukaan", product.brand, product.superCatalogTitle],
  };
}

