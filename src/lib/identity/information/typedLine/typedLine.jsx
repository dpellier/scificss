
import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../../utils.js';
import styles from './typedLine.scss';

const TypedLine = ({label, value, animationDuration}) =>
    <div>
        <div className={styles['typed-line']}>
            <div className={styles['typed-line-mask']}
                 style={{animationDuration: utils.secondNumberToSecondString(animationDuration)}}>
            </div>

            <span className={styles['typed-line-label']}>
                {label}
            </span>

            <span className={styles['typed-line-value']}>
                {value}
            </span>
        </div>
    </div>
;

TypedLine.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    animationDuration: PropTypes.number
};

export default TypedLine;
