import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.black_text}>Desarrollado por: <span className={styles.text}>Los cuates</span></p>
      </div>
    </footer>
  );
};

export default Footer;
