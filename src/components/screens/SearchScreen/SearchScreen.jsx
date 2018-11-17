import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
    Box,
} from 'grommet';

import { requestLocation } from '../../../store/Location/location-actions';
import {
    asyncSearchForRestaurants,
    setActiveRestaurant,
} from '../../../store/Search/search-actions';
import CenteredMarkerMap from './CenteredMarkerMap';
import PulseLoader from '../../common/PulseLoader/PulseLoader';
import RestaurantCard from './RestaurantCard';
import ExpandedRestaurant from './ExpandedRestaurant';

import './SearchScreen.css';

const basisTransition = {
    transition: 'flex-basis 200ms ease-in-out',
};

class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropOpen: false,
        };

        this.toggleDrop = this.toggleDrop.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleExpandedClose = this.handleExpandedClose.bind(this);
    }

    componentWillMount() {
        const {
            match: {
                params: {
                    id,
                },
            },
            history,
        } = this.props;

        this.props.requestLocation();

        if (id) {
            // TODO: change this to getExpandedRestaurant, which should get back lat lng too
            this.props.setActiveRestaurant({
                restaurantId: id,
                restaurantLat: 49.261427,
                restaurantLng: -123.245934,
            }, history);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            userLat,
            userLng,
            user,
            match: {
                params: {
                    id,
                },
            },
        } = this.props;

        if (!prevProps.user && user && !id) {
            this.props.asyncSearchForRestaurants({ lat: userLat, lng: userLng });
        }
    }

    toggleDrop() {
        this.setState(prevState => ({
            ...prevState,
            dropOpen: !prevState.dropOpen,
        }));
    }

    handleDragEnd(coords) {
        this.props.setActiveRestaurant({
            restaurantId: null,
            restaurantLat: null,
            restaurantLng: null,
        }, this.props.history);

        this.props.asyncSearchForRestaurants(coords);
    }

    handleExpandedClose() {
        const {
            restaurantList,
            userLat,
            userLng,
        } = this.props;

        this.props.setActiveRestaurant({
            restaurantId: null,
            restaurantLat: null,
            restaurantLng: null,
        }, this.props.history);

        if (!restaurantList.length) {
            this.props.asyncSearchForRestaurants({ lat: userLat, lng: userLng });
        }
    }

    handleCardClick({ id, lat, lng }) {
        this.props.setActiveRestaurant({
            restaurantId: id,
            restaurantLat: lat,
            restaurantLng: lng,
        }, this.props.history);
    }

    render() {
        const {
            userLat,
            userLng,
            gettingLocation,
            gettingRestaurants,
            restaurantList,
            activeRestaurant,
            activeRestaurantLat,
            activeRestaurantLng,
            match: {
                params: {
                    id,
                },
            },
        } = this.props;

        return (
            <Box
                direction="column"
                basis="full"
            >

                <Box
                    basis={id ? '1/3' : '2/3'}
                    style={basisTransition}
                >
                    <CenteredMarkerMap
                        initialCoords={{ lat: userLat, lng: userLng }}
                        onDragStart={() => {}}
                        onDragEnd={this.handleDragEnd}
                        ready={gettingLocation === false}
                        controlledCenter={{ lat: activeRestaurantLat, lng: activeRestaurantLng }}
                    />
                </Box>
                <Box
                    basis={id ? '2/3' : '1/2'}
                    style={basisTransition}
                >
                    {
                        gettingRestaurants ? (
                            <Box
                                basis="full"
                                justify="center"
                                align="center"
                                background={{ color: '#f7f7f7' }}
                            >
                                <PulseLoader color="brand" />
                            </Box>
                        ) : (
                            <Box
                                basis="full"
                                direction="row"
                                overflow={{ horizontal: 'scroll' }}
                                pad="medium"
                                background={{ color: '#f7f7f7' }}
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                    position: 'relative',
                                }}
                            >
                                {
                                    restaurantList.map(listItem => (
                                        <RestaurantCard
                                            key={listItem.restaurantID}
                                            id={listItem.restaurantID}
                                            name={listItem.restaurantName}
                                            closeTime={listItem.closeTime}
                                            faveFood={listItem.faveFood}
                                            onClick={this.handleCardClick}
                                            lat={listItem.lat}
                                            lng={listItem.lon}
                                        />
                                    ))
                                }
                                <CSSTransition
                                    in={activeRestaurant !== null}
                                    timeout={300}
                                    classNames="expanded-restaurant"
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <ExpandedRestaurant
                                        onClose={this.handleExpandedClose}
                                        id={id}
                                    />
                                </CSSTransition>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        );
    }
}

SearchScreen.defaultProps = {
    userLat: null,
    userLng: null,
    gettingLocation: null,
    gettingRestaurants: null,
    restaurantList: [],
    user: null,
    activeRestaurant: null,
    activeRestaurantLat: null,
    activeRestaurantLng: null,
};

SearchScreen.propTypes = {
    requestLocation: PropTypes.func.isRequired,
    userLat: PropTypes.number,
    userLng: PropTypes.number,
    gettingLocation: PropTypes.bool,
    asyncSearchForRestaurants: PropTypes.func.isRequired,
    gettingRestaurants: PropTypes.bool,
    restaurantList: PropTypes.arrayOf(PropTypes.shape({
        restaurantID: PropTypes.string.isRequired,
        restaurantName: PropTypes.string.isRequired,
        closeTime: PropTypes.string.isRequired,
        faveFood: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
    })),
    user: PropTypes.shape({}),
    setActiveRestaurant: PropTypes.func.isRequired,
    activeRestaurant: PropTypes.string,
    activeRestaurantLat: PropTypes.number,
    activeRestaurantLng: PropTypes.number,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = ({
    location: { lat, lng, gettingLocation },
    search: {
        gettingRestaurants,
        restaurantList,
        activeRestaurant,
        activeRestaurantLat,
        activeRestaurantLng,
    },
    login: { user },
}) => ({
    userLat: lat,
    userLng: lng,
    gettingLocation,
    gettingRestaurants,
    restaurantList,
    user,
    activeRestaurant,
    activeRestaurantLat,
    activeRestaurantLng,
});

export default connect(mapStateToProps, {
    requestLocation,
    asyncSearchForRestaurants,
    setActiveRestaurant,
})(SearchScreen);
