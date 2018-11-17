import React from 'react';
import { PropTypes } from 'prop-types';
import {
    compose,
    withProps,
    withState,
    withHandlers,
} from 'recompose';
import {
    Box,
} from 'grommet';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import config from '../../../config';
import PulseLoader from '../../common/PulseLoader/PulseLoader';

const { mapsApiKey } = config;

Geocode.setApiKey(mapsApiKey);
Geocode.enableDebug();

const calculateMapCenter = (controlledCenter, userCenter, draggedCenter) => {
    if (controlledCenter.lat) {
        return controlledCenter;
    }

    if (draggedCenter.lat) {
        return draggedCenter;
    }

    return userCenter;
};

const GoogleMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <Box basis="full" />,
        mapElement: <div style={{ flex: '1' }} />,
    }),
    withState('zoom', 'onZoomChange', 8),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };

        return {
            onMapMounted: () => (ref) => {
                refs.map = ref;
            },
            onBoundsChanged: ({ onBoundsChange }) => () => {
                onBoundsChange(refs.map.getCenter());
            },
        };
    }),
    withScriptjs,
    withGoogleMap,
)(props => (
    <GoogleMap

        defaultCenter={props.defaultCenter}
        defaultOptions={{
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            draggable: props.draggable,
        }}
        ref={props.onMapMounted}
        onBoundsChanged={props.onBoundsChanged}
        onDragEnd={props.onDragEnd}
        onDragStart={props.onDragStart}
        {...props}
        zoom={12}
    >
        {
            <Marker
                position={
                    calculateMapCenter(props.controlledCenter, props.defaultCenter, props.centerPos)
                }
                onClick={props.onMarkerClick}
            />
        }
    </GoogleMap>
));

class CenteredMarkerMap extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isMarkerShown: false,
            centerLat: null,
            centerLng: null,
            failOverCoords: {
                lat: 49.261427,
                lng: -123.245934,
            },
        };

        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleBoundsChange(mapCenter) {
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

    handleDragEnd() {
        const {
            centerLat,
            centerLng,
        } = this.state;

        this.props.onDragEnd({ lat: centerLat, lng: centerLng });
    }

    render() {
        const {
            centerLat,
            centerLng,
        } = this.state;

        const centerProp = this.props.controlledCenter.lat ? {
            center: this.props.controlledCenter,
        } : {};

        return (
            this.props.ready ? (
                <GoogleMapComponent
                    defaultCenter={this.props.initialCoords}
                    onMarkerClick={this.handleMarkerClick}
                    onBoundsChange={this.handleBoundsChange}
                    centerPos={{ lat: centerLat, lng: centerLng }}
                    onDragEnd={this.handleDragEnd}
                    onDragStart={this.props.onDragStart}
                    controlledCenter={this.props.controlledCenter}
                    draggable={this.props.draggable}
                    {...centerProp}
                />
            ) : (
                <Box
                    basis="full"
                    justify="center"
                    align="center"
                    background={{ color: '#e9e9e9' }}
                >
                    <PulseLoader />
                </Box>
            )
        );
    }
}

CenteredMarkerMap.defaultProps = {
    initialCoords: {
        lat: 49.261427,
        lng: -123.245934,
    },
    controlledCenter: {
        lat: null,
        lng: null,
    },
    draggable: true,
};

CenteredMarkerMap.propTypes = {
    onDragEnd: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    initialCoords: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    controlledCenter: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    ready: PropTypes.bool.isRequired,
    draggable: PropTypes.bool,
};

export default CenteredMarkerMap;
