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

// CREATE TABLE db_admins(
//     admin_id SERIAL PRIMARY KEY,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

const supabase = require('../db');
const bcrypt = require('bcryptjs');


// Get all admins
const getAllAdmins = async () => {
    let { data: admins, error } = await supabase
        .from('db_admins')
        .select('*');
    if (error) throw error;
    return admins;
};

// Get admin by ID
const getAdminById = async (id) => {
    let { data: admin, error } = await supabase
        .from('db_admins')
        .select('*')
        .eq('admin_id', id)
        .single();
    if (error) throw error;
    return admin;
};

// Create a new admin
const createAdmin = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: newAdmin, error } = await supabase
        .from('db_admins')
        .insert([{ email, password: hashedPassword, name }])
        .single();
    if (error) throw error;
    return newAdmin;
};

// Update an existing admin
const updateAdmin = async (id, email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: updatedAdmin, error } = await supabase
        .from('db_admins')
        .update({ email, password: hashedPassword, name })
        .eq('admin_id', id)
        .single();
    if (error) throw error;
    return updatedAdmin;
};

// Delete an existing admin
const deleteAdmin = async (id) => {
    let { error } = await supabase
        .from('db_admins')
        .delete()
        .eq('admin_id', id);
    if (error) throw error;
};


module.exports = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
};