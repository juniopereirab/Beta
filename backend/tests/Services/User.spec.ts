import { faker } from '@faker-js/faker'
import { IUser } from '../../src/Models/user'
import { userService } from '../../src/Services/user.service'
import * as db from '../db'

describe('User Service Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('Register success', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const createdUser = await userService.register(userData)

        expect(createdUser).toBeDefined();
        expect(createdUser?._id).toBeDefined();
        expect(createdUser?.name).toBe(userData.name);
        expect(createdUser?.email).toBe(userData.email);
        expect(createdUser?.password).not.toBe(userData.password)
    })

    test('Login success', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        await userService.register(userData)

        const loginResponse = await userService.login(userData.email, userData.password)

        expect(loginResponse).toBeDefined();
        expect(loginResponse?.token).toBeDefined();
        expect(loginResponse?.user).toBeDefined();
        expect(loginResponse?.user.email).toBe(userData.email);
        expect(loginResponse?.user.name).toBe(userData.name);
    })

    test('Register failed with empty field', async () => {
        try {
            const userData = {
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: ''
            }
    
            await userService.register(userData)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    test('Login Failed User Dont Exists', async () => {
        const userData = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const loginResponse = await userService.login(userData.email, userData.password);

        expect(loginResponse).toBeNull()
    })

    test('Login with Wrong Password', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        await userService.register(userData)
        const loginResponse = await userService.login(userData.email, faker.internet.password())

        expect(loginResponse).toBeNull()
    })
})