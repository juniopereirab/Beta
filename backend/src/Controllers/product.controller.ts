import { Request, Response } from "express";
import { productService } from "../Services/product.service";
import { GetProductsParams } from "../Interfaces/product";
import { IProductDoc, ProductSchemaValidate } from "../Models/product";

class ProductController {
    async createProduct(req: Request, res: Response) {
        const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body
        try {
            const data = {
                title, description, price, discountPercentage,
                rating, stock, brand, category, thumbnail,
            }

            const { error } = ProductSchemaValidate.validate(data)

            if (error) {
                return res.status(400).json({ error: 'Error to create product' })
            }

            const product = await productService.createProduct(data)

            return res.status(201).json(product)
        } catch (error) {
            return res.status(500).json({error: "Internal server error"})
        }
    }

    async getProducts(req: Request, res: Response) {
        const { search, limit, skip, category } = req.query as GetProductsParams

        try {
            const products = await productService.getProducts({
                search,
                limit,
                skip,
                category
            })

            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json({error: "Internal server error"})
        }
    }

    async getProduct(req: Request, res: Response) {
        const { id } = req.params
        
        try {
            const product = await productService.getProduct(id)

            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json({error: "Internal server error"})
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await productService.getCategories()

            return res.status(200).json(categories)
        } catch (error) {
            return res.status(500).json({error: "Internal server error"})
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body
        const { id } = req.params
        try {
            const data = {
                _id: id,
                title, description, price, discountPercentage,
                rating, stock, brand, category, thumbnail,
            }
            const product = await productService.updateProduct(data)

            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json({error: "Internal server error"})
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params
        try {
            const { removed } = await productService.deleteProduct(id)

            if (removed) {
                return res.status(200).json({ message: "Product deleted successfully" })
            }

            return res.status(400).json({ error: "Error to delete product" })
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}

export const productController = new ProductController()