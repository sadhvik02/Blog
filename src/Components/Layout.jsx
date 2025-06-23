import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>BlogApp</h1>
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/Blog">Blog</Link>
            <Link to="/About">About</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2023 BlogApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
