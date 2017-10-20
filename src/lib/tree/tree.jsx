
import React from 'react';
import Column from './components/column/column.jsx';
import Link from './components/link/link.jsx';
import styles from './tree.scss';

class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    id: '1',
                    tiles: [
                        {id: 'what1', name: 'What 1'},
                        {id: 'what2', name: 'What 2'},
                        {id: 'what3', name: 'What 3'}
                    ]
                }, {
                    id: '2',
                    tiles: [
                        {id: 'who1', name: 'Who 1'},
                        {id: 'who2', name: 'Who 2'},
                        {id: 'who3', name: 'Who 3'}
                    ]
                }
            ]
        };

        //this.state = {
        //    columns: [
        //        {id: '1', selected: null, tiles: ['what1', 'what2', 'what3']},
        //        {id: '2', selected: null, tiles: ['who1', 'who2', 'who3']}
        //    ],
        //    tiles: [
        //        {id: 'what1', name: 'What 1'},
        //        {id: 'what2', name: 'What 2'},
        //        {id: 'what3', name: 'What 3'},
        //        {id: 'who1', name: 'Who 1'},
        //        {id: 'who2', name: 'Who 2'},
        //        {id: 'who3', name: 'Who 3'}
        //    ],
        //    selection: [
        //        'what1', 'who2'
        //    ]
        //};
    }

    link(columnId, tileId) {
        //this.setState({
        //    columns: this.state.columns.map((col) => {
        //        if (col.id === column.id) {
        //            col.selection = tileId;
        //        }
        //        return col;
        //    })
        //});

        const TILE_HEIGHT = 40;
        const TILE_HEIGHT_WITH_MARGIN = 50;

        const currentColumnIdx = this.state.columns.findIndex((column) => {
            return column.id === columnId;
        });

        const currentTileIdx = this.state.columns[currentColumnIdx].tiles.findIndex((tile) => {
            return tile.id === tileId;
        });

        const end = TILE_HEIGHT_WITH_MARGIN * currentTileIdx + (TILE_HEIGHT / 2);

        this.state.columns[currentColumnIdx].selection = end;

        this.setState({
            columns: this.state.columns
        });
    }

    render() {
        return (
            <div className={styles.tree}>
                {
                    this.state.columns.map((column) => {
                        return (
                            <div className={styles['tree-column']}
                                 key={column.id}>
                                {this.renderLink.bind(this, column)}

                                <Column column={column}
                                        onSelection={this.link.bind(this)} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderLink(column) {
        if (!column.selection) {
            return '';
        }

        return (
            <Link start="70"
                  end={column.selection} />
        );
    }
}

export default Tree;
