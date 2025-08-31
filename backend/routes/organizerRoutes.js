const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllOrganizers,
    getOrganizerById,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
} = require('../helpers/organizerHelpers');

// Get all organizers (authenticated)
router.get('/', auth, async (req, res) => {
    try {
        const organizers = await getAllOrganizers();
        res.json(organizers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get organizer by ID (authenticated)
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const organizer = await getOrganizerById(id);
        if (!organizer) {
            return res.status(404).json({ msg: 'Organizer not found' });
        }
        res.json(organizer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new organizer (authenticated)
router.post('/', auth, async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const newOrganizer = await createOrganizer(email, password, name);
        res.json(newOrganizer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update an existing organizer (authenticated)
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body;
    try {
        const updatedOrganizer = await updateOrganizer(id, email, password, name);
        res.json(updatedOrganizer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete an existing organizer (authenticated)
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteOrganizer(id);
        res.json({ msg: 'Organizer deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
