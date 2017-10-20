
import React from 'react';
import PropTypes from 'prop-types';
import styles from './tile.scss';

const Tile = ({name, expanded}) =>
    <div className={`${styles.tile} ${expanded ? styles['tile--expanded'] : ''}`}>
        <button className={styles['tile-summary']}>
            {name}
        </button>

        <div className={styles['tile-content']}>
            <span className={styles['tile-content-text']}>
                {name}
            </span>
        </div>
    </div>
;

Tile.propTypes = {
    name: PropTypes.string,
    expanded: PropTypes.bool
};

export default Tile;
