import { Request, Response } from "express";
import shopifyProductService from "../../shopify/product.service";
import { mapApiProductToShopify } from "./../../shopify/mappers/product.mapper";
import productsService from "../../services/products.service";

class ProductController {
    async syncAllProducts(req: Request, res: Response) {
        const BATCH_SIZE = 15, results: string | any[] = [], ques = req.query.q as string || "Samsung";
        let offset = 0;

        const shopifyProducts = await shopifyProductService.findBy("tag", ques);

        while (true) {
            try {
                const products = await productsService.fetchProducts(BATCH_SIZE, offset, ques, 3, 0, ques);
                if (products.length === 0) break;

                for (const product of products) {
                    try {
                        const details = await productsService.fetchProductDetails(product.catalogId);
                        const p = mapApiProductToShopify(product, details?.entity);

                        const existingProduct = shopifyProducts.find((sp: any) => { return sp.title == p.title });
                        console.log("Existing Product Check:", existingProduct ? `Found ${existingProduct.title}` : product.title + " Not Found");
                        if (existingProduct) {
                            //const update = await shopifyProductService.updateProduct(existingProduct.id, p);
                            results.push({ message: `Product "${p.title}" already exists.`, productId: existingProduct.id });
                        } else {
                            const created = await shopifyProductService.createProduct(p);
                            results.push({message: `Product "${p.title}" created successfully.`, productId: created.id });
                        }
                    } catch (err: any) {
                        console.error("Product Sync Error:", err.message);
                        results.push(`Error for ${product.title}: ${err.message}`);
                    }
                }

                offset += BATCH_SIZE;

            } catch (err: any) {
                console.error("Sync Error:", err.message);
                return res.status(500).json({ error: err.message });
            }
        }

        return res.json({ synced: results.length, details: results });
    }

    async smartDukaanProducts(req: Request, res: Response) {
        const BATCH_SIZE = 15, results: string | any[] = [], ques = "Apple";
        let offset = 0, products: any[] = [];
        while (true) {
            try {
                let sdProduct = await productsService.fetchProducts(BATCH_SIZE, offset, ques, 3, 0, ques);
                if(sdProduct.length === 0) break;

                for (let i = 0; i < sdProduct.length; i++) {
                    const prodDetails = await productsService.fetchProductDetails(sdProduct[i].catalogId);
                    const mappedProduct = mapApiProductToShopify(sdProduct[i], prodDetails?.entity);
                    products.push(mappedProduct);
                }

            } catch (err: any) {
                console.error("Sync Error:", err.message);
                break;
            }
            offset += BATCH_SIZE;
        }
        return res.json({status: products.length>0, count: products.length, data: products});
    }

    async findByTitle(req: Request, res: Response) {
        try {
            const key = Object.keys(req.query)[0] as string || "tag", value = req.query[key] as string || "SmartDukaan",
            products = await shopifyProductService.findBy(key, value);
            return res.json({status: products.length>0, count: products.length, data: products});

        } catch (err: any) {
            console.error("Error: ", err.message);
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new ProductController();
