
import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../tile/tile.jsx';
import styles from './column.scss';

class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tiles: props.column.tiles
        }
    }

    selectTile(id) {
        this.setState({
            tiles: this.state.tiles.map((tile) => {
                tile.selected = tile.id === id;
                return tile;
            })
        });
        this.props.onSelection(this.props.column.id, id);
    }

    render() {
        return (
            <div className={styles.column}>
                {
                    this.state.tiles.map((tile) => {
                        return (
                            <div className={styles['column-tile']}
                                 key={tile.id}
                                 onClick={this.selectTile.bind(this, tile.id)}>
                                <Tile name={tile.name}
                                      expanded={tile.selected} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

Column.propTypes = {
    column: PropTypes.object,
    onSelection: PropTypes.func
};

export default Column;
