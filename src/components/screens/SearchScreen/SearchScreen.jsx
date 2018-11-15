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
            centerLat: null,
            centerLng: null,
            failOverCoords: {
                lat: 49.261427,
                lng: -123.245934,
            },
        };

        this.toggleDrop = this.toggleDrop.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleExpandedClose = this.handleExpandedClose.bind(this);
        this.handleMapBoundsChange = this.handleMapBoundsChange.bind(this);
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
            this.props.setActiveRestaurant(id, history);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            lat,
            lng,
            user,
            match: {
                params: {
                    id,
                },
            },
        } = this.props;

        if (!prevProps.user && user && !id) {
            this.props.asyncSearchForRestaurants({ lat, lng });
        }
    }

    toggleDrop() {
        this.setState(prevState => ({
            ...prevState,
            dropOpen: !prevState.dropOpen,
        }));
    }

    handleDragEnd(coords) {
        this.props.setActiveRestaurant(null, this.props.history);
        this.props.asyncSearchForRestaurants(coords);
    }

    handleExpandedClose() {
        const {
            restaurantList,
            lat,
            lng,
        } = this.props;

        this.props.setActiveRestaurant(null, this.props.history);

        if (!restaurantList.length) {
            this.props.asyncSearchForRestaurants({ lat, lng });
        }
    }

    handleCardClick({ id, lat, lng }) {
        console.log('card clicked with: ', lat, lng);

        this.setState(prevState => ({
            ...prevState,
            test: !prevState.test,
            lat,
            lng,
        }));

        this.props.setActiveRestaurant(id, this.props.history);
    }

    handleMapBoundsChange(mapCenter) {
        const {
            failOverCoords: {
                lat,
                lng,
            },
        } = this.state;

        this.setState(prevState => ({
            ...prevState,
            centerLat: mapCenter ? mapCenter.lat() : lat,
            centerLng: mapCenter ? mapCenter.lng() : lng,
        }));
    }

    render() {
        const {
            lat,
            lng,
            gettingLocation,
            gettingRestaurants,
            restaurantList,
            activeRestaurant,
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
                        initialCoords={{ lat, lng }}
                        onDragStart={() => {}}
                        onDragEnd={this.handleDragEnd}
                        ready={gettingLocation === false}
                        center={{ lat, lng }}
                        controlledCenter={{}}
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
                                    <ExpandedRestaurant onClose={this.handleExpandedClose} />
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
    lat: null,
    lng: null,
    gettingLocation: null,
    gettingRestaurants: null,
    restaurantList: [],
    user: null,
    activeRestaurant: null,
};

SearchScreen.propTypes = {
    requestLocation: PropTypes.func.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
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
    search: { gettingRestaurants, restaurantList, activeRestaurant },
    login: { user },
}) => ({
    lat,
    lng,
    gettingLocation,
    gettingRestaurants,
    restaurantList,
    user,
    activeRestaurant,
});

export default connect(mapStateToProps, {
    requestLocation,
    asyncSearchForRestaurants,
    setActiveRestaurant,
})(SearchScreen);
