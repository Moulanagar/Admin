const supabase = require('../db');
const bcrypt = require('bcryptjs');

// Get all external 
const getAllExternals = async () => {
    let { data: externals, error } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('isstudent', false);
    if (error) throw error;
    return externals;
};

// Get external by ID
const getExternalById = async (id) => {
    let { data: external, error } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('students_or_externals_id', id)
        .eq('isstudent', false)
        .single();
    if (error) throw error;
    return external;
};

// Create a new external
const createExternal = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: newExternal, error } = await supabase
        .from('students_or_externals')
        .insert([{ email, password: hashedPassword, name, isstudent: false }])
        .single();
    if (error) throw error;
    return newExternal;
};

// Update an existing external
const updateExternal = async (id, email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    let { data: updatedExternal, error } = await supabase
        .from('students_or_externals')
        .update({ email, password: hashedPassword, name })
        .eq('students_or_externals_id', id)
        .eq('isstudent', false)
        .single();
    if (error) throw error;
    return updatedExternal;
};


// Delete an existing external
const deleteExternal = async (id) => {
    let { error } = await supabase
        .from('students_or_externals')
        .delete()
        .eq('students_or_externals_id', id)
        .eq('isstudent', false);
    if (error) throw error;
};

module.exports = {
    getAllExternals,
    getExternalById,
    createExternal,
    updateExternal,
    deleteExternal,
};


