import express from "express"
import { productController } from "../Controllers/product.controller"

export const productRouter = express.Router()

productRouter.get('/products', productController.getProducts)
productRouter.get('/products/:id', productController.getProduct)
productRouter.get('/categories', productController.getCategories)