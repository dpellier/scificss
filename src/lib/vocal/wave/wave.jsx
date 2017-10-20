
import React from 'react';
import PropTypes from 'prop-types';
import styles from './wave.scss';
import utils from '../../utils.js';

const Wave = ({height, animationDuration}) =>
    <div className={styles.wave}
         style={{height: height, animationDuration: utils.secondNumberToSecondString(animationDuration)}}>
    </div>
;

Wave.propTypes = {
    animationDuration: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default Wave;
