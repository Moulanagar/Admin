// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const {
//     getAllStudents,
//     getStudentById,
//     createStudent,
//     updateStudent,
//     deleteStudent


// } = require('../helpers/studentHelpers');


// // Get all students (authenticated)
// router.get('/', auth, async (req, res) => {
//     try {
//         const students = await getAllStudents();
//         res.json(students);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Get student by ID (authenticated)
// router.get('/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const student = await getStudentById(id);
//         if (!student) {
//             return res.status(404).json({ msg: 'Student not found' });
//         }
//         res.json(student);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Add a new student (authenticated)
// router.post('/', auth, async (req, res) => {
//     const { email, password, name } = req.body;
//     try {
//         const newStudent = await createStudent(email, password, name);
//         res.json(newStudent);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Update an existing student (authenticated)
// router.put('/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     const { email, password, name } = req.body;
//     try {
//         const updatedStudent = await updateStudent(id, email, password, name);
//         res.json(updatedStudent);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Delete an existing student (authenticated)
// router.delete('/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     try {
//         await deleteStudent(id);
//         res.json({ msg: 'Student deleted successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllExternals,
    getExternalById,
    createExternal,
    updateExternal,
    deleteExternal
} = require('../helpers/externalHelpers');

// Get all externals (authenticated)
router.get('/', auth, async (req, res) => {
    try {
        const externals = await getAllExternals();
        res.json(externals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get external by ID (authenticated)
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const external = await getExternalById(id);
        if (!external) {
            return res.status(404).json({ msg: 'External not found' });
        }
        res.json(external);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new external (authenticated)
router.post('/', auth, async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const newExternal = await createExternal(email, password, name);
        res.json(newExternal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update an existing external (authenticated)
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body;
    try {
        const updatedExternal = await updateExternal(id, email, password, name);
        res.json(updatedExternal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete an existing external (authenticated)
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteExternal(id);
        res.json({ msg: 'External deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

