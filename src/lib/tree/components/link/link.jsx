
import React from 'react';
import PropTypes from 'prop-types';
import styles from './link.scss';

const Link = ({start, end}) =>
    <svg className={styles.link}
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink">
        <path d={`M0,${start} C${start},${start} ${start},${end} 100,${end}`}
              style={{stroke: '#558fa3', fill: 'none'}}>
        </path>

        <rect x="0"
              y="0"
              width="100"
              height="115"
              style={{stroke: 'none', fill: '#000'}}>
            <animate attributeName="x"
                     attributeType="XML"
                     to="100"
                     begin="0s"
                     dur="1s"
                     fill="freeze" />
        </rect>
    </svg>
;

Link.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number
};

export default Link;

// x = starting tile vertical middle
// y = destination tile vertical top
// path --> d="M0,x Cx,x x,y 100,y
