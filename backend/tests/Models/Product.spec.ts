import * as db from '../db'
import { IProduct, Product } from '../../src/Models/product'
import { faker } from '@faker-js/faker'

describe('Product Model Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('Create Product', async () => {
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

        const product = new Product(productData)
        const createdProduct = await product.save()
        expect(createdProduct).toBeDefined();
        expect(createdProduct._id).toBeDefined();
        expect(createdProduct.title).toBe(productData.title);
        expect(createdProduct.description).toBe(productData.description);
        expect(createdProduct.price).toBe(productData.price);
        expect(createdProduct.discountPercentage).toBe(productData.discountPercentage);
        expect(createdProduct.rating).toBe(productData.rating);
        expect(createdProduct.stock).toBe(productData.stock);
        expect(createdProduct.thumbnail).toBe(productData.thumbnail);
        expect(createdProduct.category).toBe(productData.category);
        expect(createdProduct.brand).toBe(productData.brand);
    })

    test('Delete Product', async () => {
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

        const product = new Product(productData)
        const createdProduct = await product.save()
        const deleted = await createdProduct.deleteOne()

        expect(deleted).toBeDefined()
        expect(deleted._id).toBeDefined()
        expect(deleted._id).toBe(createdProduct._id)
        expect(deleted.title).toBe(createdProduct.title)
        expect(deleted.description).toBe(createdProduct.description)
    })

    test('Update Product', async () => {
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

        const product = new Product(productData)
        await product.save()
        const newData = {
            title: faker.commerce.productName(),
            rating: Number(faker.commerce.price({ min: 0, max: 5 })),
        }

        const updateProduct = await product.updateOne(newData)
        expect(updateProduct).toBeDefined()
        expect(updateProduct.modifiedCount).toEqual(1)
        expect(updateProduct.matchedCount).toEqual(1)
    })
})