import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export function authentication (req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        jwt.verify(token, 'your-secret-key');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}