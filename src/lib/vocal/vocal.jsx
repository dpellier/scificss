
import React from 'react';
import styles from './vocal.scss';
import Title from './title/title.jsx';
import Wave from './wave/wave.jsx';

const NB_WAVES = 50;
const WAVE_MAX_HEIGHT = 140;
const WAVE_NOISE = 30;
const WAVE_ANIMATION_DURATION = 500;

class Vocal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            waving: false
        };
    }

    componentDidMount() {
        document.addEventListener('scificss:talking:start', this.startWaving.bind(this), false);
        document.addEventListener('scificss:talking:end', this.stopWaving.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('scificss:talking:start', this.startWaving.bind(this), false);
        document.removeEventListener('scificss:talking:end', this.stopWaving.bind(this), false);
    }

    startWaving() {
        this.setState({
            waving: true
        });

        this.renderingInterval = setInterval(() => {
            this.setState({time: Date.now()});
        }, WAVE_ANIMATION_DURATION);
    }

    stopWaving() {
        this.setState({
            waving: false
        });

        clearInterval(this.renderingInterval);
    }

    render() {
        const waves = this.state.waving ? generateWaves() : [];

        return (
            <div className={styles.vocal}>
                <Title label="Transmission" />

                <div className={styles['vocal-waves']}>
                    {
                        waves.map((wave) => wave)
                    }
                </div>
            </div>
        )
    }
}

function generateWaves() {
    const waves = [];

    for (let i = 0; i < NB_WAVES; i++) {
        waves.push(renderWave(i, calculateHeight(i)));
    }

    for (let i = NB_WAVES - 1; i >= 0; i--) {
        waves.push(renderWave(NB_WAVES + i + 1, calculateHeight(i)));
    }

    return waves;
}

function renderWave(idx, height) {
    return (
        <Wave key={idx}
              height={height}
              animationDuration={WAVE_ANIMATION_DURATION} />
    );
}

function calculateHeight(i) {
    return WAVE_MAX_HEIGHT / (NB_WAVES / i) + Math.floor(Math.random() * WAVE_NOISE) + (i*i/WAVE_MAX_HEIGHT);
}

export default Vocal;
