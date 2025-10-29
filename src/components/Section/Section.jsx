import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import axios from 'axios';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import styles from './Section.module.css';

function Section({ 
  title, 
  apiEndpoint, 
  showCollapse = true, 
  type = "albums",
  genresEndpoint 
}) {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching ${type} from: ${apiEndpoint}`);
        
        // Fetch main data
        const response = await axios.get(apiEndpoint);
        console.log(`Received ${response.data.length} ${type}`);
        setData(response.data);
        
        // Fetch genres if it's a songs section
        if (type === "songs" && genresEndpoint) {
          console.log('Fetching genres from:', genresEndpoint);
          const genresResponse = await axios.get(genresEndpoint);
          console.log('Received genres:', genresResponse.data.data);
          setGenres(genresResponse.data.data);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load ${type}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, type, genresEndpoint]);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  // Filter songs based on selected genre
  const filteredData = type === "songs" && selectedGenre !== 'All' 
    ? data.filter(item => item.genre?.label === selectedGenre)
    : data;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  console.log('Section debug:', { 
    title, 
    showCollapse, 
    type, 
    isCollapsed, 
    dataLength: data.length,
    loading,
    error
  });

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.loading}>Loading {type}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.section} data-testid={`${title.toLowerCase().replace(' ', '-')}-section`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {showCollapse && type !== "songs" && data.length > 0 && (
          <button 
            className={styles.collapseButton} 
            onClick={toggleCollapse}
            data-testid={`${title.toLowerCase().replace(' ', '-')}-collapse-btn`}
          >
            {isCollapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>

      {/* Genre Tabs for Songs */}
      {type === "songs" && (
        <div className={styles.tabsContainer}>
          <Tabs
            value={selectedGenre}
            onChange={handleGenreChange}
            className={styles.tabs}
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab 
              value="All" 
              label="All" 
              className={`${styles.tab} ${selectedGenre === 'All' ? styles.activeTab : ''}`}
            />
            {genres.map((genre) => (
              <Tab
                key={genre.key}
                value={genre.label}
                label={genre.label}
                className={`${styles.tab} ${selectedGenre === genre.label ? styles.activeTab : ''}`}
              />
            ))}
          </Tabs>
        </div>
      )}

      {/* Content */}
      {type === "songs" || isCollapsed ? (
        <Carousel 
          data={filteredData}
          renderComponent={(item) => (
            <Card 
              data={item}
              type={type}
            />
          )}
        />
      ) : (
        <div className={styles.cardsGrid}>
          {filteredData.map((item) => (
            <Card 
              key={item.id} 
              data={item}
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;