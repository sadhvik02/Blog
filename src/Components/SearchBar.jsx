import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const toggleSearch = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            // Clear search when closing on mobile? 
            // Design usually keeps it, but let's keep it simple.
            // If "Cancel" button is clicked (mobile), we clear.
        }
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
        setIsExpanded(false);
    };

    return (
        <div className={`${styles.searchBar} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.icon} onClick={toggleSearch}>
                {/* Search Icon (Magnifying Glass) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>

            <input
                type="text"
                className={styles.input}
                placeholder="Search posts..."
                value={query}
                onChange={handleSearchChange}
                aria-label="Search blog posts"
            />

            {/* Cancel Button (Visible on Mobile when expanded) */}
            <button
                className={styles.cancelButton}
                onClick={clearSearch}
                aria-label="Close search"
            >
                &#10005; {/* X symbol */}
            </button>
        </div>
    );
};

export default SearchBar;
