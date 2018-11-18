import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    Heading,
    Box,
    Tabs,
    Tab,
    Button,
    TextInput,
    FormField,
} from 'grommet';
import { UserFemale, Edit, Checkmark } from 'grommet-icons';

import PulseLoader from '../../common/PulseLoader/PulseLoader';
import {
    asyncGetProfile,
    asyncEditProfile,
} from '../../../store/UserAccount/user-account-actions';
import './UserAccountScreen.css';

class UserAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            name: '',
            username: '',
        };

        this.toggleEdit = this.toggleEdit.bind(this);
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

    render() {
        const {
            username,
            name,
            isEditing,
        } = this.state;

        const {
            profile,
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
                        <Tabs>
                            <Tab title="My Spots">
                                <Box margin="small" pad="large" align="center" background="accent-1">
                                    <Heading>Hey</Heading>
                                </Box>
                            </Tab>
                            <Tab title="My Foods">
                                <Box margin="small" pad="large" align="center" background="accent-2">
                                    <Heading>Hey</Heading>
                                </Box>
                            </Tab>
                            <Tab title="History">
                                <Box margin="small" pad="large" align="center" background="accent-3">
                                    <Heading>Hey</Heading>
                                </Box>
                            </Tab>
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
};

UserAccountScreen.propTypes = {
    profile: PropTypes.shape({
        uid: PropTypes.string,
        username: PropTypes.string,
        password: PropTypes.string,
        name: PropTypes.string,
        img: PropTypes.string,
        favRestaurants: PropTypes.arrayOf(PropTypes.shape({
            rid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
        // empty at first
        favFoods: PropTypes.arrayOf(PropTypes.shape({
            restaurantId: PropTypes.string.isRequired,
            restaurantName: PropTypes.string.isRequired,
            food_type: PropTypes.string.isRequired,
        })),
        // empty at first
        searches: PropTypes.arrayOf(PropTypes.shape({
            restaurantID: PropTypes.string.isRequired,
            restaurantName: PropTypes.string.isRequired,
            faveFood: PropTypes.string.isRequired,
            closeTime: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lon: PropTypes.number.isRequired,
        })),
    }),
};

const mapStateToProps = ({ profile: { profile } }) => ({
    profile,
});

export default connect(mapStateToProps, {
    asyncGetProfile,
    asyncEditProfile,
})(UserAccountScreen);
