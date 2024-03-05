import { faker } from '@faker-js/faker'
import { IUser } from '../../src/Models/user'
import { productService } from '../../src/Services/product.service'
import * as db from '../db'
import { IProduct } from '../../src/Models/product'
import { GetProductsParams } from '../../src/Interfaces/product'

describe('Product Service Testing', () => {
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

        expect(createdProduct).toBeDefined();
        expect(createdProduct?._id).toBeDefined();
        expect(createdProduct?.title).toBe(productData.title);
        expect(createdProduct?.brand).toBe(productData.brand);
        expect(createdProduct?.category).toBe(productData.category)
    })

    test('Create product failed', async () => {
        try {
            const productData: IProduct = {
                brand: faker.internet.userName(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price()),
                discountPercentage: Number(faker.commerce.price({ min: 0, max: 100 })),
                rating: Number(faker.commerce.price({ min: 0, max: 5 })),
                stock: faker.number.int(),
                thumbnail: faker.image.urlLoremFlickr(),
                title: '',
                category: faker.commerce.department(),
            }
    
            await productService.createProduct(productData)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test('Get product list success', async () => {
        const params: GetProductsParams = {
            skip: 0,
            limit: 15
        }

        const response = await productService.getProducts(params)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('limit')
        expect(response).toHaveProperty('skip')
        expect(response).toHaveProperty('total')
        expect(response).toHaveProperty('products')

        expect(response.limit).toBe(15);
        expect(response.skip).toBe(0);
        expect(Array.isArray(response.products)).toBe(true);
        expect(response.total).toBeGreaterThanOrEqual(100)
    })

    test('Get product detail success', async () => {
        const id = '1'

        const response = await productService.getProduct(id)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('title')
        expect(response).toHaveProperty('brand')
        expect(response).toHaveProperty('price')
        expect(response).toHaveProperty('category')
    })

    test('Get product detail from Mongo success', async () => {
        const productData: IProduct= {
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

        const response = await productService.getProduct(createdProduct._id)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('title')
        expect(response).toHaveProperty('brand')
        expect(response).toHaveProperty('price')
        expect(response).toHaveProperty('category')
    })

    test('Get product list from Mongo and Dummy', async () => {
        const productData: IProduct= {
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

        await productService.createProduct(productData)

        const params: GetProductsParams = {
            skip: 90,
            limit: 15
        }

        const response = await productService.getProducts(params)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('limit')
        expect(response).toHaveProperty('skip')
        expect(response).toHaveProperty('total')
        expect(response).toHaveProperty('products')

        expect(response.limit).toBe(11);
        expect(response.skip).toBe(90);
        expect(Array.isArray(response.products)).toBe(true);
        expect(response.total).toBeGreaterThanOrEqual(100);
    })

    test('Get categories list', async () => {
        const response = await productService.getCategories()

        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    })

    test('Update product success Dummy API', async () => {
        const productData = {
            _id: '1',
            brand: faker.internet.userName(),
            title: faker.commerce.productName(),
        }

        const productBeforeUpdate = await productService.getProduct(productData._id)
        const response = await productService.updateProduct(productData)

        expect(response).toBeDefined()
        expect(productBeforeUpdate).toBeDefined()

        expect(response.title).not.toBe(productBeforeUpdate.title)
        expect(response.brand).not.toBe(productBeforeUpdate.brand)
        expect(response.id).toBe(productBeforeUpdate.id)
    })

    test('Update product success from Mongo', async () => {
        const productData: IProduct= {
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
        const newData = {
            _id: createdProduct._id,
            brand: 'NOVA MARCA',
            title: 'NOVO TITULO',
        }
        
        const response = await productService.updateProduct(newData)

        expect(response).toBeDefined()
        expect(createdProduct).toBeDefined()
        expect(response).toHaveProperty('modifiedCount')
        expect(response).toHaveProperty('matchedCount')
        expect(response.modifiedCount).toEqual(1)
        expect(response.matchedCount).toEqual(1)
    })

    test('Get product failed', async () => {
        try {
            const id = '101'
            await productService.getProduct(id)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test('Delete product success Dummy API', async () => {
        const id = '1'

        const response = await productService.deleteProduct(id)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('removed')
        expect(response.removed).toBeTruthy()
    })

    test('Delete product from Mongo', async () => {
        const productData: IProduct= {
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

        const response = await productService.deleteProduct(createdProduct._id)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('removed')
        expect(response.removed).toBeTruthy()
    })

    test('Delete product failed', async () => {
        const id = '101'

        const response = await productService.deleteProduct(id)

        expect(response).toBeDefined()
        expect(response).toHaveProperty('removed')
        expect(response.removed).toBeFalsy()
    })

    test('Update product failed', async () => {
        try {
            const productData = {
                _id: '101'
            }
    
            await productService.updateProduct(productData)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})