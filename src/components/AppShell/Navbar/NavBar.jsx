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
import { FormDown } from 'grommet-icons';
import './Navbar.css';

const linkStyle = {
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
};

const DropContent = ({ onClose }) => (
    <Box pad="small">
        <Button>
            <Box direction="row" gap="medium" align="center" pad="small">
                <Text>
                    My Account
                </Text>
            </Box>
        </Button>
        <Button>
            <Box direction="row" gap="medium" align="center" pad="small">
                <Text>
                    Logout
                </Text>
            </Box>
        </Button>
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
                style={{ zIndex: 1 }}
            >
                <Box basis="full">
                    <Link to="/" style={linkStyle}>
                        <Heading
                            level={3}
                            margin="xsmall"
                            style={{ marginRight: 'auto' }}
                        >
                            Bb
                        </Heading>
                    </Link>
                </Box>
                {
                    (isGuest || !user) ?
                        (
                            <Link
                                to="/login"
                                href="/login"
                                style={linkStyle}
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
                                    <Text truncate>
                                        {`Welcome, ${user.name}`}
                                    </Text>
                                    <FormDown />
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
        name: PropTypes.string,
    }),
    isGuest: PropTypes.bool,
};

export default Navbar;
