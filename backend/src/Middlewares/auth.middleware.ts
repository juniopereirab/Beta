import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { secret } from '../Config/auth.json'

export function authentication (req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}