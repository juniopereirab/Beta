import * as db from '../db'
import { IUser, User } from '../../src/Models/user'
import { faker } from '@faker-js/faker'

describe('User Model Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('Create User', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const user = new User(userData)
        const createdUser = await user.save()
        expect(createdUser).toBeDefined();
        expect(createdUser._id).toBeDefined();
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.email).toBe(userData.email);
        expect(createdUser.password).not.toBe(userData.password)
    })

    test('Delete User', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const user = new User(userData)
        const createdUser = await user.save()
        const deleted = await createdUser.deleteOne()

        expect(deleted).toBeDefined()
        expect(deleted._id).toBeDefined()
        expect(deleted._id).toBe(createdUser._id)
        expect(deleted.name).toBe(createdUser.name)
        expect(deleted.email).toBe(createdUser.email)
    })

    test('Update User', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const user = new User(userData)
        await user.save()
        const newData = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
        }

        const updateUser = await user.updateOne(newData)

        expect(updateUser).toBeDefined()
        expect(updateUser.modifiedCount).toEqual(1)
        expect(updateUser.matchedCount).toEqual(1)
    })
})