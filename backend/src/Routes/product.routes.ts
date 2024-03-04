import express from "express"
import { productController } from "../Controllers/product.controller"
import { authentication } from "../Middlewares/auth.middleware"

export const productRouter = express.Router()

productRouter.get('/products', authentication, productController.getProducts)
productRouter.get('/products/:id', authentication, productController.getProduct)
productRouter.get('/categories', authentication, productController.getCategories)
productRouter.post('/products', authentication, productController.createProduct)
productRouter.put('/products/:id', authentication, productController.updateProduct)
productRouter.delete('/products/:id', authentication, productController.deleteProduct)