import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';

function Section({title, apiEndpoint, showCollapse = true }) {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [apiEndpoint]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Show only first 6 albums when collapsed
  const displayedAlbums = isCollapsed ? albums.slice(0, 6) : albums;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {showCollapse && (
          <button className={styles.collapseButton} onClick={toggleCollapse}>
            {isCollapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>
      
      <div className={styles.cardsGrid}>
        {displayedAlbums.map((album) => (
          <Card 
            key={album.id}
            album={album}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;