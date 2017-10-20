
import React from 'react';
import styles from './home.scss';
import Identity from '../../lib/identity/identity.jsx';
import Tree from '../../lib/tree/tree.jsx';
import Vocal from '../../lib/vocal/vocal.jsx'

let go = false;
function test() {
    //const event = document.createEvent('HTMLEvents');
    //event.initEvent('scificss:talking', true, true);
    //document.dispatchEvent(event);
    if (go) {
        document.dispatchEvent(new CustomEvent('scificss:talking:end'));
    } else {
        document.dispatchEvent(new CustomEvent('scificss:talking:start'));
    }
    go = !go;
}

const Home = () =>
    <div className={styles.home}>

        {/*<Identity />*/}

        {/*<Tree />*/}
        <button onClick={test} style={{marginLeft: -60}}>
            Test
        </button>

        <Vocal />
    </div>
;

export default Home;
