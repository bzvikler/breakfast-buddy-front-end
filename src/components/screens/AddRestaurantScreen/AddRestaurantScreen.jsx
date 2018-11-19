import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
    Box,
    Heading,
    FormField,
    TextInput,
    Button,
    Text,
} from 'grommet';

import { asyncAddRestaurant } from '../../../store/UserAccount/user-account-actions';
import PulseLoader from '../../common/PulseLoader/PulseLoader';


class AddRestaurantScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            streetName: '',
            streetNumber: '',
            city: '',
            postalCode: '',
        };

        this.onRestaurantNameChange = this.onRestaurantNameChange.bind(this);
        this.onStreetNumberChange = this.onStreetNumberChange.bind(this);
        this.onStreetNameChange = this.onStreetNameChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onPostalCodeChange = this.onPostalCodeChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onRestaurantNameChange(restaurantName) {
        this.setState(prevState => ({
            ...prevState,
            restaurantName,
        }));
    }

    onStreetNumberChange(streetNumber) {
        this.setState(prevState => ({
            ...prevState,
            streetNumber,
        }));
    }

    onStreetNameChange(streetName) {
        this.setState(prevState => ({
            ...prevState,
            streetName,
        }));
    }

    onCityChange(city) {
        this.setState(prevState => ({
            ...prevState,
            city,
        }));
    }

    onPostalCodeChange(postalCode) {
        this.setState(prevState => ({
            ...prevState,
            postalCode,
        }));
    }

    onAdd() {
        this.props.asyncAddRestaurant(this.state, this.props.history);
    }

    render() {
        const {
            restaurantName,
            streetName,
            streetNumber,
            city,
            postalCode,
        } = this.state;

        const { loggingIn, user } = this.props;

        return (
            <Box
                basis="full"
            >
                <Box
                    round="small"
                    elevation="small"
                    pad={{
                        top: 'medium',
                        bottom: 'medium',
                        left: 'large',
                        right: 'large',
                    }}
                    margin={{ top: 'xlarge', right: 'large', left: 'large' }}
                    direction="column"
                    background={{ color: 'white' }}
                >
                    <Heading
                        level={1}
                        size="small"
                        margin={{ bottom: 'large', top: 'large', left: 'small' }}
                    >
                        Add Restaurant
                    </Heading>
                    <FormField
                        label="Restaurant Name"
                        htmlFor="restaurant-name"
                        margin={{ bottom: 'medium' }}
                        {...this.props}
                    >
                        <TextInput
                            id="restaurant-name"
                            placeholder="Enter name"
                            value={restaurantName}
                            onChange={event => this.onRestaurantNameChange(event.target.value)}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <FormField
                        label="Street Number"
                        htmlFor="street-number"
                        margin={{ bottom: 'medium' }}
                        {...this.props}
                    >
                        <TextInput
                            id="street-number"
                            placeholder="Enter street number"
                            value={streetNumber}
                            onChange={event => this.onStreetNumberChange(event.target.value)}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <FormField
                        label="Street Name"
                        htmlFor="stree-name"
                        margin={{ bottom: 'medium' }}
                        {...this.props}
                    >
                        <TextInput
                            id="stree-name"
                            placeholder="Enter street name"
                            value={streetName}
                            onChange={event => this.onStreetNameChange(event.target.value)}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <FormField
                        label="City"
                        htmlFor="city"
                        margin={{ bottom: 'medium' }}
                        {...this.props}
                    >
                        <TextInput
                            id="city"
                            placeholder="Enter city"
                            value={city}
                            onChange={event => (
                                this.onCityChange(event.target.value)
                            )}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <FormField
                        label="Postal Code"
                        htmlFor="postal-code"
                        margin={{ bottom: 'large' }}
                        {...this.props}
                    >
                        <TextInput
                            id="postal-code"
                            placeholder="Enter name"
                            value={postalCode}
                            onChange={event => this.onPostalCodeChange(event.target.value)}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <CSSTransition
                        in={false}
                        timeout={300}
                        classNames="password-mismatch"
                        mountOnEnter
                        unmountOnExit
                    >
                        <Text
                            size="xsmall"
                            color="status-error"
                            style={{
                                marginTop: '-15px',
                                marginBottom: '8px',
                            }}
                        >
                            Oops, those password don&#39;t match
                        </Text>
                    </CSSTransition>
                    <Button
                        margin={{ bottom: 'small' }}
                        primary
                        type="submit"
                        onClick={this.onAdd}
                    >
                        <Box
                            pad="medium"
                            justify="center"
                            align="center"
                            direction="row"
                            height="48px"
                        >
                            {
                                (user && loggingIn === true) ? (
                                    <PulseLoader />
                                ) : (
                                    <Text>Add Restaurant</Text>
                                )
                            }
                        </Box>
                    </Button>
                </Box>
            </Box>
        );
    }
}

AddRestaurantScreen.defaultProps = {
    loggingIn: null,
};

AddRestaurantScreen.propTypes = {
    asyncAddRestaurant: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool,
};

const mapStateToProps = ({ login: { loggingIn, user } }) => ({
    loggingIn,
    user,
});

export default connect(mapStateToProps, {
    asyncAddRestaurant,
})(AddRestaurantScreen);
