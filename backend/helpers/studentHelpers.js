// const supabase = require('../db');
// const bcrypt = require('bcryptjs');



// // Get all organizers
// const getAllOrganizers = async () => {
//     let { data: organizers, error } = await supabase
//         .from('organizers')
//         .select('*');
//     if (error) throw error;
//     return organizers;
// };

// // Get organizer by ID
// const getOrganizerById = async (id) => {
//     let { data: organizer, error } = await supabase
//         .from('organizers')
//         .select('*')
//         .eq('organizer_id', id)
//         .single();
//     if (error) throw error;
//     return organizer;
// };

// // Create a new organizer
// const createOrganizer = async (email, password, name) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     let { data: newOrganizer, error } = await supabase
//         .from('organizers')
//         .insert([{ email, password: hashedPassword, name }])
//         .single();
//     if (error) throw error;
//     return newOrganizer;
// };

// // Update an existing organizer
// const updateOrganizer = async (id, email, password, name) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     let { data: updatedOrganizer, error } = await supabase
//         .from('organizers')
//         .update({ email, password: hashedPassword, name })
//         .eq('organizer_id', id)
//         .single();
//     if (error) throw error;
//     return updatedOrganizer;
// };

// // Delete an existing organizer
// const deleteOrganizer = async (id) => {
//     let { error } = await supabase
//         .from('organizers')
//         .delete()
//         .eq('organizer_id', id);
//     if (error) throw error;
// };

// module.exports = {
//     getAllOrganizers,
//     getOrganizerById,
//     createOrganizer,
//     updateOrganizer,
//     deleteOrganizer
// };


// --Correct the table name to 'students_or_externals' and add the missing comma before 'isstudent'
// CREATE TABLE students_or_externals(
//     students_or_externals_id SERIAL PRIMARY KEY,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     isstudent BOOLEAN,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


const supabase = require('../db');
const bcrypt = require('bcryptjs');


// Get all students
const getAllStudents = async () => {
    let { data: students, error } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('isstudent', true);
    if (error) throw error;
    return students;
};

// Get student by ID
const getStudentById = async (id) => {
    let { data: student, error } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('students_or_externals_id', id)
        .eq('isstudent', true)
        .single();
    if (error) throw error;
    return student;
};

// Create a new student
const createStudent = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: newStudent, error } = await supabase
        .from('students_or_externals')
        .insert([{ email, password: hashedPassword, name, isstudent: true }])
        .single();
    if (error) throw error;
    return newStudent;
};

// Update an existing student
const updateStudent = async (id, email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: updatedStudent, error } = await supabase
        .from('students_or_externals')
        .update({ email, password: hashedPassword, name })
        .eq('students_or_externals_id', id)
        .eq('isstudent', true)
        .single();
    if (error) throw error;
    return updatedStudent;
};


// Delete an existing student
const deleteStudent = async (id) => {
    let { error } = await supabase
        .from('students_or_externals')
        .delete()
        .eq('students_or_externals_id', id)
        .eq('isstudent', true);
    if (error) throw error;
};


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};

// Path: backend/helpers/studentHelpers.js
