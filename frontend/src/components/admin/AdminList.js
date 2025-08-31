// import React, { useEffect, useState } from 'react';
// import { Button, Loader, Header, Icon, List, Divider } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import AdminListItem from './AdminListItem'; // This will be similar to StudentListItem
// import { useScreenSize } from '../../contexts/ScreenSizeContext';

// const AdminList = () => {
//     const [admins, setAdmins] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { isMobile } = useScreenSize();

//     useEffect(() => {
//         const fetchAdmins = async () => {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/admins`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setAdmins(data);
//             } else {
//                 // Handle errors
//             }
//             setLoading(false);
//         };

//         fetchAdmins();
//     }, []);

//     const handleDelete = async (id) => {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/admins/${id}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setAdmins(admins.filter(admin => admin.admin_id !== id)); // Adjust the property if needed
//         } else {
//             // Handle errors
//         }
//     };

//     if (loading) {
//         return <Loader active>Loading Admins...</Loader>;
//     }

//     return (
//         <div>
//             <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Admins</Header>
//             <Divider />
//             <Button primary icon labelPosition='left' as={Link} to='/admins/add'>
//                 <Icon name='user plus' />
//                 Create Admin
//             </Button>
//             {admins.length > 0 ? (
//                 <List divided animated size={isMobile ? 'large' : 'massive'}>
//                     {admins.map(admin => (
//                         <AdminListItem
//                             key={admin.admin_id} // Adjust the property if needed
//                             admin={admin}
//                             onDelete={handleDelete}
//                         />
//                     ))}
//                 </List>
//             ) : (
//                 <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
//                     No admins found
//                 </Header>
//             )}
//         </div>
//     );
// };

// export default AdminList;

import React, { useEffect, useState } from "react";
import {
  Button,
  Loader,
  Header,
  Icon,
  List,
  Divider,
  Input,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import AdminListItem from "./AdminListItem"; // This will be similar to StudentListItem
import { useScreenSize } from "../../contexts/ScreenSizeContext";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/admins`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        } else {
          // Handle errors
          console.error("Error fetching admins:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
      setLoading(false);
    };

    fetchAdmins();
  }, []);

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      admin.name.toLowerCase().includes(searchTermLowerCase) ||
      admin.email.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/admin/admins/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setAdmins(admins.filter((admin) => admin.admin_id !== id)); // Adjust the property if needed
    } else {
      // Handle errors
    }
  };

  if (loading) {
    return <Loader active>Loading Admins...</Loader>;
  }

  // <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
  //                 Events
  //             </Header>
  //             <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //                 <Button primary icon labelPosition='left' as={Link} to='/events/add'>
  //                     <Icon name='calendar plus' />
  //                     Create Event
  //                 </Button>
  //                 {!isMobile && (
  //                     <Input
  //                         icon='search'
  //                         placeholder='Search events...'
  //                         onChange={e => setSearchTerm(e.target.value)}
  //                     />
  //                 )}
  //

  return (
    <div>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Admins
      </Header>
      <Divider />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button primary icon labelPosition="left" as={Link} to="/admins/add">
          <Icon name="user plus" />
          Create Admin
        </Button>
        {!isMobile && (
          <Input
            style={{ float: "right" }}
            icon="search"
            placeholder="Search admins..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <Divider hidden />
      {filteredAdmins.length > 0 ? (
        <List divided animated size={isMobile ? "large" : "massive"}>
          {filteredAdmins.map((admin) => (
            <AdminListItem
              key={admin.admin_id} // Adjust the property if needed
              admin={admin}
              onDelete={handleDelete}
            />
          ))}
        </List>
      ) : (
        <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
          No admins found
        </Header>
      )}
    </div>
  );
};

export default AdminList;
