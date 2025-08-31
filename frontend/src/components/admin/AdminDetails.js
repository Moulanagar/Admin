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
import adminImage from '../../images/tom.jpg';

const AdminDetails = () => {
    const { id } = useParams();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/admins/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setAdmin(data);
            }
            setLoading(false);
        };

        fetchAdminDetails();
    }, [id]);

    if (loading) {
        return (
            <CardDetailPlaceHolder />
        );
    }

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Admin Details</Header>
            <Divider />
            <Card centered>
                <Image src={adminImage} wrapped ui={false} />
                <CardContent>
                    <CardHeader>{admin ? admin.name : 'Admin Name'}</CardHeader>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <CardDescription>{admin ? admin.email : 'Admin Email'}</CardDescription>
                            </Grid.Column>
                            <Grid.Column>
                                <Label as='a' color='orange' ribbon='right'>
                                    Admin
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </CardContent>
                <CardContent extra>
                    <Icon name='time' />
                    {admin.created_at && `Joined in ${new Date(new Date(admin.created_at).getTime() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
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

export default AdminDetails;
