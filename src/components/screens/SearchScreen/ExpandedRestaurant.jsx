import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    Box,
    Button,
} from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import {
    asyncGetExpandedRestaurant,
} from '../../../store/ExpandedRestaurant/expanded-restaurant-actions';

class ExpandedRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.asyncGetExpandedRestaurant(this.props.id);
    }

    render() {
        const {
            onClose,
            restaurantDetails,
        } = this.props;

        console.log(restaurantDetails);

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
                <Box
                    direction="row"
                    align="center"
                >
                    <Button
                        icon={<LinkPrevious />}
                        onClick={onClose}
                    />
                    <h1>hey</h1>
                </Box>
            </Box>
        );
    }
}

ExpandedRestaurant.defaultProps = {
    restaurantDetails: null,
};

ExpandedRestaurant.propTypes = {
    onClose: PropTypes.func.isRequired,
    asyncGetExpandedRestaurant: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    restaurantDetails: PropTypes.shape({
        name: PropTypes.string,
        openHours: PropTypes.arrayOf(PropTypes.shape({
            day: PropTypes.string,
            openTime: PropTypes.string,
            closeTime: PropTypes.string,
        })),
        number: PropTypes.string,
        street: PropTypes.string,
        city: PropTypes.string,
        postalCode: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number,
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
}, ownProps) => ({
    gettingExpandedRestaurant,
    restaurantDetails: restaurantCache[ownProps.id] || null,
});

export default connect(mapStateToProps, {
    asyncGetExpandedRestaurant,
})(ExpandedRestaurant);
