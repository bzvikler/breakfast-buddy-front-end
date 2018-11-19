import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Heading,
    Box,
    Tabs,
    Tab,
    Button,
    TextInput,
    FormField,
    Text,
} from 'grommet';
import {
    UserFemale,
    Edit,
    Checkmark,
    Close,
} from 'grommet-icons';

import PulseLoader from '../../common/PulseLoader/PulseLoader';
import {
    asyncGetProfile,
    asyncEditProfile,
} from '../../../store/UserAccount/user-account-actions';
import './UserAccountScreen.css';

const linkStyle = {
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
};

class UserAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            name: '',
            username: '',
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        this.props.asyncGetProfile();
    }

    onNameChange(name) {
        this.setState(prevState => ({
            ...prevState,
            name,
        }));
    }

    onUsernameChange(username) {
        this.setState(prevState => ({
            ...prevState,
            username,
        }));
    }

    toggleEdit() {
        if (this.state.isEditing) {
            this.props.asyncEditProfile({
                name: this.state.name,
                username: this.state.username,
            });
        }

        this.setState(prevState => ({
            ...prevState,
            isEditing: !prevState.isEditing,
        }));
    }

    cancelEdit() {
        this.setState(prevState => ({
            ...prevState,
            isEditing: false,
        }));
    }

    render() {
        const {
            username,
            name,
            isEditing,
        } = this.state;

        const {
            profile,
            user,
        } = this.props;

        return (
            profile ? (
                <Box
                    basis="full"
                    style={{ position: 'relative' }}
                >
                    <Button
                        plain
                        margin={{ left: 'auto' }}
                        onClick={this.toggleEdit}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                        }}
                        size="small"
                    >
                        <Box
                            elevation="small"
                            align="center"
                            justify="center"
                            style={{
                                borderRadius: '50%',
                                display: 'inline-flex',
                            }}
                            pad="medium"
                        >
                            {
                                isEditing ? <Checkmark /> : <Edit />
                            }
                        </Box>
                    </Button>
                    {
                        isEditing && (
                            <Button
                                plain
                                margin={{ left: 'auto' }}
                                onClick={this.cancelEdit}
                                style={{
                                    position: 'absolute',
                                    top: '72px',
                                    right: '12px',
                                }}
                                size="small"
                            >
                                <Box
                                    elevation="small"
                                    align="center"
                                    justify="center"
                                    style={{
                                        borderRadius: '50%',
                                        display: 'inline-flex',
                                    }}
                                    pad="medium"
                                >
                                    <Close />
                                </Box>
                            </Button>
                        )
                    }
                    <Heading
                        size="large"
                        alignSelf="center"
                    >
                        {profile.name}
                    </Heading>
                    {
                        !isEditing && (
                            <Box
                                alignSelf="center"
                                background={{ color: '#f7f7f7' }}
                                pad="large"
                                round="50%"
                                height="300px"
                                width="180px"
                                align="center"
                                justify="center"
                            >
                                <UserFemale size="xlarge" />
                            </Box>
                        )
                    }
                    <Heading
                        size="medium"
                        alignSelf="center"
                    >
                        {profile.username}
                    </Heading>
                    {
                        isEditing && (
                            <Box
                                height="430px"
                            >
                                <FormField
                                    label="Edit Name"
                                    htmlFor="edit-name"
                                    margin={{ bottom: 'large' }}
                                    {...this.props}
                                >
                                    <TextInput
                                        id="edit-name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={event => (
                                            this.onNameChange(event.target.value)
                                        )}
                                        onSelect={this.onSelect}
                                    />
                                </FormField>
                                <FormField
                                    label="Edit Username"
                                    htmlFor="edit-username"
                                    margin={{ bottom: 'large' }}
                                    {...this.props}
                                >
                                    <TextInput
                                        id="edit-username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={event => (
                                            this.onUsernameChange(event.target.value)
                                        )}
                                        onSelect={this.onSelect}
                                    />
                                </FormField>
                            </Box>
                        )
                    }
                    <Box
                        basis="full"
                        margin={{ top: 'auto' }}
                    >
                        <Tabs basis="full">
                            <Tab title={user.owner ? 'My Restaurants' : 'My Spots'}>
                                <Box margin="small" pad="medium">
                                    {
                                        profile.restaurants.map(restaurant => (
                                            <Link
                                                to={`restaurant/${restaurant.rid}`}
                                                key={restaurant.rid}
                                                style={linkStyle}
                                            >
                                                <Box
                                                    margin={{ bottom: 'small' }}
                                                    border="bottom"
                                                    justify="center"
                                                >
                                                    <Text>{restaurant.name}</Text>
                                                </Box>
                                            </Link>
                                        ))
                                    }
                                    {
                                        user.owner && (
                                            <Box align="center">
                                                <Link
                                                    to="/account/add-restaurant"
                                                    style={linkStyle}
                                                >
                                                    <Button label="Add Restaurant" primary />
                                                </Link>
                                            </Box>
                                        )
                                    }
                                </Box>
                            </Tab>
                            {
                                !user.owner && (
                                    <Tab title="My Foods">
                                        <Box margin="small" pad="medium">
                                            {
                                                profile.favFoods.map(food => (
                                                    <Link
                                                        to={`restaurant/${food.restaurantId}`}
                                                        key={food.restaurantId}
                                                        style={linkStyle}
                                                    >
                                                        <Box
                                                            margin={{ bottom: 'small' }}
                                                            border="bottom"
                                                            justify="center"
                                                        >
                                                            <Text>{`${food.food_type[0].toUpperCase()}${food.food_type.slice(1)} at ${food.restaurantName}`}</Text>
                                                        </Box>
                                                    </Link>
                                                ))
                                            }
                                        </Box>
                                    </Tab>
                                )
                            }
                            {
                                !user.owner && (
                                    <Tab title="History">
                                        <Box margin="small" pad="medium">
                                            {
                                                profile.searches.map(search => (
                                                    <Box
                                                        key={search.sid}
                                                        margin={{ bottom: 'small' }}
                                                        border="bottom"
                                                        justify="center"
                                                    >
                                                        <Text>{`at ${search.time} on ${search.day} around ${search.street} in ${search.city}`}</Text>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Tab>
                                )
                            }
                        </Tabs>
                    </Box>
                </Box>
            ) : (
                    <Box basis="full" justify="center" align="center">
                        <PulseLoader color="brand" />
                    </Box>
                )
        );
    }
}

UserAccountScreen.defaultProps = {
    profile: null,
    user: null,
};

UserAccountScreen.propTypes = {
    profile: PropTypes.shape({
        uid: PropTypes.string,
        username: PropTypes.string,
        password: PropTypes.string,
        name: PropTypes.string,
        img: PropTypes.string,
        restaurants: PropTypes.arrayOf(PropTypes.shape({
            rid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
        favFoods: PropTypes.arrayOf(PropTypes.shape({
            restaurantId: PropTypes.string.isRequired,
            restaurantName: PropTypes.string.isRequired,
            food_type: PropTypes.string.isRequired,
        })),
        searches: PropTypes.arrayOf(PropTypes.shape({
            sid: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            day: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })),
    }),
    user: PropTypes.shape({
        owner: PropTypes.bool,
    }),
};

const mapStateToProps = ({
    profile: { profile },
    login: { user },
}) => ({
    profile,
    user,
});

export default connect(mapStateToProps, {
    asyncGetProfile,
    asyncEditProfile,
})(UserAccountScreen);
