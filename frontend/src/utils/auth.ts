import { decode as jwtDecode } from 'jsonwebtoken';

export const checkTokenExpiration = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    return decodedToken.exp > currentTime;
};