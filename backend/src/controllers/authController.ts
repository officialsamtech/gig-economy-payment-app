import express from 'express';
import * as authService from '../services/authService';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.signup(username, password);
        if (result) {
            const token = authService.generateToken(result.id as number);  // Assuming generateToken is a function in authService
            res.json({ user: result, token });
        } else {
            res.status(400).json({ error: 'Signup failed' });
        }
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.signin(username, password);

        if (result) {
            const token = authService.generateToken(result.id);  // Generate token
            res.json({ user: result, token });  // Return user and token
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Signin Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/logout', (req, res) => {
    // Logout logic here
    res.json({ message: 'Logged out' });
});

export default router;
