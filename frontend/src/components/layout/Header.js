import React, { useState, useEffect } from "react";
import { Container, Menu, Icon, Dropdown, Image } from "semantic-ui-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext"; // Assuming this is implemented
import logo from "../../images/logo.png";

const AdminHeader = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useScreenSize(); // Utilizing the screen size context
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Update the active item based on the URL path
    const path = location.pathname.split("/")[1];
    setActiveItem(path || "dashboard");
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Container textAlign="center" style={{ margin: "20px 0" }}>
      <Menu size={!isMobile && "massive"}>
        {currentUser && isMobile && (
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/dashboard"
                active={activeItem === "dashboard"}
              >
                <Icon name="dashboard" /> Dashboard
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/admins"
                active={activeItem === "admins"}
              >
                <Icon name="user secret" /> Admins
              </Dropdown.Item>
              {/* <Dropdown.Item as={Link} to="/events" active={activeItem === 'events'}>
                                <Icon name='calendar' /> Events
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/participants" active={activeItem === 'participants'}>
                                <Icon name='users' /> Participants
                            </Dropdown.Item> */}
              <Dropdown.Item
                as={Link}
                to="/organizers"
                active={activeItem === "organizers"}
              >
                <Icon name="users" /> Organizers
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/students"
                active={activeItem === "students"}
              >
                <Icon name="student" /> Students
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/externals"
                active={activeItem === "externals"}
              >
                <Icon name="university" /> Externals
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Menu.Item as={Link} to="https://pentagondbms.github.io/UniveristyFest/">
          <Image
            src={logo}
            alt="logo"
            size="mini"
            style={{ marginRight: "1.5em" }}
          />
        </Menu.Item>
        {currentUser && !isMobile && (
          <>
            <Menu.Item
              as={Link}
              to="/dashboard"
              name="dashboard"
              active={activeItem === "dashboard"}
            >
              <Icon name="dashboard" /> Dashboard
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/admins"
              name="admins"
              active={activeItem === "admins"}
            >
              <Icon name="user secret" /> Admins
            </Menu.Item>
            {/* <Menu.Item as={Link} to="/events" name='events' active={activeItem === 'events'}>
                            <Icon name='calendar' /> Events
                        </Menu.Item>
                        <Menu.Item as={Link} to="/participants" name='participants' active={activeItem === 'participants'}>
                            <Icon name='users' /> Participants
                        </Menu.Item> */}
            <Menu.Item
              as={Link}
              to="/organizers"
              name="organizers"
              active={activeItem === "organizers"}
            >
              <Icon name="users" /> Organizers
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/students"
              name="students"
              active={activeItem === "students"}
            >
              <Icon name="student" /> Students
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/externals"
              name="externals"
              active={activeItem === "externals"}
            >
              <Icon name="university" /> Externals
            </Menu.Item>
          </>
        )}
        {!currentUser && (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeItem === "login"}
            >
              <Icon name="sign in" /> Login
            </Menu.Item>
           
          </Menu.Menu>
        )}
        {currentUser && (
          <Menu.Item position="right" onClick={handleLogout}>
            <Icon name="sign out" /> Logout
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
};

export default AdminHeader;
