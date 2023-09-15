import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Assuming the token is sent in the Authorization header as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const secretKey = process.env.JWT_SECRET || 'your-secret-key';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.userId = decoded.id;  // Store the user ID for use in other routes
        next();
    });
};
