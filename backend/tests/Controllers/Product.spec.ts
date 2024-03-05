import { faker } from '@faker-js/faker'
import { productController } from '../../src/Controllers/product.controller'
import * as db from '../db'
import { Request, Response } from 'express'
import { IProduct } from '../../src/Models/product'
import { productService } from '../../src/Services/product.service'

describe('User Controller Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('Create product success', async () => {
        const req = {
            body: {
                brand: faker.internet.userName(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price()),
                discountPercentage: Number(faker.commerce.price({ min: 0, max: 100 })),
                rating: Number(faker.commerce.price({ min: 0, max: 5 })),
                stock: faker.number.int(),
                thumbnail: faker.image.urlLoremFlickr(),
                title: faker.commerce.productName(),
                category: faker.commerce.department(),
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: req.body.title }))
    })

    test('Create product failed', async () => {
        const req = {
            body: {
                brand: '',
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price()),
                discountPercentage: Number(faker.commerce.price({ min: 0, max: 100 })),
                rating: Number(faker.commerce.price({ min: 0, max: 5 })),
                stock: faker.number.int(),
                thumbnail: faker.image.urlLoremFlickr(),
                title: faker.commerce.productName(),
                category: faker.commerce.department(),
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Error to create product' }))
    })

    test('Get product list success', async () => {
        const req = {
            query: {
                skip: 0,
                limit: 15
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ limit: expect.any(Number) }))
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ skip: expect.any(Number) }))
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ products: expect.any(Array) }))
    })

    test('Get product detail success', async () => {
        const req = {
            params: {
                id: '1'
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Number) }))
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: expect.any(String) }))
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ brand: expect.any(String) }))
    })

    test('Get product detail failed', async () => {
        const req = {
            params: {
                id: '101'
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error: "Internal server error"}))
    })

    test('Get categories', async () => {
        const req = {} as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.getCategories(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.any(Array))
    })

    test('Update product success', async () => {
        const productData: IProduct = {
            brand: faker.internet.userName(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price()),
            discountPercentage: Number(faker.commerce.price({ min: 0, max: 100 })),
            rating: Number(faker.commerce.price({ min: 0, max: 5 })),
            stock: faker.number.int(),
            thumbnail: faker.image.urlLoremFlickr(),
            title: faker.commerce.productName(),
            category: faker.commerce.department(),
        }

        const createdProduct = await productService.createProduct(productData)

        const req = {
            body: {
                brand: "nova marca",
                description: "nova descrição",
            },
            params: {
                id: createdProduct._id
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('Update product failed', async () => {
        const req = {
            body: {
                brand: "nova marca",
                description: "nova descrição",
            },
            params: {
                id: '101'
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error: "Internal server error"}))
    })

    test('Delete product success', async () => {
        const req = {
            params: {
                id: '1'
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({message: "Product deleted successfully"}))
    })

    test('Delete product failed', async () => {
        const req = {
            params: {
                id: '101'
            }
        } as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await productController.deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Error to delete product" }))
    })
})