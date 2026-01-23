import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import styles from './Layout.module.css';

const Layout = ({ onSearch }) => {
  return (
    <div className={styles.container}>
      <NavBar onSearch={onSearch} />
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
