// import React, { useEffect, useState } from 'react';
// import { Button, Table, Loader, Header, Divider } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import OrganizerListItem from './OrganizerListItem';
// import { Icon, List } from 'semantic-ui-react';
// import { useScreenSize } from '../../contexts/ScreenSizeContext';

// const OrganizerList = () => {
//     const [organizers, setOrganizers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Use mobile screen size context to determine the size of the menu
//     const { isMobile } = useScreenSize();

//     useEffect(() => {
//         const fetchOrganizers = async () => {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/organizers`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setOrganizers(data);
//             } else {
//                 // Handle errors here, e.g., showing a message to the user
//             }
//             // Set loading to false after two seconds for demonstration purposes
//             // setTimeout(() => {
//             //     setLoading(false);
//             // }
//             //     , 2000);

//             setLoading(false);
//         };

//         fetchOrganizers();
//     }, []);


//     const handleDelete = async (id) => {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/organizers/${id}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             // Remove the organizer from the list
//             console.log('Organizer deleted');
//             console.log(id);
//             console.log(organizers.filter(organizer => organizer.organizer_id !== id));
//             setOrganizers(organizers.filter(organizer => organizer.organizer_id !== id));
//         } else {
//             // Handle errors here, e.g., show a message to the user
//         }
//     }


//     if (loading) {
//         return <Loader active>Loading Organizers...</Loader>;
//     }

//     return (
//         <div>
//             <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Organizers</Header>
//             <Divider />
//             <Button primary icon labelPosition='left' as={Link} to='/organizers/add'>
//                 <Icon name='user plus' />
//                 Create Organizer
//             </Button>
//             {organizers.length > 0 ? (
//                 <List divided animated size={isMobile ? 'large' : 'massive'}>
//                     {organizers.map(organizer => (
//                         <OrganizerListItem
//                             key={organizer.organizer_id}
//                             organizer={organizer}
//                             onDelete={handleDelete}
//                         />
//                     ))}
//                 </List>
//             ) : (
//                 <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
//                     No organizers found
//                 </Header>
//             )}
//         </div>
//     );
// };

// export default OrganizerList;


import React, { useEffect, useState } from "react";
import {
  Button,
  Loader,
  Header,
  Divider,
  Input,
  List,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import OrganizerListItem from "./OrganizerListItem";
import { useScreenSize } from "../../contexts/ScreenSizeContext";

const OrganizerList = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Use mobile screen size context to determine the size of the menu
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/organizers`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOrganizers(data);
        } else {
          // Handle errors here, e.g., showing a message to the user
          console.error("Error fetching organizers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching organizers:", error);
      }
      setLoading(false);
    };

    fetchOrganizers();
  }, []);

  // Filter organizers based on search term
  const filteredOrganizers = organizers.filter((organizer) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      organizer.name.toLowerCase().includes(searchTermLowerCase) ||
      organizer.email.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/admin/organizers/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      // Remove the organizer from the list
      setOrganizers(
        organizers.filter((organizer) => organizer.organizer_id !== id)
      );
    } else {
      // Handle errors here, e.g., show a message to the user
    }
  };

  if (loading) {
    return <Loader active>Loading Organizers...</Loader>;
  }

  return (
    <div>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Organizers
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
        <Button primary icon labelPosition="left" as={Link} to="/organizers/add">
          <Icon name="user plus" />
          Create Organizer
        </Button>
        {!isMobile && (
          <Input
            style={{ float: "right" }}
            icon="search"
            placeholder="Search organizers..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <Divider hidden />
      {filteredOrganizers.length > 0 ? (
        <List divided animated size={isMobile ? "large" : "massive"}>
          {filteredOrganizers.map((organizer) => (
            <OrganizerListItem
              key={organizer.organizer_id}
              organizer={organizer}
              onDelete={handleDelete}
            />
          ))}
        </List>
      ) : (
        <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
          No organizers found
        </Header>
      )}
    </div>
  );
};

export default OrganizerList;
