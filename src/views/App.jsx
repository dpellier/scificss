
import React from 'react';
import styles from './app.scss';

const App = ({children}) =>
    <div className={styles.app}>
        {children}
    </div>
;

export default App;
