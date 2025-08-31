import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrganizer = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Consider security implications of handling passwords
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrganizer = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/organizers/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({ name: data.name, email: data.email });
            }
        };

        fetchOrganizer();
    }, [id]);

    const handleChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    const handleSubmit = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/organizers/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            navigate('/organizers');
        } else {
            alert('Failed to update organizer');
        }
    };

    return (
        <Container>
            <Header as='h2'>Edit Organizer</Header>
            <Form onSubmit={handleSubmit}>
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
                <Button type='submit' primary>Update Organizer</Button>
            </Form>
        </Container>
    );
};

export default EditOrganizer;
