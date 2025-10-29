import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import styles from './SongsSection.module.css';

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch songs data
        const songsResponse = await axios.get('https://qtify-backend.labs.crio.do/songs');
        setSongs(songsResponse.data);
        
        // Fetch genres data
        const genresResponse = await axios.get('https://qtify-backend.labs.crio.do/genres');
        setGenres(genresResponse.data.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter songs based on selected genre
  const filteredSongs = selectedGenre === 'All' 
    ? songs 
    : songs.filter(song => song.genre?.label === selectedGenre);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  if (loading) {
    return (
      <div className={styles.songsSection}>
        <h2 className={styles.sectionTitle}>Songs</h2>
        <div className={styles.loading}>Loading songs...</div>
      </div>
    );
  }

  return (
    <div className={styles.songsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Songs</h2>
      </div>

      {/* Genre Tabs */}
      <div className={styles.tabsContainer}>
        <Tabs
          value={selectedGenre}
          onChange={handleGenreChange}
          className={styles.tabs}
          TabIndicatorProps={{
            style: { display: 'none' }
          }}
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

      {/* Songs Carousel */}
      <Carousel
        data={filteredSongs}
        renderComponent={(song) => (
          <Card 
            data={song} 
            type="song" 
          />
        )}
      />
    </div>
  );
}

export default SongsSection;