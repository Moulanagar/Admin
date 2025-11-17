// Path: backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require('../helpers/adminHelpers');


// Get all admins (authenticated)
router.get('/', auth, async (req, res) => {
    try {
        const admins = await getAllAdmins();
        res.json(admins);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get admin by ID (authenticated)
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await getAdminById(id);
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }
        res.json(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Add a new admin (authenticated)
router.post('/', auth, async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const newAdmin = await createAdmin(email, password, name);
        res.json(newAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Update an existing admin (authenticated)
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body;
    try {
        const updatedAdmin = await updateAdmin(id, email, password, name);
        res.json(updatedAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Delete an existing admin (authenticated)
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteAdmin(id);
        res.json({ msg: 'Admin deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
// Path: backend/routes/adminAuthRoutes.js
