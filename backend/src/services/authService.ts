import * as userModel from '../models/userModel';
import * as authUtils from '../utils/authUtils';
import { User } from '../types/userTypes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (username: string, password: string) => {
    const hashedPassword = await authUtils.hashPassword(password);
    const userId = await userModel.createUser(username, hashedPassword);
    return { id: userId, username };  // Return the user object
};


export const signin = async (username: string, password: string): Promise<{ id: number, username: string } | null> => {
    const user = await userModel.getUserByUsername(username) as User;
    const isValid = await authUtils.verifyPassword(password, user.password);

    if (isValid) {
        return { id: user.id, username: user.username };  // Return user object
    }

    return null;
};

export const generateToken = (userId: number) => {
    const secretKey = process.env.JWT_SECRET || 'your-secret-key';  // It's better to store the secret key in an environment variable
    const token = jwt.sign({ id: userId }, secretKey, {
        expiresIn: '72h'  // Token will expire in 3 Days
    });
    return token;
};
