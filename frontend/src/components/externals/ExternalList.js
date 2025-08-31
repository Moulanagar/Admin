// import React, { useEffect, useState } from 'react';
// import { Button, Loader, Header, Icon, List, Divider } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import ExternalListItem from './ExternalListItem'; // This will be similar to StudentListItem
// import { useScreenSize } from '../../contexts/ScreenSizeContext';

// const ExternalList = () => {
//     const [externals, setExternals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { isMobile } = useScreenSize();

//     useEffect(() => {
//         const fetchExternals = async () => {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/externals`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setExternals(data);
//             } else {
//                 // Handle errors
//             }
//             setLoading(false);
//         };

//         fetchExternals();
//     }, []);

//     const handleDelete = async (id) => {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/externals/${id}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setExternals(externals.filter(external => external.students_or_externals_id !== id)); // Adjust according to your data structure
//         } else {
//             // Handle errors
//         }
//     };

//     if (loading) {
//         return <Loader active>Loading Externals...</Loader>;
//     }

//     return (
//         <div>
//             <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>External</Header>
//             <Divider />
//             <Button primary icon labelPosition='left' as={Link} to='/externals/add'>
//                 <Icon name='user plus' />
//                 Create External
//             </Button>
//             {externals.length > 0 ? (
//                 <List divided animated size={isMobile ? 'large' : 'massive'}>
//                     {externals.map(external => (
//                         <ExternalListItem
//                             key={external.students_or_externals_id} // Adjust according to your data structure
//                             external={external}
//                             onDelete={handleDelete}
//                         />
//                     ))}
//                 </List>
//             ) : (
//                 <Header as='h2' textAlign='center'>
//                     No externals found
//                 </Header>
//             )}
//         </div>
//     );
// };

// export default ExternalList;

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
import ExternalListItem from "./ExternalListItem"; // This will be similar to StudentListItem
import { useScreenSize } from "../../contexts/ScreenSizeContext";

const ExternalList = () => {
  const [externals, setExternals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const fetchExternals = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/externals`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setExternals(data);
        } else {
          // Handle errors
          console.error("Error fetching externals:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching externals:", error);
      }
      setLoading(false);
    };

    fetchExternals();
  }, []);

  const filteredExternals = externals.filter((external) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      external.name.toLowerCase().includes(searchTermLowerCase) ||
      external.email.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/admin/externals/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setExternals(
        externals.filter((external) => external.students_or_externals_id !== id)
      ); // Adjust according to your data structure
    } else {
      // Handle errors
    }
  };

  if (loading) {
    return <Loader active>Loading Externals...</Loader>;
  }

  return (
    <div>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Externals
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
        <Button primary icon labelPosition="left" as={Link} to="/externals/add">
          <Icon name="user plus" />
          Create External
        </Button>
        {!isMobile && (
          <Input
            style={{ float: "right" }}
            icon="search"
            placeholder="Search externals..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <Divider hidden />
      {filteredExternals.length > 0 ? (
        <List divided animated size={isMobile ? "large" : "massive"}>
          {filteredExternals.map((external) => (
            <ExternalListItem
              key={external.students_or_externals_id} // Adjust according to your data structure
              external={external}
              onDelete={handleDelete}
            />
          ))}
        </List>
      ) : (
        <Header as="h2" textAlign="center">
          No externals found
        </Header>
      )}
    </div>
  );
};

export default ExternalList;
