import React from 'react';
import { PropTypes } from 'prop-types';
import './PulseLoader.css';

const PulseLoader = ({ color }) => (
    <div className={`la-ball-pulse ${color}`}>
        <div />
        <div />
        <div />
    </div>
);

PulseLoader.defaultProps = {
    color: '',
};

PulseLoader.propTypes = {
    color: PropTypes.string,
};

export default PulseLoader;
