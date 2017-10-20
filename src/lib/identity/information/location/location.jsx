
import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../../utils.js';
import Cursor from './cursor/cursor.jsx';
import TypedLine from '../typedLine/typedLine.jsx';
import planetPicture from '../../../../assets/images/planet.gif';
import universePicture from '../../../../assets/images/universe.jpg';//TODO convert min
import styles from './location.scss';

const LINE_ANIMATION_DURATION = 800; // TODO share animation constants
const APPEAR_ANIMATION_DURATION = 500;

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: []
        };
    }

    componentDidMount() {
        this.setState({
            elements: this.state.elements.concat(this.renderLine({label: 'Locating in progress', value: '...'}, 'search'))
        });

        setTimeout(() => {
            this.setState({
                elements: this.state.elements.concat(this.renderSearch())
            });
        }, LINE_ANIMATION_DURATION);
    }

    resultFound() {
        this.setState({
            elements: [this.renderResult()]
        });
    }

    render() {
        return (
            <div className={styles.location}>
                {this.state.elements.map((element) => element)}
            </div>
        );
    }

    renderLine(line, key) {
        return (
            <TypedLine key={key}
                       label={line.label}
                       value={line.value}
                       animationDuration={LINE_ANIMATION_DURATION} />
        );
    }

    renderSearch() {
        return (
            <div key="map"
                 className={styles['location-map']}
                 style={{
                     backgroundImage: `url(${universePicture})`,
                     animationDuration: utils.secondNumberToSecondString(APPEAR_ANIMATION_DURATION)
                 }}>
                <Cursor width={180}
                        height={60}
                        onEnd={this.resultFound.bind(this)} />
            </div>
        );
    }

    renderResult() {
        return (
            <div key="result">
                {this.renderLine({label: 'Location:', value: 'Andromeda > NGC 221'}, 'resultDetail')}

                <div className={styles['location-planet']}
                     style={{
                         backgroundImage: `url(${planetPicture})`,
                         animationDuration: utils.secondNumberToSecondString(APPEAR_ANIMATION_DURATION)
                     }}>
                </div>
            </div>
        );
    }
}

Location.propTypes = {
    animationDuration: PropTypes.number
};

export default Location;
