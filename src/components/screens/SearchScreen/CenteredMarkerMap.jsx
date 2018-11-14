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

const GoogleMapComponent = compose(
    withProps({
        // TODO: switch to public key before deploying
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB3RY_BYDDHLS77R7Gr41oeFMne22Z9ypM&libraries=geometry,drawing,places',
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
        defaultZoom={12}
        defaultCenter={props.defaultCenter}
        defaultOptions={{
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
        }}
        ref={props.onMapMounted}
        onBoundsChanged={props.onBoundsChanged}
        onDragEnd={props.onDragEnd}
        onDragStart={props.onDragStart}
    >
        {
            <Marker
                position={(
                    props.centerPos.lat ? props.centerPos : props.defaultCenter
                )}
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
            defaultCenter: { lat: 49.261427, lng: -123.245934 },
        };

        this.handleBoundsChange = this.handleBoundsChange.bind(this);
    }

    handleBoundsChange(mapCenter) {
        this.setState(prevState => ({
            ...prevState,
            centerLat: mapCenter.lat(),
            centerLng: mapCenter.lng(),
        }));
    }

    render() {
        const {
            centerLat,
            centerLng,
        } = this.state;

        return (
            <GoogleMapComponent
                defaultCenter={this.state.defaultCenter}
                onMarkerClick={this.handleMarkerClick}
                onBoundsChange={this.handleBoundsChange}
                centerPos={{ lat: centerLat, lng: centerLng }}
                onDragEnd={() => this.props.onDragEnd({ lat: centerLat, lng: centerLng })}
                onDragStart={this.props.onDragStart}
            />
        );
    }
}

CenteredMarkerMap.propTypes = {
    onDragEnd: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
};

export default CenteredMarkerMap;
