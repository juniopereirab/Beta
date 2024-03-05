import supertest from 'supertest'
import { app } from '../../src/Server/app'
import { IUser } from '../../src/Models/user'
import { faker } from '@faker-js/faker'
import { userService } from '../../src/Services/user.service'
import * as db from '../db'

const request = supertest(app)

describe('User Routes Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('POST /login SUCCESS', async () => {

        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        await userService.register(userData)

        const response = await request.post('/login').send({
            email: userData.email,
            password: userData.password,
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('user')
    })

    test('POST /login FAILED', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        await userService.register(userData)

        const response = await request.post('/login').send({
            email: userData.email,
            password: "SENHA_ERRADA",
        })

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('error')
    })

    test('POST /login FAILED', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        await userService.register(userData)

        const response = await request.post('/login').send({
            email: '',
            password: "SENHA_ERRADA",
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error')
    })
})