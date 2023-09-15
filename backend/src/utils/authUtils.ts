import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hashed: string) => {
    return bcrypt.compare(password, hashed);
};

export const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, 'your-secret-key', { expiresIn: '1h' });
};
