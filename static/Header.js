import React from 'react';
import styles from './Header.scss';

const Header = ({item}) => (
  <div className={styles.Header}>
    <h2>KANBAN</h2>
    <div className={styles.newTask}>
      <p> + NEW TASK </p>
    </div>
  </div>
);

export default Header;