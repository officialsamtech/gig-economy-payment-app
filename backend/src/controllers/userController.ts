import { getAllUsers } from '../services/userService';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Get All Users Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;