
import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils.js';
import styles from './picture.scss';

class Picture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements : []
        };

        const animationLoadDelay = this.props.animationDuration / 2;
        const animationLoadDuration = +(this.props.animationDuration / 2.66).toFixed(2);
        const animationAppearDuration = +(this.props.animationDuration - (animationLoadDelay + animationLoadDuration)).toFixed(2);

        this.animations = {
            loadDelay: animationLoadDelay,
            loadDuration: animationLoadDuration,
            appearDuration: animationAppearDuration
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                elements: this.state.elements.concat(this.renderCircle())
            });

            setTimeout(() => {
                this.setState({
                    elements: this.state.elements.concat(this.renderPicture())
                });
            }, this.animations.loadDuration);
        }, this.animations.loadDelay);
    }

    render() {
        return (
            <div className={styles.picture}>
                {
                    this.state.elements.map((element) => element)
                }
            </div>
        );
    }

    renderCircle() {
        return (
            <svg className={styles['picture-load']}
                 key="circle"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink">
                <circle className={styles['picture-load-circle']}
                        style={{animationDuration: utils.secondNumberToSecondString(this.animations.loadDuration)}}
                        r="82"
                        cx="84"
                        cy="84" />
            </svg>
        );
    }

    renderPicture() {
        return (
            <div className={styles['picture-image']}
                 key="picture"
                 style={{
                     backgroundImage: `url('${this.props.url}')`,
                     animationDuration: utils.secondNumberToSecondString(this.animations.appearDuration)
                 }}>
            </div>
        );
    }
}

Picture.propTypes = {
    animationDuration: PropTypes.number,
    url: PropTypes.string
};

export default Picture;
