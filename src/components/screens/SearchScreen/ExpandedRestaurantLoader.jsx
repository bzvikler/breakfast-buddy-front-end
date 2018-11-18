import React from 'react';
// import { PropTypes } from 'prop-types';
import {
    Box,
} from 'grommet';

import PulseLoader from '../../common/PulseLoader/PulseLoader';

// TODO: add back: onBackClick
const ExpandedRestaurantLoader = () => (
    // TODO: use FB style gradient loading
    <Box basis="full">
        {/* <Box
            direction="row"
            align="center"
            height="109px"
        >
            <Button
                icon={<LinkPrevious />}
                onClick={onBackClick}
            />
        </Box> */}
        <Box
            basis="full"
            justify="center"
            align="center"
            height="100%"
        >
            <PulseLoader color="brand" />
        </Box>
    </Box>
);

// ExpandedRestaurantLoader.propTypes = {
//     onBackClick: PropTypes.func.isRequired,
// };

export default ExpandedRestaurantLoader;
