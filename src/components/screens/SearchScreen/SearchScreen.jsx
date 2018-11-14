import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    Box,
    Heading,
} from 'grommet';

import { requestLocation } from '../../../store/Location/location-actions';
import { asyncSearchForRestaurants } from '../../../store/Search/search-actions';
import CenteredMarkerMap from './CenteredMarkerMap';
import PulseLoader from '../../common/PulseLoader/PulseLoader';

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
                    basis="1/2"
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
                                <PulseLoader />
                            </Box>
                        ) : (
                            <Box
                                basis="full"
                                direction="row"
                                overflow={{ horizontal: 'scroll' }}
                                pad="medium"
                                background={{ color: '#f7f7f7' }}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {
                                    restaurantList.map(listItem => (
                                        <Box>
                                            <h1>hello this is long</h1>
                                        </Box>
                                        // <Box
                                        //     // basis="1/3"
                                        //     elevation="xsmall"
                                        // >
                                        //     <Heading>
                                        //         {listItem.restaurantName}
                                        //     </Heading>
                                        // </Box>
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
};

const mapStateToProps = ({
    location: { lat, lng, gettingLocation },
    search: { gettingRestaurants, restaurantList },
}) => ({
    lat,
    lng,
    gettingLocation,
    gettingRestaurants,
    restaurantList,
});

export default connect(mapStateToProps, {
    requestLocation,
    asyncSearchForRestaurants,
})(SearchScreen);
