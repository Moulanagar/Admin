// import React, { useEffect, useState } from 'react';
// import { Button, Loader, Header, Icon, List, Divider } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import StudentListItem from './StudentListItem'; // Assume similar structure to OrganizerListItem
// import { useScreenSize } from '../../contexts/ScreenSizeContext';

// const StudentList = () => {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { isMobile } = useScreenSize();

//     useEffect(() => {
//         const fetchStudents = async () => {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/students`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data); // Ensure the data is as expected
//                 setStudents(data);
//             } else {
//                 // Handle errors
//             }
//             setLoading(false);
//         };

//         fetchStudents();
//     }, []);

//     const handleDelete = async (id) => {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/students/${id}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setStudents(students.filter(student => student.students_or_externals_id !== id));
//         } else {
//             // Handle errors
//         }
//     };

//     if (loading) {
//         return <Loader active>Loading Students...</Loader>;
//     }

//     return (
//         <div>
//             <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Student</Header>
//             <Divider />
//             <Button primary icon labelPosition='left' as={Link} to='/students/add'>
//                 <Icon name='user plus' />
//                 Create Student
//             </Button>
//             {students.length > 0 ? (
//                 <List divided animated size={isMobile ? 'large' : 'massive'}>
//                     {students.map(student => (
//                         <StudentListItem
//                             key={student.students_or_externals_id}
//                             student={student}
//                             onDelete={handleDelete}
//                         />
//                     ))}
//                 </List>
//             ) : (
//                 <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
//                     No students found
//                 </Header>
//             )}
//         </div>
//     );
// };

// export default StudentList;
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
import StudentListItem from "./StudentListItem";
import { useScreenSize } from "../../contexts/ScreenSizeContext";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/students`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          // Handle errors
          console.error("Error fetching students:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchTermLowerCase) ||
      student.email.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/admin/students/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setStudents(students.filter((student) => student.students_or_externals_id !== id));
    } else {
      // Handle errors
    }
  };

  if (loading) {
    return <Loader active>Loading Students...</Loader>;
  }

  // <div
  //   style={{
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //   }}
  // >
  //   <Button primary icon labelPosition="left" as={Link} to="/admins/add">
  //     <Icon name="user plus" />
  //     Create Admin
  //   </Button>
  //   {!isMobile && (
  //     <Input
  //       style={{ float: "right" }}
  //       icon="search"
  //       placeholder="Search admins..."
  //       onChange={(e) => setSearchTerm(e.target.value)}
  //     />
  //   )}
  // </div>;

  return (
    <div>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Students
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
        <Button primary icon labelPosition="left" as={Link} to="/students/add">
          <Icon name="user plus" />
          Create Student
        </Button>
        {!isMobile && (
          <Input
            style={{ float: "right" }}
            icon="search"
            placeholder="Search students..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <Divider hidden />
      {filteredStudents.length > 0 ? (
        <List divided animated size={isMobile ? "large" : "massive"}>
          {filteredStudents.map((student) => (
            <StudentListItem
              key={student.student_id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </List>
      ) : (
        <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
          No students found
        </Header>
      )}
    </div>
  );
};

export default StudentList;
