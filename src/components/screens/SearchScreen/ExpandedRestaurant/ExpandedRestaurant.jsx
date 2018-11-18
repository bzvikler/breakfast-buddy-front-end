import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    Heading,
    Text,
} from 'grommet';
import {
    LinkPrevious,
    Favorite,
} from 'grommet-icons';

import {
    asyncGetExpandedRestaurant,
    asyncFavouriteRestaurant,
    asyncFavouriteFood,
} from '../../../../store/ExpandedRestaurant/expanded-restaurant-actions';
import ExpandedRestaurantLoader from '../ExpandedRestaurantLoader';
import './ExpandedRestaurant.css';

class ExpandedRestaurant extends Component {
    constructor(props) {
        super(props);

        this.handleLikeRestaurant = this.handleLikeRestaurant.bind(this);
        this.handleFavouriteFood = this.handleFavouriteFood.bind(this);
    }

    componentDidMount() {
        this.props.asyncGetExpandedRestaurant(this.props.id);
    }

    handleLikeRestaurant() {
        this.props.asyncFavouriteRestaurant(this.props.id);
    }

    isRestaurantLiked() {
        return this.props.user.likedRestaurants
            .find(restaurant => restaurant.rid === this.props.id);
    }

    handleFavouriteFood(foodType) {
        this.props.asyncFavouriteFood({
            type: foodType,
            restaurantId: this.props.id,
        });
    }

    isFoodFavourited(foodType) {
        const {
            user,
            id,
        } = this.props;

        return user.favouritedFoods
            .find(food => food.restaurantId === id && food.food_type === foodType);
    }

    render() {
        const {
            onClose,
            restaurantDetails,
            userIsGuest,
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
                {
                    (!restaurantDetails) ? (
                        <ExpandedRestaurantLoader onBackClick={onClose} />
                    ) : (
                        <Box>
                            <Box
                                direction="row"
                                align="center"
                                pad={{ right: 'small' }}
                            >
                                <Button
                                    icon={<LinkPrevious />}
                                    onClick={onClose}
                                />
                                <Box>
                                    <Heading margin={{ bottom: 'xsmall' }}>{restaurantDetails.restaurantName}</Heading>
                                    <Text
                                        size="small"
                                        margin={{ bottom: 'medium' }}
                                    >
                                        {
                                            `${restaurantDetails.number} ${restaurantDetails.street} ${restaurantDetails.city}, ${restaurantDetails.postalCode}`
                                        }
                                    </Text>
                                </Box>
                                {
                                    !userIsGuest && (
                                        <Button
                                            icon={(
                                                <Favorite
                                                    className={`fav ${(
                                                        this.isRestaurantLiked() ? 'liked' : ''
                                                    )}`}
                                                    color="brand"
                                                />
                                            )}
                                            onClick={this.handleLikeRestaurant}
                                            margin={{ left: 'auto' }}
                                        />
                                    )
                                }
                            </Box>
                            <Box
                                direction="row"
                                align="center"
                            >
                                <Heading
                                    level={2}
                                    margin={{ top: 'none', left: 'medium', bottom: 'large' }}
                                >
                                    People Love:
                                </Heading>
                                <Heading
                                    level={2}
                                    margin={{ top: 'none', left: 'medium', bottom: 'large' }}
                                    color="brand"
                                >
                                    {restaurantDetails.faveFood}
                                </Heading>
                            </Box>
                            <Box
                                direction="row"
                                margin={{ left: 'medium', right: 'medium' }}
                            >
                                <Box basis="1/2">
                                    <Heading
                                        level={3}
                                        margin="none"
                                    >
                                        Foods on offer
                                    </Heading>
                                    <Box
                                        overflow={{ verical: 'scroll' }}
                                        style={{ WebkitOverflowScrolling: 'touch' }}
                                    >
                                        {
                                            restaurantDetails.foodTypes.map(food => (
                                                <Box
                                                    key={food.food_type}
                                                    direction="row"
                                                    align="center"
                                                >
                                                    <Text
                                                        margin={{ top: 'xsmall' }}
                                                        size="small"
                                                    >
                                                        {food.food_type}
                                                    </Text>
                                                    {
                                                        !userIsGuest && (
                                                            <Button
                                                                size="small"
                                                                icon={(
                                                                    <Favorite
                                                                        className={`fav ${(
                                                                            this.isFoodFavourited(food.food_type) ? 'liked' : ''
                                                                        )}`}
                                                                        color="brand"
                                                                        size="small"
                                                                    />
                                                                )}
                                                                // eslint-disable-next-line
                                                                onClick={() => (this.handleFavouriteFood(food.food_type))}
                                                                margin={{ left: 'auto', right: 'medium' }}
                                                            />
                                                        )
                                                    }
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box basis="1/2">
                                    <Heading
                                        level={3}
                                        margin="none"
                                    >
                                        Hours
                                    </Heading>
                                    {
                                        restaurantDetails.OpenHours.map((hourDetail, index) => (
                                            <Text
                                                key={hourDetail.day}
                                                size="small"
                                                color={index === 0 ? 'accent-2' : ''}
                                                margin={{ top: 'xsmall' }}
                                            >
                                                {
                                                    `${hourDetail.day}: ${hourDetail.openTime} - ${hourDetail.closeTime}`
                                                }
                                            </Text>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    )
                }
            </Box>
        );
    }
}

ExpandedRestaurant.defaultProps = {
    id: null,
    restaurantDetails: null,
    user: null,
};

ExpandedRestaurant.propTypes = {
    onClose: PropTypes.func.isRequired,
    asyncGetExpandedRestaurant: PropTypes.func.isRequired,
    asyncFavouriteRestaurant: PropTypes.func.isRequired,
    asyncFavouriteFood: PropTypes.func.isRequired,
    id: PropTypes.string,
    userIsGuest: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        likedRestaurants: PropTypes.arrayOf(PropTypes.shape({})),
        favouritedFoods: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    restaurantDetails: PropTypes.shape({
        restaurantName: PropTypes.string,
        OpenHours: PropTypes.arrayOf(PropTypes.shape({
            day: PropTypes.string,
            openTime: PropTypes.string,
            closeTime: PropTypes.string,
        })),
        number: PropTypes.string,
        street: PropTypes.string,
        city: PropTypes.string,
        postalCode: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number,
        faveFood: PropTypes.string,
        foodTypes: PropTypes.arrayOf(PropTypes.shape({
            food_type: PropTypes.string.isRequired,
        })),
    }),
};

const mapStateToProps = ({
    restaurant: {
        restaurantCache,
        gettingExpandedRestaurant,
    },
    login: {
        userIsGuest,
        user,
    },
}, ownProps) => ({
    gettingExpandedRestaurant,
    restaurantDetails: restaurantCache[ownProps.id] || null,
    userIsGuest,
    user,
});

export default connect(mapStateToProps, {
    asyncGetExpandedRestaurant,
    asyncFavouriteRestaurant,
    asyncFavouriteFood,
})(ExpandedRestaurant);
