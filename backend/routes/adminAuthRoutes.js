const express = require('express');
const router = express.Router();
const supabase = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth'); // Adjust the path according to your structure

// Rate limiter for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

// Updated /user endpoint to get current admin info
router.get('/user', auth, async (req, res) => {
    try {
        const adminId = req.admin.id; // Assuming your auth middleware sets this
        const { data: admin, error } = await supabase
            .from('db_admins')
            .select('admin_id, email, name, created_at')
            .eq('admin_id', adminId)
            .single();

        if (error || !admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }

        res.json(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Signup Endpoint
router.post('/signup', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail(),
    body('password').isLength({ min: 2 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const emailLowercase = email.toLowerCase();

    try {
        // Check if the user already exists
        const { data: users, error: userExistsError } = await supabase
            .from('db_admins')
            .select('*')
            .eq('email', emailLowercase);

        if (userExistsError) {
            throw userExistsError;
        }

        // If any user is found, return an error
        if (users.length > 0) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Hash password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data: newUser, error: newUserError } = await supabase
            .from('db_admins')
            .insert([{ name, email: emailLowercase, password: hashedPassword }])
            .select('*')
            .single();

        if (newUserError) {
            throw newUserError;
        }

        console.log(newUser);
        // Generate JWT for the new user
        const payload = {
            admin: {
                id: newUser.admin_id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 18000000,
            }).json({ adminId: newUser.admin_id, name: newUser.name });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Login Endpoint
router.post('/login', loginLimiter, [
    body('email').isEmail(),
    body('password').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("error", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const emailLowercase = email.toLowerCase(); // Convert email to lowercase
    console.log(emailLowercase, password);
    try {
        const { data: admin, error } = await supabase
            .from('db_admins')
            .select('*')
            .eq('email', emailLowercase)
            .single();

        console.log(error);
        if (error || !admin) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            admin: {
                id: admin.admin_id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 18000000,
            }).json({ adminId: admin.admin_id , name: admin.name});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: 'None',
    }).sendStatus(200);
});

module.exports = router;
