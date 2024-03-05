import { faker } from '@faker-js/faker'
import { userController } from '../../src/Controllers/user.controller'
import * as db from '../db'
import { Request, Response } from 'express'
import { IUser } from '../../src/Models/user'
import { userService } from '../../src/Services/user.service'

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

    test('Create user success', async () => {
        const req = {
            body: {
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await userController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }))
    })

    test('Create user failed', async () => {
        const req = {
            body: {
                name: '',
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await userController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }))
    })

    test('Login success', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const req = {
            body: userData
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await userService.register(userData)
        await userController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }))
    })

    test('Login without password', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const req = {
            body: {
                email: userData.email
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await userService.register(userData)
        await userController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Password not provided" }))
    })

    test('Login without email', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const req = {
            body: {
                password: userData.password
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await userService.register(userData)
        await userController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Email not provided" }))
    })

    test('Login without email', async () => {
        const userData: IUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const req = {
            body: {
                email: userData.email,
                password: "WRONG_PASSWORD"
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await userService.register(userData)
        await userController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Email or Password is wrong" }))
    })
})