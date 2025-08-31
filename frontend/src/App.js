import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { useAuth } from './contexts/AuthContext';
import AdminHeader from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingPage from './components/layout/LoadingPage';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Updated imports for Organizer components
import Dashboard from './components/admin/Dashboard';
import Events from './components/admin/Events';
import Participants from './components/Participants';

// Updated imports for Organizer components
import OrganizerList from './components/organizers/OrginizerList';
import AddOrganizer from './components/organizers/AddOrginizer';
// import EditOrganizer from './components/organizers/EditOrginizer';
import OrganizerDetails from './components/organizers/OrganizerDetails';

import AddStudent from './components/students/AddStudent';
import StudentList from './components/students/StudentList';
import StudentDetails from './components/students/StudentDetails';

import ExternalList from './components/externals/ExternalList';
import AddExternal from './components/externals/AddExternal';
import ExternalDetails from './components/externals/ExternalDetails';

import AddAdmin from './components/admin/AddAdmin';
import AdminList from './components/admin/AdminList';
import AdminDetails from './components/admin/AdminDetails';

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      <AdminHeader />
      <Container style={{ paddingTop: '20px', paddingBottom: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />

          <Route path="/events" element={currentUser ? <Events /> : <Navigate to="/login" />} />
          {/* <Route path="/participants" element={currentUser ? <Participants /> : <Navigate to="/login" />} /> */}
          <Route path="/organizers" element={currentUser ? <OrganizerList /> : <Navigate to="/login" />} />
          <Route path="/organizers/add" element={currentUser ? <AddOrganizer /> : <Navigate to="/login" />} />
          {/* <Route path="/organizers/edit/:id" element={currentUser ? <EditOrganizer /> : <Navigate to="/login" />} /> */}
          <Route path="/organizers/details/:id" element={currentUser ? <OrganizerDetails /> : <Navigate to="/login" />} />

          <Route path="/students" element={currentUser ? <StudentList /> : <Navigate to="/login" />} />
          <Route path="/students/add" element={currentUser ? <AddStudent /> : <Navigate to="/login" />} />
          <Route path="/students/details/:id" element={currentUser ? <StudentDetails /> : <Navigate to="/login" />} />

          <Route path="/externals" element={currentUser ? <ExternalList /> : <Navigate to="/login" />} />
          <Route path="/externals/add" element={currentUser ? <AddExternal /> : <Navigate to="/login" />} />
          <Route path="/externals/details/:id" element={currentUser ? <ExternalDetails /> : <Navigate to="/login" />} />

          <Route path="/admins" element={currentUser ? <AdminList /> : <Navigate to="/login" />} />
          <Route path="/admins/add" element={currentUser ? <AddAdmin /> : <Navigate to="/login" />} />
          <Route path="/admins/details/:id" element={currentUser ? <AdminDetails /> : <Navigate to="/login" />} />


          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};


export default App;
