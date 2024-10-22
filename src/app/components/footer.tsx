import React from 'react';
import styles from './footer.module.css';

const footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Desarrollado por: <p className={styles.text}>Los cuates</p></p>
      </div>
    </footer>
  );
};

export default footer;
