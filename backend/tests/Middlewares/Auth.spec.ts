import { authentication } from '../../src/Middlewares/auth.middleware'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { secret } from '../../src/Config/auth.json'

describe('Authentication Middleware Testing', () => {
    test('Authentication success', async () => {
        const mockToken = jwt.sign({ userId: 123 }, secret);
        const req = {
            headers: {
                authorization: mockToken
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response
        const next = jest.fn()

        authentication(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test('Authentication failed', async () => {
        const req = {
            headers: {
                authorization: ''
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response
        const next = jest.fn()

        authentication(req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ error: 'Access denied' })
    })

    test('Authentication invalid', async () => {
        const req = {
            headers: {
                authorization: 'TOKEN_INVALIDO'
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response
        const next = jest.fn()

        authentication(req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' })
    })
})