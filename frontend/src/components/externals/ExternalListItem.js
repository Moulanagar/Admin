import React, { useState } from 'react';
import { Button, Icon, List, Image, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import externalImage from '../../images/formalman.png';

const ExternalListItem = ({ external, onDelete }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        setOpen(false);
        onDelete(external.students_or_externals_id); // Adjust according to your data structure
    };

    return (
        <List.Item>
            <Modal
                size='small'
                open={open}
                onClose={() => setOpen(false)}
                dimmer='blurring'
            >
                <Modal.Header>Delete {external.name}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this external?</p>
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
            <Image avatar src={externalImage} size='tiny' /> {/* Placeholder image */}
            <List.Content>
                <List.Header as='a' onClick={() => navigate(`/externals/details/${external.students_or_externals_id}`)}>{external.name}</List.Header>
                <List.Description>{external.email}</List.Description>
            </List.Content>
        </List.Item>
    );
};

export default ExternalListItem;
