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
