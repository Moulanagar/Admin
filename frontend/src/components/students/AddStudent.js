import React, { useState } from 'react';
import { Button, Form, Container, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    const handleSubmit = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/students`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        setLoading(false);

        if (response.ok) {
            navigate('/students');
        } else {
            alert('Failed to create student');
        }
    };

    return (
        <Container>
            <Header as='h2' textAlign='center' >Add New Student</Header>
            <Segment>
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Form.Input
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Student's Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Student's Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create a Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button type='submit' primary>Add Student</Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default AddStudent;
