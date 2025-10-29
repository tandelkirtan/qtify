import React from 'react';
import Section from '../components/Section/Section';
import SongsSection from '../components/SongsSection/SongsSection';
import Hero from '../components/Hero/Hero';
import Navbar from '../components/Navbar/Navbar';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Hero />
      
      <Section 
        title="Top Albums"
        apiEndpoint="https://qtify-backend.labs.crio.do/albums/top"
        showCollapse={true}
        type="albums"
      />
      
      <Section 
        title="New Albums"
        apiEndpoint="https://qtify-backend.labs.crio.do/albums/new"
        showCollapse={true}
        type="albums"
      />

      <Section 
        title="Songs"
        apiEndpoint="https://qtify-backend.labs.crio.do/songs"
        showCollapse={false}
        type="songs"
        genresEndpoint="https://qtify-backend.labs.crio.do/genres"
      />
    </div>
  );
}

export default Home;