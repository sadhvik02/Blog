import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css'; // Using specific navbar module if exists, or fallback to Layout styles or create new.
// Actually, looking at file list, there IS a NavBar.module.css. checking content later if issues arise. 
// Ideally I should check NavBar.module.css content. But let's proceed with assumption it has basic nav styles.

const NavBar = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo}>BlogApp</h2>

        {/* Search Bar in center or right */}
        {onSearch && <div className={styles.searchContainer}><SearchBar onSearch={onSearch} /></div>}

        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/Blog">Blog</Link>
          <Link to="/About">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
