import React, { useState } from 'react';
import { Button, Form, Container, Header, Dimmer, Loader, Segment } from 'semantic-ui-react'; // Import Dimmer and Loader components
import { useNavigate } from 'react-router-dom';

const AddOrganizer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false); // Introduce loading state
    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    const handleSubmit = async () => {
        setLoading(true); // Set loading state to true when form is submitted
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/organizers`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        setLoading(false); // Set loading state to false after receiving the response

        if (response.ok) {
            navigate('/organizers');
        } else {
            alert('Failed to create organizer');
        }
    };

    return (
        <Container> {/* Use loading prop on Container component */}

            <Header as='h2' textAlign='center' >Add New Organizer</Header>
            <Segment>
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Form.Input
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Organizer's Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Organizer's Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Organizer's Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button type='submit' primary>Add Organizer</Button>

                </Form>
            </Segment>
        </Container>
    );
};

export default AddOrganizer;
