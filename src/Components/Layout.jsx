import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>BlogApp</h1>
        <nav>
          <ul className={styles.navLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© 2023 BlogApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
