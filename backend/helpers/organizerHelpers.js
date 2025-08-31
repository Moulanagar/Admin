const supabase = require('../db');
const bcrypt = require('bcryptjs');



// Get all organizers
const getAllOrganizers = async () => {
    let { data: organizers, error } = await supabase
        .from('organizers')
        .select('*');
    if (error) throw error;
    return organizers;
};

// Get organizer by ID
const getOrganizerById = async (id) => {
    let { data: organizer, error } = await supabase
        .from('organizers')
        .select('*')
        .eq('organizer_id', id)
        .single();
    if (error) throw error;
    return organizer;
};

// Create a new organizer
const createOrganizer = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: newOrganizer, error } = await supabase
        .from('organizers')
        .insert([{ email, password: hashedPassword, name }])
        .single();
    if (error) throw error;
    return newOrganizer;
};

// Update an existing organizer
const updateOrganizer = async (id, email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: updatedOrganizer, error } = await supabase
        .from('organizers')
        .update({ email, password: hashedPassword, name })
        .eq('organizer_id', id)
        .single();
    if (error) throw error;
    return updatedOrganizer;
};

// Delete an existing organizer
const deleteOrganizer = async (id) => {
    let { error } = await supabase
        .from('organizers')
        .delete()
        .eq('organizer_id', id);
    if (error) throw error;
};

module.exports = {
    getAllOrganizers,
    getOrganizerById,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
};
