import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // const token = req.cookies.token || req.headers.authorization;
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }

        req.user = user;

        next();
    });
}