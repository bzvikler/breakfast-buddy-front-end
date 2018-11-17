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

const DropContent = ({ onClose, onLogoutClick }) => (
    <Box pad="small">
        <Link
            to="/account"
            style={{
                ...linkStyle,
                display: 'inline-flex',
            }}
        >
            <Button onClick={onClose}>
                <Box direction="row" gap="medium" align="center" pad="small">
                    <Text>
                        My Account
                    </Text>
                </Box>
            </Button>
        </Link>
        <Button onClick={onLogoutClick}>
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
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        this.toggleDrop();

        this.props.onLogoutClick();
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
                    <Link
                        to="/"
                        style={{
                            ...linkStyle,
                            display: 'inline-flex',
                        }}
                    >
                        <Heading
                            level={3}
                            margin="xsmall"
                            style={{ marginRight: 'auto' }}
                            color="brand"
                        >
                            Breakfast buddy
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
                                dropContent={(
                                    <DropContent
                                        onClose={this.toggleDrop}
                                        onLogoutClick={this.onLogoutClick}
                                    />
                                )}
                                onClick={this.toggleDrop}
                                dropAlign={{ top: 'bottom', right: 'right' }}
                                padding="medium"
                            >
                                <Box direction="row" gap="small" align="center" pad="small">
                                    <Text truncate>
                                        {user.name}
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

DropContent.propTypes = {
    onClose: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
    user: null,
    isGuest: true,
    onLogoutClick: null,
};

Navbar.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
    }),
    isGuest: PropTypes.bool,
    onLogoutClick: PropTypes.func,
};

export default Navbar;
