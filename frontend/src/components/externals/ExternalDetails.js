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
import externalImage from '../../images/formalman.png';


const ExternalDetails = () => {
    const { id } = useParams();
    const [external, setExternal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExternalDetails = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/externals/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setExternal(data);
            }
            setLoading(false);
        };

        fetchExternalDetails();
    }, [id]);


    if (loading) {
        return (
            <CardDetailPlaceHolder />
        );
    }

    return (

        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>External Details</Header>
            <Divider />
            <Card centered>
                <Image src={externalImage} wrapped ui={false} />
                <CardContent>
                    <CardHeader>{external ? external.name : 'External Name'}</CardHeader>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <CardDescription>{external ? external.email : 'External Email'}</CardDescription>
                            </Grid.Column>
                            <Grid.Column>
                                <Label as='a' color='teal' ribbon='right'>
                                    External
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </CardContent>
                <CardContent extra>
                    <Icon name='time' />
                    {external.created_at && `Joined in ${new Date(new Date(external.created_at).getTime() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
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
}

export default ExternalDetails;
