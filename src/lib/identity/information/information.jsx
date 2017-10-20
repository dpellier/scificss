
import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils.js';
import Location from './location/location.jsx';
import TypedLine from './typedLine/typedLine.jsx';
import styles from './information.scss';

const CONTAINER_ANIMATION_DURATION = 1200;
const LINE_ANIMATION_DURATION = 800;

class Information extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            lines: [],
            animationEnded: false
        };

        this.userData = [
            {label: 'Name:', value: this.props.user.name},
            {label: 'Age:', value: this.props.user.age},
            {label: 'Gender:', value: this.props.user.gender},
            {label: 'Profession:', value: this.props.user.profession},
        ];
    }

    componentDidMount() {
        setTimeout(() => {
            let offset = 0;

            this.userData.forEach((data, idx) => {
                setTimeout(() => {
                    this.setState({
                        elements: this.state.elements.concat(this.renderLine(data, idx))
                    });
                }, LINE_ANIMATION_DURATION * offset);

                offset++;
            });

            setTimeout(() => {
                this.setState({
                    elements: this.state.elements.concat(this.renderLocation())
                });
            }, LINE_ANIMATION_DURATION * offset);
        }, CONTAINER_ANIMATION_DURATION);
    }

    render() {
        return (
            <div className={styles.information}
                 style={{animationDuration: utils.secondNumberToSecondString(CONTAINER_ANIMATION_DURATION)}}>
                <div className={styles['information-container']}>
                    {
                        this.state.elements.map((element) => element)
                    }
                </div>
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

    renderLocation() {
        return (
            <Location key="location" />
        );
    }
}

Information.propTypes = {
    user: PropTypes.object
};

export default Information;
