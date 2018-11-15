import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Box,
    Heading,
    Button,
    Text,
} from 'grommet';

const RestaurantCard = ({
    id,
    name,
    closeTime,
    faveFood,
    onClick,
    lat,
    lng,
}) => (
    <Box
        elevation="xsmall"
        margin="small"
        background={{ color: 'white' }}
        style={{
            minWidth: '50%',
        }}
        round="small"
    >
        <Box
            pad="medium"
            basis="full"
        >
            <Heading
                level={2}
                margin="xsmall"
                style={{ marginRight: 'auto' }}
            >
                {name}
            </Heading>
            <Text
                size="small"
                color="accent-2"
                margin="xsmall"
                style={{ marginRight: 'auto' }}
            >
                {`Open Until: ${closeTime}`}
            </Text>
            <Text
                size="medium"
                margin={{ left: 'xsmall', top: 'auto', bottom: 'auto' }}
                style={{ marginRight: 'auto' }}
            >
                {`People Love: ${faveFood}`}
            </Text>
        </Box>
        <Button
            label="See More"
            primary
            hoverIndicator={false}
            onClick={() => onClick({ id, lat, lng })}
        />
    </Box>
);

RestaurantCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    closeTime: PropTypes.string.isRequired,
    faveFood: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RestaurantCard;
