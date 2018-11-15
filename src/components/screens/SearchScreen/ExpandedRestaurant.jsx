import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    Box,
    Button,
} from 'grommet';
import { LinkPrevious } from 'grommet-icons';

class ExpandedRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            onClose,
        } = this.props;

        return (
            <Box
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    height: '100%',
                    width: '100%',
                }}
                background={{
                    color: 'white',
                }}
            >
                <Button
                    alignSelf="start"
                    icon={<LinkPrevious />}
                    onClick={onClose}
                />
                <h1>Expanded</h1>
            </Box>
        );
    }
}

ExpandedRestaurant.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ExpandedRestaurant;
