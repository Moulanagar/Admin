// src/components/admin/StudentListItem.js
import React, { useState } from 'react';
import { Button, Icon, List, Image, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../../images/student.png';


const StudentListItem = ({ student, onDelete }) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleDelete = () => {
        setOpen(false);
        onDelete(student.students_or_externals_id); // Ensure the correct identifier is used based on your data structure
    };

    return (
        <List.Item>
            <Modal
                size='small'
                open={open}
                onClose={() => setOpen(false)}
                dimmer='blurring'
            >
                <Modal.Header>Delete {student.name}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this student?</p>
                    <p>This action cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpen(false)}>
                        No
                    </Button>
                    <Button positive onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <List.Content floated='right'>
                <Button icon onClick={() => setOpen(true)} color='red'>
                    <Icon name='trash' />
                </Button>
            </List.Content>
            <Image avatar src={studentImage} size='tiny' />
            <List.Content>
                <List.Header as='a' onClick={() => navigate(`/students/details/${student.students_or_externals_id}`)}>{student.name}</List.Header>
                <List.Description>{student.email}</List.Description>
            </List.Content>
        </List.Item>
    );
};

export default StudentListItem;
