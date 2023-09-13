// profileController.ts

import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import * as profileService from '../services/profileService';

const router = express.Router();

// Create a new profile
router.post('/', verifyToken, async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const user_id = req.userId; // Assuming req.userId is set by verifyToken middleware

        const newProfileId = await profileService.createProfile(user_id, first_name, last_name, email);
        res.status(201).json({ id: newProfileId, message: 'Profile created successfully' });
    } catch (error) {
        console.error('Create Profile Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a profile by user ID
router.get('/', verifyToken, async (req, res) => {
    try {
        const user_id = req.userId;
        console.log("Controller UserID:", user_id);

        const profile = await profileService.getProfileByUserId(user_id);
        console.log("Controller Profile:", profile);

        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Update a profile by user ID
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const user_id = parseInt(req.params.id, 10);
        const { first_name, last_name, email } = req.body;

        const updatedRows = await profileService.updateProfile(user_id, first_name, last_name, email);
        if (typeof updatedRows === 'number' && updatedRows > 0) {
            res.json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }

    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
