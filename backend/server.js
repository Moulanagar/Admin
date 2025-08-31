const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');;
const adminAuthRoutes = require('./routes/adminAuthRoutes'); // Import the admin routes
const organizerRoutes = require('./routes/organizerRoutes'); // Import the manager routes
const studentRoutes = require('./routes/studentRoutes'); // Import the student routes
const externalRoutes = require('./routes/externalRoutes'); // Import the external routes
const adminRoutes = require('./routes/adminRoutes'); // Import the admin routes
const app = express();
require("dotenv").config();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(cookieParser());

app.use('/api/admin/auth', adminAuthRoutes); // Mount the admin routes with prefix /api/admin
app.use('/api/admin/organizers', organizerRoutes); // Mount the manager routes with prefix /api/organizers
app.use('/api/admin/students', studentRoutes); // Mount the student routes with prefix /api/students
app.use('/api/admin/externals', externalRoutes); // Mount the external routes with prefix /api/externals
app.use('/api/admin/admins', adminRoutes); // Mount the admin routes with prefix /api/admins


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
