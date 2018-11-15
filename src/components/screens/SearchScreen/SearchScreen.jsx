import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    Box,
} from 'grommet';

import { requestLocation } from '../../../store/Location/location-actions';
import { asyncSearchForRestaurants } from '../../../store/Search/search-actions';
import CenteredMarkerMap from './CenteredMarkerMap';
import PulseLoader from '../../common/PulseLoader/PulseLoader';
import RestaurantCard from './RestaurantCard';

class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropOpen: false,
        };

        this.toggleDrop = this.toggleDrop.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    componentWillMount() {
        this.props.requestLocation();
    }

    componentDidUpdate(prevProps) {
        const {
            lat,
            lng,
            user,
        } = this.props;

        if (!prevProps.user && user) {
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
        this.props.asyncSearchForRestaurants(coords);
    }

    render() {
        const {
            lat,
            lng,
            gettingLocation,
            gettingRestaurants,
            restaurantList,
        } = this.props;

        return (
            <Box
                direction="column"
                basis="full"
            >

                <Box
                    basis="2/3"
                >
                    <CenteredMarkerMap
                        initialCoords={{ lat, lng }}
                        onDragStart={() => console.log('started')}
                        onDragEnd={this.handleDragEnd}
                        ready={gettingLocation === false}
                    />
                </Box>
                <Box
                    basis="1/2"
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
                                }}
                            >
                                {
                                    restaurantList.map(listItem => (
                                        <RestaurantCard
                                            key={listItem.restaurantID}
                                            name={listItem.restaurantName}
                                            closeTime={listItem.closeTime}
                                            faveFood={listItem.faveFood}
                                        />
                                    ))
                                }
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
};

SearchScreen.propTypes = {
    requestLocation: PropTypes.func.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    gettingLocation: PropTypes.bool,
    asyncSearchForRestaurants: PropTypes.func.isRequired,
    gettingRestaurants: PropTypes.bool,
    restaurantList: PropTypes.arrayOf(PropTypes.shape({
    })),
    user: PropTypes.shape({}),
};

const mapStateToProps = ({
    location: { lat, lng, gettingLocation },
    search: { gettingRestaurants, restaurantList },
    login: { user },
}) => ({
    lat,
    lng,
    gettingLocation,
    gettingRestaurants,
    restaurantList,
    user,
});

export default connect(mapStateToProps, {
    requestLocation,
    asyncSearchForRestaurants,
})(SearchScreen);
