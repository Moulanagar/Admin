import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Container,
    Header,
    Divider,
    Label,
    Grid,

} from 'semantic-ui-react';
import CardDetailPlaceHolder from '../layout/CardDetailPlaceHolder';

const OrganizerDetails = () => {
    const { id } = useParams();
    const [organizer, setOrganizer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizerDetails = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/organizers/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setOrganizer(data);
            }
            setLoading(false);
        };

        fetchOrganizerDetails();
    }, [id]);

    if (loading) {
        return (
            <CardDetailPlaceHolder />
        );
    }

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Organizer Details</Header>
            <Divider />
            <Card centered>
                <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={true} />
                <CardContent>
                    <CardHeader>{organizer ? organizer.name : 'Organizer Name'}</CardHeader>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <CardDescription>{organizer ? organizer.email : 'Organizer Email'}</CardDescription>
                            </Grid.Column>
                            <Grid.Column>
                                <Label as='a' color='teal' ribbon='right'>
                                    Organizer
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </CardContent>
                <CardContent extra>
                    <Icon name='time' />
                    {organizer.created_at && `Joined in ${new Date(new Date(organizer.created_at).getTime() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}`}
                </CardContent>
            </Card>
        </Container>
    );
};

export default OrganizerDetails;
