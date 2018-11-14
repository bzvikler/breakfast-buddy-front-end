import React, { Component } from 'react';
import {
    Box,
    Heading,
} from 'grommet';
import CenteredMarkerMap from './CenteredMarkerMap';

class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropOpen: false,
        };

        this.toggleDrop = this.toggleDrop.bind(this);
    }

    toggleDrop() {
        this.setState(prevState => ({
            ...prevState,
            dropOpen: !prevState.dropOpen,
        }));
    }

    render() {
        return (
            <Box
                direction="column"
                basis="full"
            >
                <Box
                    basis="1/2"
                >
                    <CenteredMarkerMap
                        onDragStart={() => console.log('started')}
                        onDragEnd={event => console.log(event)}
                    />
                </Box>
                <Box
                    basis="1/2"
                >
                    <Heading>List</Heading>
                </Box>
            </Box>
        );
    }
}

export default SearchScreen;
