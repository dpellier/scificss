
import React from 'react';
import PropTypes from 'prop-types';
import styles from './cursor.scss';

const CURSOR_HEIGHT = 10;
const CURSOR_WIDTH = 10;
const EXPAND_ANIMATION_DURATION = 800;
const MOVE_ANIMATION_DURATION = 600;
const COLOR = '#558fa3';

class Cursor extends React.Component {
    constructor(props) {
        super(props);

        this.positions = [
            this.randomCoordinates(),
            this.randomCoordinates(),
            this.randomCoordinates(),
            this.randomCoordinates(),
            this.randomCoordinates()
        ];

        this.cursor = this.positions[0];
        this.cursor.height = CURSOR_HEIGHT;
        this.cursor.width = CURSOR_WIDTH;
    }

    componentDidMount() {
        this.context = document.getElementById('locationCursor').getContext('2d');
        this.context.strokeStyle = COLOR;

        const search = this.positions.reduce((seq, position) => {
            return seq.then(() => {
                return this.moveCursorTo(position);
            })
        }, Promise.resolve());

        search.then(() => {
            this.blink().then(() => {
                this.expandCursor().then(() => {
                    this.props.onEnd();
                });
            });
        });
    }

    render() {
        return (
            <canvas id="locationCursor"
                    width={this.props.width}
                    height={this.props.height}>
            </canvas>
        );
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.props.width, this.props.height);
    }

    drawCursor(cursor, fillColor = 'transparent') {
        this.context.fillStyle = fillColor;
        this.context.lineWidth = 1;

        this.context.clearRect(cursor.x, cursor.y, cursor.width, cursor.height);
        this.context.strokeRect(cursor.x, cursor.y, cursor.width, cursor.height);
        this.context.fillRect(cursor.x, cursor.y, cursor.width, cursor.height);
    }

    drawLines(position) {
        this.drawLine({x: 0, y: 0}, position);
        this.drawLine({x: 0, y: this.props.height}, {x: position.x, y: position.y + CURSOR_HEIGHT});
        this.drawLine({x: this.props.width, y: 0}, {x: position.x + CURSOR_WIDTH, y: position.y});
        this.drawLine({x: this.props.width, y: this.props.height}, {x: position.x + CURSOR_WIDTH, y: position.y + CURSOR_HEIGHT});
    }

    drawLine(start, end) {
        const context = this.context;

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.closePath();

        context.lineWidth = .5;
        context.stroke();
    }

    randomCoordinates() {
        const left = CURSOR_WIDTH;
        const right = this.props.width - CURSOR_WIDTH * 2;
        const top = CURSOR_HEIGHT;
        const bottom = this.props.height - CURSOR_HEIGHT * 2;

        return {
            x: Math.floor(Math.random() * (right - left + 1)) + left,
            y: Math.floor(Math.random() * (bottom - top + 1)) + top
        }
    }

    moveCursorTo(position) {
        return Promise.all([
            this.moveCursor('x', this.cursor.x, position.x),
            this.moveCursor('y', this.cursor.y, position.y)
        ]);
    }

    moveCursor(axis, from, to) {
        return new Promise((resolve) => {
            const end = new Date().getTime() + MOVE_ANIMATION_DURATION;
            const current = from;
            const distance = to - from;

            const redraw = () => {
                const timestamp = new Date().getTime();
                const progress = Math.min((MOVE_ANIMATION_DURATION - (end - timestamp)) / MOVE_ANIMATION_DURATION, 1);

                this.cursor[axis] = current + (distance * progress);

                this.clearCanvas();
                this.drawCursor(this.cursor);
                this.drawLines(this.cursor);

                if (progress < 1) {
                    requestAnimationFrame(redraw);
                } else {
                    resolve();
                }
            };

            redraw();
        });
    }

    blink() {
        return new Promise((resolve) => {
            const maxBlink = 6;
            let nbBlink = 0;

            const redraw = () => {
                this.context.strokeStyle = nbBlink % 2 ? 'transparent' : COLOR;
                this.drawCursor(this.cursor);

                if (nbBlink < maxBlink) {
                    setTimeout(() => {
                        requestAnimationFrame(redraw);
                    }, 200);
                } else {
                    resolve();
                }

                nbBlink++;
            };

            redraw();
        });
    }

    expandCursor() {
        return new Promise((resolve) => {
            const end = new Date().getTime() + EXPAND_ANIMATION_DURATION;

            const currentX = this.cursor.x;
            const distanceX = 0 - currentX;
            const oppositeX = this.cursor.x + CURSOR_WIDTH;
            const oppositeXDistance = this.props.width - oppositeX;

            const currentY = this.cursor.y;
            const distanceY = 0 - currentY;
            const oppositeY = this.cursor.y + CURSOR_HEIGHT;
            const oppositeYDistance = this.props.height - oppositeY;

            const redraw = () => {
                const timestamp = new Date().getTime();
                const progress = Math.min((EXPAND_ANIMATION_DURATION - (end - timestamp)) / EXPAND_ANIMATION_DURATION, 1);

                this.cursor.x = currentX + (distanceX * progress);
                this.cursor.width = (oppositeX + (oppositeXDistance * progress)) - this.cursor.x;

                this.cursor.y = currentY + (distanceY * progress);
                this.cursor.height = (oppositeY + (oppositeYDistance * progress)) - this.cursor.y;

                this.clearCanvas();
                this.drawCursor(this.cursor, '#000');

                if (progress < 1) {
                    requestAnimationFrame(redraw);
                } else {
                    resolve();
                }
            };

            redraw();
        });
    }
}

Cursor.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onEnd: PropTypes.func
};

export default Cursor;
