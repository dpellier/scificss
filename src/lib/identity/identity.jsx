
import React from 'react';
import styles from './identity.scss';
import Information from './information/information.jsx';
import Picture from './picture/picture.jsx';
import picture from '../../assets/images/identity.jpg';

const PICTURE_ANIMATION_DURATION = 4000;

class Identity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: []
        };

        this.user = {
            picture: picture,
            name: 'Nataneko',
            age: '2 years',
            gender: 'Cyborg',
            profession: 'Hacker'
        };
    }

    componentDidMount() {
        this.setState({
            elements: this.state.elements.concat(this.renderPicture())
        });

        setTimeout(() => {
            this.setState({
                elements: this.state.elements.concat(this.renderInformation())
            });
        }, PICTURE_ANIMATION_DURATION);
    }

    render() {
        return (
            <div className={styles.identity}>
                {
                    this.state.elements.map((element) => element)
                }
            </div>
        );
    }

    renderPicture() {
        return (
            <div className={styles['identity-picture']}
                 key="picture">
                <Picture url={this.user.picture}
                         animationDuration={PICTURE_ANIMATION_DURATION} />
            </div>
        );
    }

    renderInformation() {
        return (
            <div className={styles['identity-information']}
                 key="information">
                <Information user={this.user} />
            </div>
        );
    }
}

export default Identity;
