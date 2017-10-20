
import React from 'react';
import PropTypes from 'prop-types';
import styles from './title.scss';

const Title = ({label}) =>
    <div className={styles.title}>
        <span className={styles['title-label']}>
            {label}
        </span>
    </div>
;

Title.propTypes = {
    label: PropTypes.string.isRequired
};

export default Title;
