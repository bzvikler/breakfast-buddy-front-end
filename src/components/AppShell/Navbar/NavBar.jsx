import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    DropButton,
    Box,
    Heading,
    Button,
    Text,
} from 'grommet';
import { Close } from 'grommet-icons';
import './Navbar.css';

const DropContent = ({ onClose }) => (
    <Box pad="small">
        <Box direction="row" justify="between" align="center">
            <Heading level={3} margin="small">
                Heading
            </Heading>
            <Button icon={<Close />} onClick={onClose} />
        </Box>
        <Text>Content</Text>
    </Box>
);

class Navbar extends Component {
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
        const {
            user,
            isGuest,
        } = this.props;

        return (
            <Box
                pad="medium"
                justify="end"
                align="center"
                direction="row"
                elevation="small"
            >
                {
                    (isGuest || !user) ?
                        (
                            <Link
                                to="/login"
                                href="/login"
                                style={{
                                    textDecoration: 'none',
                                    outline: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <Button>
                                    <Box direction="row" gap="medium" align="center" pad="small">
                                        <Text>
                                            Login
                                        </Text>
                                    </Box>
                                </Button>
                            </Link>
                        ) : (
                            <DropButton
                                open={this.state.dropOpen}
                                onClose={this.toggleDrop}
                                dropContent={<DropContent onClose={this.toggleDrop} />}
                                onClick={this.toggleDrop}
                                dropAlign={{ top: 'bottom', right: 'right' }}
                                padding="medium"
                            >
                                <Box direction="row" gap="medium" align="center" pad="small">
                                    <Text>
                                        Welcome
                                    </Text>
                                </Box>
                            </DropButton>
                        )
                }
            </Box>
        );
    }
}

DropContent.defaultProps = {
    onClose: null,
};

DropContent.propTypes = {
    onClose: PropTypes.func,
};

Navbar.defaultProps = {
    user: null,
    isGuest: true,
};

Navbar.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
    }),
    isGuest: PropTypes.bool,
};

export default Navbar;
