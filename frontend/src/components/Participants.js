import React from 'react';
import { Header, Divider, Dropdown, Icon, HeaderContent } from 'semantic-ui-react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const friendOptions = [
    {
        key: 1,
        text: 'Jenny Hess',
        value: 'Jenny Hess',
        // image: { avatar: true, src: logo }, // Directly use logo here
    },
    {
        key: 2,
        text: 'Elliot Fu',
        value: 'Elliot Fu',
        // image: { avatar: true, src: logo },
    },
    {
        key: 3, // Corrected the key to be unique
        text: 'Stevie Feliciano',
        value: 'Stevie Feliciano',
        // image: { avatar: true, src: logo },
    },
    {
        key: 4,
        text: 'Christian',
        value: 'Christian',
        // image: { avatar: true, src: logo },
    },
];



export default function Participants() {
    return (
        <div>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                Participants
                <Header as='h3' textAlign='center' centered>
                    <Icon name='calendar' />
                    <HeaderContent centered >
                        Show me participants of {' '}

                        <Dropdown
                            align='right'
                            inline
                            search
                            style={{ color: '#2185d0' }}
                            searchInput={{ icon: 'search', iconPosition: 'left' }}
                            options={friendOptions}
                            defaultValue={friendOptions[0].value}
                        />

                    </HeaderContent>
                </Header>
            </Header>
            <Divider />

        </div>
    );
}
